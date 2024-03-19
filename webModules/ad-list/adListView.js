export const emptyAdListTemplate = () => {
  return `No hay anuncios disponibles para mostrar. Inténtelo de nuevo mas tarde`;
};

export const adListTemplate = ad => {
  let template = ``;

  if (ad.image === undefined) {
    template = `
        <a href="../ad-specification.html?id=${ad.id}">
            <span>${ad.titulo}</span></br>
            <span>${ad.precio}€</span></br>
            <span>${ad.transacion}</span></br>
            <p>${ad.descripcion}</p></br>
            <span>${ad.fechaCreacion}</p></br>
        </a>
    `;
  } else {
    template = `
        <a href="../ad-specification.html?id=${ad.id}">
            <img src="${ad.imagen}"></img>
            <span>${ad.titulo}</span></br>
            <span>${ad.precio}€</span></br>
            <span>${ad.transacion}</span></br>
            <p>${ad.descripcion}</p></br>
            <span>${ad.fechaCreacion}</p></br>
        </a>
    `;
  }
  return template;
};
