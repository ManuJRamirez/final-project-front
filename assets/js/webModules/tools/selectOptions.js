import { getCategories } from '../categories-list/categoriesListModel.js';

export const createCategoriesOptions = async tagsSelect => {
  const categoria = await getCategories()
    .then(categorias => {
      categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        option.setAttribute('value', categoria.id);
        tagsSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
};

export const selectOptions = () => {
  const selectElement = document.getElementById('tags');

  selectElement.addEventListener('mousedown', event => {
    const clickedOption = event.target;

    if (clickedOption.tagName === 'OPTION') {
      clickedOption.selected = !clickedOption.selected;
      updateBackgroundColor(selectElement);
      event.preventDefault();
    }
  });
};
const updateBackgroundColor = selectElement => {
  Array.from(selectElement.options).forEach(option => {
    option.style.backgroundColor = option.selected ? 'lightblue' : '';
  });
};
