import { apiRest } from '../tools/apiRest.js';

export const getAdverts = async (
  searchTerm = '',
  categorias = [],
  transacion = null,
) => {
  const endpoint = 'final-project/public/anunciosFiltrados';
  const filtros = {
    titulo: searchTerm,
    categorias: categorias,
    transacion: transacion,
  };

  return await apiRest().getFiltros(endpoint, filtros);
};
