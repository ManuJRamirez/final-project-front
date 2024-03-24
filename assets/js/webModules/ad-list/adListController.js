import { getAdverts } from './adListModel.js';
import { adListTemplate, emptyAdListTemplate } from './adListView.js';
import { printEvent } from '../tools/printEvent.js';

export const adListController = async (
  adList,
  searchTerm = '',
  categorias = [],
  transacion = null,
) => {
  let page;
  let adverts = [];

  try {
    printEvent('loadingListAdvs', null, adList);
    page = await getAdverts(searchTerm, categorias, transacion);
    adverts = page.content;
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
  }
};

const printAdList = (adverts, adList) => {
  adverts.forEach(ad => {
    const adContainer = document.createElement('div');

    adContainer.classList.add('col-lg-4');
    adContainer.classList.add('col-sm-6');
    adContainer.innerHTML = adListTemplate(ad);

    adList.appendChild(adContainer);
  });
};
