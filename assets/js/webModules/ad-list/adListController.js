import { getAdverts } from './adListModel.js';
import { adListTemplate, emptyAdListTemplate } from './adListView.js';
import { printEvent } from '../tools/printEvent.js';

export const adListController = async (
  adList,
  pagination,
  paginaActual = 0, 
  searchTerm = '',
  categorias = [],
  transacion = null,
  precioMinimo = 0,
  precioMaximo = 0,
  orden = 'RECIENTE'
) => {
  let page;
  let adverts = [];
  let totalPages;

  try {
    printEvent('loadingListAdvs', null, adList);
    page = await getAdverts(paginaActual, searchTerm, categorias, transacion, precioMinimo, precioMaximo, orden);
    adverts = page.content;
    totalPages = page.totalPages;
    printEvent(
      'advertListLoaded',
      {
        notificationType: 'success',
        message: 'Anuncios cargados correctamente',
      },
      adList,
    );
  } catch (error) {
    printEvent(
      'advertListLoaded',
      {
        notificationType: 'error',
        message: 'No se han podido cargar los anuncios. Disculpe las molestias',
      },
      adList,
    );
  } finally {
    printEvent('loadingListAdvsOver', null, adList);
  }

  if (adverts.length === 0) {
    adList.innerHTML = emptyAdListTemplate();
    printEvent(
      'adListEmpty',
      { notificationType: 'success', message: 'No hay anuncios para mostrar' },
      adList,
    );
  } else {
    adList.innerHTML = '';
    printAdList(adverts, adList);
    printPagination(paginaActual, totalPages, pagination, 5);
  }
};

const printAdList = (adverts, adList) => {
  adverts.forEach(ad => {
    const adContainer = document.createElement('div');

    adContainer.classList.add('col-lg-4');
    adContainer.classList.add('col-sm-6');

    if (ad.mapIdImagenes) {
      const mapEntries = Object.entries(ad.mapIdImagenes);
      const map = new Map(mapEntries);
      if(map.size > 0){
        const sortedKeys = Array.from(map.keys()).sort((a, b) => a - b);
        ad.image = map.get(sortedKeys[0]);
      }
    }
    
    adContainer.innerHTML = adListTemplate(ad);

    adList.appendChild(adContainer);
  });
};

const printPagination = (paginaActual, totalPages, pagination, maxPagesToShow) => {
  pagination.innerHTML = '';

  // Calcula el rango de páginas a mostrar
  const startPage = Math.max(0, paginaActual - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1);

  // Crea y agrega el botón de retroceso
  if(paginaActual !== 0) {
    const backButton = document.createElement('li');
    backButton.innerHTML = '<a href=""><i class="fas fa-chevron-left pagination-link" id="pagina_0"></i></a>';
    backButton.addEventListener('click', (event) => {
      event.preventDefault(); 
      window.scrollTo({ top: 200, behavior: 'smooth' }); // Desplaza hacia arriba al hacer clic en el botón de retroceso
    });
    pagination.appendChild(backButton);
  }

   // Itera desde 0 hasta totalPages - 1 y crea los elementos de página correspondientes
   for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement('li');
    const pageLink = document.createElement('a');
    pageLink.href = '';
    pageLink.textContent = i + 1;
    pageLink.id = `pagina_${i}`; 
    pageLink.classList.add('pagination-link');
    if (i === paginaActual) {
      pageLink.classList.add('active');
    }
    pageLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 200, behavior: 'smooth' }); // Desplaza hacia arriba al hacer clic en cualquier enlace de página
    });
    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
  }
  
  if(paginaActual !== totalPages-1) {
    const forwardButton = document.createElement('li');
    const lastPageId = totalPages - 1;
    forwardButton.innerHTML = `<a href=""><i class="fas fa-chevron-right pagination-link" id = "pagina_${lastPageId}"></i></a>`;
    forwardButton.addEventListener('click', (event) => {
      event.preventDefault(); 
      window.scrollTo({ top: 200, behavior: 'smooth' }); // Desplaza hacia arriba al hacer clic en el botón de avance
    });
    pagination.appendChild(forwardButton);
  }
  
};
