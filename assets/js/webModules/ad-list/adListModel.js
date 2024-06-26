import { apiRest } from '../tools/apiRest.js';

export const getAdverts = async (
  paginaActual = 0,
  searchTerm = '',
  categorias = [],
  transacion = null,
  precioMinimo = 0,
  precioMaximo = 0,
  orden = 'RECIENTE',
  usuario = null,
) => {
  const endpoint = 'final-project/public/anunciosFiltrados';
  const filtros = {
    pagina: paginaActual,
    titulo: searchTerm,
    categorias: categorias,
    transaccion: transacion,
    precioMin: precioMinimo,
    precioMax: precioMaximo,
    orden: orden,
    usuario: usuario,
  };

  return await apiRest().getFiltros(endpoint, filtros);
};
