#!/usr/bin/env bash
# Recomprime los MP4 del sitio y genera el poster de cada uno.
#
# Se deja versionado para poder repetirlo cuando se agregue un video nuevo:
# subir un MP4 sin pasar por aquí es lo que llevó a tener 77 MB en /public.
#
# Uso:  ./scripts/optimizar-media.sh  (desde la raíz del repo)
# Requiere ffmpeg.

set -euo pipefail

ORIG="media-original"   # coloca aquí los MP4 tal cual salen de edición
DEST="public"
POSTERS="public/posters"

mkdir -p "$DEST" "$POSTERS"

# CRF 26 en 720p: umbral donde el texto en pantalla sigue nítido.
# +faststart mueve el índice al inicio del archivo para que el navegador pueda
# empezar a reproducir sin descargarlo completo.
encode() {
  local nombre="$1" crf="$2" audio="$3"
  local in="$ORIG/$nombre.mp4" out="$DEST/$nombre.mp4"

  if [ "$audio" = "sin-audio" ]; then
    ffmpeg -y -i "$in" -an \
      -c:v libx264 -preset medium -crf "$crf" -profile:v high -pix_fmt yuv420p \
      -movflags +faststart "$out"
  else
    ffmpeg -y -i "$in" \
      -c:v libx264 -preset medium -crf "$crf" -profile:v high -pix_fmt yuv420p \
      -c:a aac -b:a 96k -ac 2 -movflags +faststart "$out"
  fi

  # Poster: fotograma representativo al 12% de la duración.
  local dur ss
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")
  ss=$(python3 -c "print(round(float('$dur') * 0.12, 2))")
  ffmpeg -y -v error -ss "$ss" -i "$out" -vf "thumbnail,scale=1280:-2" \
    -frames:v 1 -q:v 4 "$POSTERS/$nombre.jpg"
}

# vmi y odoo se reproducen sin sonido: el audio era peso muerto.
# vmi traía 320 kbps de audio inaudible = 4.4 MB tirados.
encode vmi                    26 sin-audio
encode odoo_es_video          26 sin-audio
encode sap_Business_ByDesign  26 con-audio
encode humanytek-video        26 con-audio
encode Institucional          27 con-audio

echo "Listo. Revisa el peso final:"
du -h "$DEST"/*.mp4
