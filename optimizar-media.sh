#!/usr/bin/env bash
# Recomprime los MP4 del sitio y genera el póster de cada uno.
#
# Subir un MP4 directo a public/ es lo que llevó a tener 77 MB ahí. Este script
# existe para que eso no vuelva a pasar.
#
# USO
#   ./scripts/optimizar-media.sh                     procesa todos los conocidos
#   ./scripts/optimizar-media.sh animacion_retail    procesa solo ese
#   ./scripts/optimizar-media.sh vmi Institucional   procesa varios
#
# El nombre va SIN la extensión .mp4.
#
# ENTRADA / SALIDA
#   media-original/<nombre>.mp4   el archivo tal cual sale de edición
#   public/<nombre>.mp4           versión optimizada, la que sirve el sitio
#   public/posters/<nombre>.jpg   fotograma de portada, generado solo
#
# Requiere ffmpeg y ffprobe.

set -euo pipefail

ORIG="media-original"
DEST="public"
POSTERS="public/posters"

# Videos que se reproducen con el volumen oculto: su audio es peso muerto.
# vmi traía 320 kbps inaudibles, o sea 4.4 MB tirados.
MUDOS=" vmi animacion_retail "

# CRF por archivo. 26 es el umbral donde el texto en pantalla sigue nítido;
# 27 para los muy largos, donde cada punto pesa mucho en el total.
crf_de() {
  case "$1" in
    Institucional) echo 27 ;;
    *)             echo 26 ;;
  esac
}

mkdir -p "$DEST" "$POSTERS"

for cmd in ffmpeg ffprobe; do
  command -v "$cmd" >/dev/null || { echo "Falta $cmd en el PATH."; exit 1; }
done

tiene_audio() {
  [ -n "$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$1")" ]
}

encode() {
  local nombre="$1"
  local in="$ORIG/$nombre.mp4" out="$DEST/$nombre.mp4"
  local crf; crf=$(crf_de "$nombre")

  if [ ! -f "$in" ]; then
    echo "  ✗ $nombre: no está $in — sáltalo o copia ahí el original."
    return 1
  fi

  local args_audio
  if [[ "$MUDOS" == *" $nombre "* ]]; then
    args_audio=(-an)
    echo "  $nombre: audio eliminado a propósito (el reproductor oculta el volumen)"
  elif tiene_audio "$in"; then
    args_audio=(-c:a aac -b:a 96k -ac 2)
    echo "  $nombre: audio recomprimido a 96 kbps"
  else
    # Se avisa en vez de asumirlo: un video de producto mudo casi siempre es un
    # error de descarga o de exportación, no una decisión.
    args_audio=(-an)
    echo "  ⚠ $nombre: el ORIGEN no trae pista de audio."
    echo "    Si debería tenerla, consigue el archivo correcto antes de publicar."
  fi

  # +faststart mueve el índice al inicio del archivo: sin él el navegador tiene
  # que descargar el MP4 completo antes de mostrar el primer fotograma.
  ffmpeg -y -v warning -stats -i "$in" \
    -c:v libx264 -preset medium -crf "$crf" -profile:v high -pix_fmt yuv420p \
    "${args_audio[@]}" -movflags +faststart "$out"

  # Póster: fotograma representativo al 12% de la duración.
  local dur ss
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")
  ss=$(awk -v d="$dur" 'BEGIN { printf "%.2f", d * 0.12 }')
  ffmpeg -y -v error -ss "$ss" -i "$out" -vf "thumbnail,scale=1280:-2" \
    -frames:v 1 -q:v 4 "$POSTERS/$nombre.jpg"

  local antes despues
  antes=$(du -h "$in" | cut -f1)
  despues=$(du -h "$out" | cut -f1)
  echo "  ✓ $nombre: $antes → $despues   (póster en $POSTERS/$nombre.jpg)"
}

if [ "$#" -gt 0 ]; then
  LISTA=("$@")
else
  LISTA=(animacion_retail vmi odoo_es_video sap_Business_ByDesign humanytek-video Institucional)
fi

fallos=0
for nombre in "${LISTA[@]}"; do
  nombre="${nombre%.mp4}"   # tolera que le pasen el nombre con extensión
  echo "── $nombre"
  encode "$nombre" || fallos=$((fallos + 1))
done

echo
echo "Peso final de los videos:"
du -h "$DEST"/*.mp4 2>/dev/null | sort -h

[ "$fallos" -eq 0 ] || { echo; echo "$fallos archivo(s) no se procesaron."; exit 1; }
