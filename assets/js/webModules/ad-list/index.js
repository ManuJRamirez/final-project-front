import { sessionController } from '../session/sessionController.js';
import { adListController } from './adListController.js';
import { categoriesListController } from '../categories-list/categoriesListController.js';

const sessionNav = document.getElementById('session');
const listCategoriasUl = document.getElementById('listCategorias');
const listTransaccionesUl = document.getElementById('transacciones');

const searchInput = document.getElementById('searchInput');
const searchForm = document.querySelector('.search-bar');

let paginaActual = 0;
const categoriasSeleccionadas = [];
let searchTerm = '';
let valorTransaccion = null;
let precioMinimo = 0;
let precioMaximo = 0;
let orden = 'RECIENTE';

document.addEventListener('DOMContentLoaded', () => {
  sessionController(sessionNav);

  window.addEventListener('offline', () => {
    printNotification('error', 'Se ha perdido la conexión');
  });

  const anunciosDiv = document.getElementById('row');
  const pagination = document.getElementById('paginationId');

  adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  categoriesListController(listCategoriasUl);

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    searchTerm = searchInput.value.trim();
    await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  });

  //document.getElementById('listCategorias')
  listCategoriasUl.addEventListener('click', async event => {
    if (event.target.classList.contains('categoria-link')) {
      event.preventDefault();
      const categoriaSeleccionada = event.target.textContent.trim();
      const isSelected = categoriasSeleccionadas.includes(
        categoriaSeleccionada,
      );

      if (isSelected) {
        const index = categoriasSeleccionadas.indexOf(categoriaSeleccionada);
        if (index > -1) {
          categoriasSeleccionadas.splice(index, 1);
        }
        event.target.classList.remove('active');
      } else {
        categoriasSeleccionadas.push(categoriaSeleccionada);
        event.target.classList.add('active');
      }
      await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
    }
  });
  listTransaccionesUl.addEventListener('click', async event => {
    if (event.target.classList.contains('transaccion-link')) {
      event.preventDefault();
       const isSelected = event.target.classList.contains('active');

    if (isSelected) {
      event.target.classList.remove('active');
    } else {
      event.target.classList.add('active');
    }
    const transaccionLinks = document.querySelectorAll('.transaccion-link.active');
    valorTransaccion = null;
    
    if (transaccionLinks.length === 1) {
      valorTransaccion = transaccionLinks[0].textContent.trim() === "Venta";
    }
    
    await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);

    }
  });

  const sliderElement = $("#rangoPrecio");

  sliderElement.on("change", async function() {
      const sliderData = sliderElement.data("ionRangeSlider");
      const data = sliderData.result;
      precioMinimo = data.from;
      precioMaximo = data.to;
  });

  const consultarForm = document.querySelector('.consultarForm');

  consultarForm.addEventListener('submit', async event => {
    event.preventDefault();
    await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  });

  const ordenFechaAscLink = document.getElementById('ordenFechaAsc');
  const ordenFechaDescLink = document.getElementById('ordenFechaDesc');
  const ordenPrecioAscLink = document.getElementById('ordenPrecioAsc');
  const ordenPrecioDescLink = document.getElementById('ordenPrecioDesc');
  
  ordenFechaAscLink.addEventListener('click', async event => {
      event.preventDefault();
      orden = 'RECIENTE';
      await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  });

  ordenFechaDescLink.addEventListener('click', async event => {
      event.preventDefault();
      orden = 'ANTIGUOS';
      await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  });

  ordenPrecioAscLink.addEventListener('click', async event => {
      event.preventDefault();
      orden = 'MIN';
      await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  });

  ordenPrecioDescLink.addEventListener('click', async event => {
      event.preventDefault();
      orden = 'MAX';
      await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
  });

  const pageElementsUl = document.getElementById('paginationId');

  pageElementsUl.addEventListener('click', async event => {
    if (event.target.classList.contains('pagination-link')) {
      event.preventDefault();
      event.stopPropagation();
      const id = event.target.id;
      const pageNumber = id.split('_')[1];
      paginaActual = parseInt(pageNumber);
      await adListController(anunciosDiv, pagination, paginaActual, searchTerm, categoriasSeleccionadas, valorTransaccion, precioMinimo, precioMaximo, orden);
    }
  });
});
