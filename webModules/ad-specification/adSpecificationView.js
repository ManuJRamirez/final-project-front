export const adTemplate = ad => {
  let template = ``;

  if (ad.image === undefined) {
    template = `
        <span>${ad.titulo}</span></br>
        <span>${ad.precio}€</span></br>
        <span>${ad.transacion}</span></br>
        <p>${ad.descripcion}</p></br>
        <span>${ad.fechaCreacion}</p></br>
        <p>Contacto: </p>
        
        `;
  } else {
    template = `
        <img src="${ad.imagen}"></img>
        <span>${ad.titulo}</span></br>
        <span>${ad.precio}€</span></br>
        <span>${ad.transacion}</span></br>
        <p>${ad.descripcion}</p></br>
        <span>${ad.fechaCreacion}</p></br>
        <p>Contacto: </p>
        `;
  }
  return template;
};
