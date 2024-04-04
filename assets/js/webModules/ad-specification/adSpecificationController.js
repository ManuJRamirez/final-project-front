import { getOneAd, deleteOneAd } from './adSpecificationModel.js';
import { adTemplate } from './adSpecificationView.js';
import { printEvent } from '../tools/printEvent.js';
import { decodeToken } from '../tools/decodeToken.js';

export const adSpecificationController = async (adInfoSection, adId) => {
  try {
    const ad = await getOneAd(adId);
    adInfoSection.innerHTML = adTemplate(ad);
    userDeleteAuthorization(ad, adInfoSection);
  } catch (error) {
    printEvent(
      'oneAdNotification',
      {
        notificationType: 'error',
        message: 'No se ha podido cargar el anuncio. Disculpe las molestias',
      },
      adInfoSection,
    );
  }
};

const showDeleteAdButton = (ad, adInfoSection) => {
  try {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar Anuncio';

    deleteButton.addEventListener('click', async () => {
      deleteButton.disabled = true;
      if (confirm('¿Seguro que quieres eliminar el anuncio?')) {
        await deleteOneAd(ad.id);
        printEvent(
          'oneAdDeleted',
          {
            notificationType: 'success',
            message: '¡Anuncio eliminado correctamente!',
          },
          adInfoSection,
        );
        setTimeout(() => {
          window.location = 'anuncios.html';
        }, 3000);
      } else {
        deleteButton.disabled = false;
      }
    });
    adInfoSection.appendChild(deleteButton);
  } catch (error) {
    printEvent('oneAdDeleted', {
      notificationType: 'error',
      message:
        '¡El anuncio no ha podido ser eliminado! ¡Inténtelo mas tarde, por favor!',
    });
  }
};

const userDeleteAuthorization = (ad, adInfoSection) => {
  const token = localStorage.getItem('token');

  if (token) {
    const userId = decodeToken(token);

    if (userId.sub === ad.apodoCreador) {
      showDeleteAdButton(ad, adInfoSection);
      printEditAdButton(ad, adInfoSection);
    }
  }
};

const printEditAdButton = (ad, adInfoSection) => {
  try {
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar Anuncio';

    editButton.addEventListener('click', async () => {
      window.location = `actualizar-anuncio.html?id=${ad.id}`;
    });

    adInfoSection.appendChild(editButton);
  } catch (error) {}
};
