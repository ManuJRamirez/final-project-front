export const emptyAdListTemplate = () => {
  return `<h6 style="text-align: center;  color: #002366;">No hay anuncios disponibles para mostrar.</h6>`;
};

export const adListTemplate = ad => {
  let template = ``;

  if (ad.listImagenes === undefined || ad.listImagenes.length === 0) {
    template = `   
    <div  class="product-card sec mb-32">
        <div
            class="img-block" style="height:300px">
            <img
                src="./assets/media/product/p-2.png"
                alt>
        </div>
        <div class="content">
            <div
                class="name-price">
                <div
                    class="product-name">
                    <h5>${
                      ad.titulo.length > 10
                        ? ad.titulo.slice(0, 10) + '...'
                        : ad.titulo
                    }</h5>
                </div>
                <div
                    class="product-price">
                    <h5
                        class="bold"> ${ad.precio}€</h5>
                </div>
            </div>
            <div class="additional-info">
            <p style="color:black;">${ad.transacion ? 'Venta' : 'Compra'}</p>
            <p style="color:black;">${moment(ad.fechaCreacion).format(
              'DD/MM/YYYY',
            )}</p>
        </div>
            <a
                href="../detalle-anuncio.html?id=${ad.id}?${ad.titulo}"
                class="cus-btn primary">Detalles</a>
        </div>
    </div>
</div> 
    
    
    
`;
  } else {
    template = `
    <div class="product-card sec mb-32">
    <div class="img-block">
      <img id="ItemPreview" src="data:image/png;base64, ${
        ad.listImagenes[0].imagen
      }" >
    </div>
    <div class="content">
        <div
            class="name-price">
            <div
                class="product-name">
                <h5>${
                  ad.titulo.length > 10
                    ? ad.titulo.slice(0, 10) + '...'
                    : ad.titulo
                }</h5>
            </div>
            <div
                class="product-price">
                <h5
                    class="bold"> ${ad.precio}€</h5>
            </div>
        </div>
        <div class="additional-info">
        <p style="color:black;">${ad.transaccion ? 'Venta' : 'Compra'}</p>
        <p style="color:black;">${moment(ad.fechaCreacion).format(
          'DD/MM/YYYY',
        )}</p>
    </div>
        <a
            href="../detalle-anuncio.html?id=${ad.id}?${ad.titulo}"
            class="cus-btn primary">Detalles</a>
    </div>
</div>
</div> 
    `;
  }
  return template;
};
