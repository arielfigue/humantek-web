'use client';

import { useSearchParams } from 'next/navigation';
import CasosClient, { type CaseStudy } from './CasosClient';

/**
 * Envoltura mínima que lee ?caso=N de la URL.
 *
 * Existe separada por una razón concreta: `useSearchParams` obliga a Next a
 * abandonar el prerenderizado del árbol donde se usa. Aislándolo aquí, el
 * fallback de Suspense puede ser el listado completo, que es lo que queda en
 * el HTML estático y lo que leen los buscadores. El parámetro se resuelve
 * después, en el cliente.
 */
export default function CasosConParametro({
  initialCases,
}: {
  initialCases: CaseStudy[];
}) {
  const casoDestacadoId = useSearchParams().get('caso');
  return (
    <CasosClient initialCases={initialCases} casoDestacadoId={casoDestacadoId} />
  );
}
