/**
 * Inyecta structured data. Es un Server Component: el JSON viaja en el HTML
 * inicial, que es justo donde los crawlers lo leen, y no suma nada al bundle JS.
 *
 * El escape de `<` evita que una cadena del contenido (p. ej. "</script>" dentro
 * de una descripción) rompa el documento.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
