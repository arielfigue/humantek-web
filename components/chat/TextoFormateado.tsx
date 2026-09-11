import { Fragment } from 'react';

/**
 * Renderiza el texto del asistente con saltos de línea y **negritas**.
 *
 * El widget original hacía esto construyendo nodos a mano precisamente para no
 * usar innerHTML con datos del modelo. En React el problema no existe: todo se
 * escapa por defecto y basta con devolver elementos.
 */
export default function TextoFormateado({ texto }: { texto: string }) {
  return (
    <>
      {texto.split('\n').map((linea, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {linea.split(/\*\*(.+?)\*\*/g).map((parte, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="font-semibold text-white">
                {parte}
              </strong>
            ) : (
              <Fragment key={j}>{parte}</Fragment>
            )
          )}
        </Fragment>
      ))}
    </>
  );
}
