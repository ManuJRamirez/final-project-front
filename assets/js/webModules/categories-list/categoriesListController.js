import { getCategories } from './categoriesListModel.js';
import { catListTemplate } from './categoriesListView.js';
import { printEvent } from '../tools/printEvent.js';

export const categoriesListController = async listCategoriasUl => {
  let categories = [];

  try {
    printEvent('loadingListAdvs', null, listCategoriasUl);
    categories = await getCategories();
    printEvent(
      'advertListLoaded',
      {
        notificationType: 'success',
        message: 'Categorias cargadas correctamente',
      },
      listCategoriasUl,
    );
  } catch (error) {
    printEvent(
      'advertListLoaded',
      {
        notificationType: 'error',
        message:
          'No se han podido cargar las categorias. Disculpe las molestias',
      },
      listCategoriasUl,
    );
  }

  printAdList(categories, listCategoriasUl);
};

const printAdList = (categories, listCategoriasUl) => {
  categories.forEach(cat => {
    const catContainer = document.createElement('li');
    catContainer.innerHTML = catListTemplate(cat);

    listCategoriasUl.appendChild(catContainer);
  });
};
