export const emptyAdListTemplate = () => {
    return `No hay anuncios disponibles para mostrar. Inténtelo de nuevo mas tarde`; 
}

export const adListTemplate = (ad) => {
    let template = ``;

    if(ad.image === 'noImage') {
        template = `
        <a href="../ad-specification.html?id=${ad.id}">
            <span>${ad.name}</span></br>
            <span>${ad.price}€</span></br>
            <span>${ad.opType}</span></br>
            <p>${ad.description}</p></br>
            <span>${ad.date}</p></br>
        </a>
    `;
    } else {
        template = `
        <a href="../ad-specification.html?id=${ad.id}">
            <img src="${ad.image}"></img>
            <span>${ad.name}</span></br>
            <span>${ad.price}€</span></br>
            <span>${ad.opType}</span></br>
            <p>${ad.description}</p></br>
            <span>${ad.date}</p></br>
        </a>
    `;
    }
    return template;
}