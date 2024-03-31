import { getOneAd, deleteOneAd } from './adSpecificationModel.js';
import { adTemplate } from './adSpecificationView.js';
import { printEvent } from '../tools/printEvent.js';
import { decodeToken } from '../tools/decodeToken.js';

export const adSpecificationController = async (adInfoSection, adId) => {
  try {
    printEvent('oneAdLoading', null, adInfoSection);
    const ad = await getOneAd(adId);
    printEvent(
      'oneAdNotification',
      {
        notificationType: 'success',
        message: '¡Anuncio cargado correctamente!',
      },
      adInfoSection,
    );
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
  } finally {
    printEvent('oneAdLoadingOver', null, adInfoSection);
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
        alert('Anuncio borrado correctamente.');
        window.location = 'anuncios.html';
      } else {
        deleteButton.disabled = false;
      }
    });
    adInfoSection.appendChild(deleteButton);
  } catch (error) {
    alert(error);
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
      const adInfo = await getOneAd(ad.id);
      const bodyId = {
        id: adInfo.id,
      };
      const body = {
        titulo: adInfo.titulo,
        precio: adInfo.precio,
        transacion: adInfo.transacion,
        descripcion: adInfo.descripcion,
        listCategoria: adInfo.listCategoria,
        imagen: adInfo.imagen,
      };

      window.localStorage.setItem('adId', JSON.stringify(bodyId));
      window.localStorage.setItem('infoAd', JSON.stringify(body));
      window.location = 'nuevo-anuncio.html';
    });

    adInfoSection.appendChild(editButton);
  } catch (error) {}
};
