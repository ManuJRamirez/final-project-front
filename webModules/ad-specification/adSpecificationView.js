export const adTemplate = (ad) => {
    
    let template = ``;

    if(ad.image === 'noImage') {
        template = `
        <span>${ad.name}</span></br>
        <span>${ad.price}€</span></br>
        <span>${ad.opType}</span></br>
        <p>${ad.description}</p></br>
        <span>${ad.date}</p></br>
        <p>Contacto: ${ad.user.username}</p>
        
        `
    } else {
        template = `
        <img src="${ad.image}"></img>
        <span>${ad.name}</span></br>
        <span>${ad.price}€</span></br>
        <span>${ad.opType}</span></br>
        <p>${ad.description}</p></br>
        <span>${ad.date}</p></br>
        <p>Contacto: ${ad.user.username}</p>
        `
    }
    return template;
}
    
    

