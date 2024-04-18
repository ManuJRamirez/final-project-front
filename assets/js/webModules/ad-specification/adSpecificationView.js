export const adTemplate = ad => {
  let template = ``;

  if (ad.listImagenes === undefined || ad.listImagenes.length === 0) {
    template = `
    <div class="col-xl-7 col-lg-6">
      <div class="image-block mb-lg-0 mb-32">
        <img src="./assets/media/product/p-26.png" alt="" />
      </div>
    </div>
    <div class="col-xl-5 col-lg-6">
      <div class="content">
        <div class="title">
          <div class="name-price mb-8">
            <h2 class="h-47 bold light-black">${ad.titulo}</h2>
            <h3 class="h-47 bold light-black">– ${ad.precio}€</h3>
          </div>
          <p class="light-black">${ad.descripcion}</p>
        </div>
        <div class="tag">
          <div class="category mb-16">
            <h5 class="h-27 light-black">Tags:</h5>
            <h6 class="light-black">${ad.listCategoria}</h6>
          </div>
          <a href="area-del-usuario.html?user=${ad.apodoCreador}">
          <div class="category">
            <h5 class="h-27 light-black">${ad.apodoCreador}</h5>
          </div>
          </a>
        </div>
        <div class="btn-block">
          <a href="" class="cus-btn primary chat-btn">
           ¡¡Chat!!</a
          >
          <a
            href="./shop-listing-1.html"
            class="cus-btn light st-2"
          >
            ¡Favorito!</a
          >
        </div>
        <p style="color:black;">${ad.transacion ? 'Venta' : 'Compra'}</p>
        <p style="color:black;">${moment(ad.fechaCreacion).format('DD/MM/YYYY')}</p>
        <div class="social-link">
          <h4 class="h-27 light-black">Compartir:</h4>
          <ul class="unstyled social-icons">
            <li>
              <a href="./product-detail.html"
                ><i class="fab fa-facebook-f"></i
              ></a>
            </li>
            <li>
              <a href="./product-detail.html"
                ><i class="fab fa-twitter"></i
              ></a>
            </li>
            <li>
              <a href="./product-detail.html"
                ><i class="fab fa-snapchat-ghost"></i
              ></a>
            </li>
            <li>
              <a href="./product-detail.html">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_675_641)">
                    <path
                      d="M31.9691 9.40809C31.8942 7.7078 31.6192 6.53888 31.2253 5.52598C30.819 4.45082 30.1939 3.48823 29.3749 2.68802C28.5747 1.87537 27.6057 1.2439 26.543 0.843915C25.5243 0.450039 24.3614 0.175083 22.6612 0.100117C20.9482 0.0188025 20.4044 0 16.0598 0C11.7152 0 11.1714 0.0188025 9.46473 0.0937683C7.76445 0.168734 6.59552 0.443934 5.58287 0.837566C4.50746 1.2439 3.54487 1.86902 2.74467 2.68802C1.93201 3.48823 1.30078 4.45717 0.900555 5.51988C0.50668 6.53888 0.231724 7.70146 0.156758 9.40174C0.0754431 11.1147 0.0566406 11.6585 0.0566406 16.0031C0.0566406 20.3477 0.0754431 20.8915 0.150409 22.5982C0.225375 24.2984 0.500575 25.4674 0.894451 26.4803C1.30078 27.5554 1.93201 28.518 2.74467 29.3182C3.54487 30.1309 4.51381 30.7624 5.57652 31.1623C6.59552 31.5562 7.7581 31.8312 9.45862 31.9061C11.165 31.9813 11.7091 31.9999 16.0537 31.9999C20.3983 31.9999 20.9421 31.9813 22.6487 31.9061C24.349 31.8312 25.5179 31.5562 26.5306 31.1623C28.6811 30.3309 30.3814 28.6306 31.2129 26.4803C31.6065 25.4613 31.8817 24.2984 31.9567 22.5982C32.0316 20.8915 32.0504 20.3477 32.0504 16.0031C32.0504 11.6585 32.0441 11.1147 31.9691 9.40809ZM29.0875 22.4731C29.0186 24.0359 28.7561 24.8799 28.5373 25.4425C27.9996 26.8365 26.8932 27.943 25.4991 28.4807C24.9365 28.6995 24.0865 28.962 22.5298 29.0306C20.842 29.1058 20.3357 29.1243 16.0661 29.1243C11.7965 29.1243 11.2839 29.1058 9.60221 29.0306C8.0394 28.962 7.19549 28.6995 6.63288 28.4807C5.93914 28.2243 5.30767 27.8179 4.79511 27.2866C4.26376 26.7677 3.85743 26.1426 3.60103 25.4488C3.38224 24.8862 3.11974 24.0359 3.05112 22.4795C2.97591 20.7917 2.95735 20.2852 2.95735 16.0156C2.95735 11.7459 2.97591 11.2334 3.05112 9.55192C3.11974 7.98911 3.38224 7.14519 3.60103 6.58258C3.85743 5.8886 4.26376 5.25737 4.80146 4.74458C5.32012 4.21323 5.94524 3.8069 6.63923 3.55074C7.20184 3.33195 8.0521 3.06945 9.60856 3.00059C11.2964 2.92562 11.8028 2.90682 16.0722 2.90682C20.3482 2.90682 20.8544 2.92562 22.5361 3.00059C24.0989 3.06945 24.9429 3.33195 25.5055 3.55074C26.1992 3.8069 26.8307 4.21323 27.3432 4.74458C27.8746 5.26348 28.2809 5.8886 28.5373 6.58258C28.7561 7.14519 29.0186 7.99521 29.0875 9.55192C29.1624 11.2397 29.1812 11.7459 29.1812 16.0156C29.1812 20.2852 29.1624 20.7853 29.0875 22.4731Z"
                      fill="#54575C"
                    />
                    <path
                      d="M16.0592 7.78271C11.521 7.78271 7.83887 11.4646 7.83887 16.0031C7.83887 20.5416 11.521 24.2234 16.0592 24.2234C20.5977 24.2234 24.2796 20.5416 24.2796 16.0031C24.2796 11.4646 20.5977 7.78271 16.0592 7.78271ZM16.0592 21.3354C13.115 21.3354 10.7269 18.9475 10.7269 16.0031C10.7269 13.0586 13.115 10.6707 16.0592 10.6707C19.0036 10.6707 21.3916 13.0586 21.3916 16.0031C21.3916 18.9475 19.0036 21.3354 16.0592 21.3354Z"
                      fill="#54575C"
                    />
                    <path
                      d="M26.5239 7.45777C26.5239 8.51755 25.6646 9.37685 24.6046 9.37685C23.5448 9.37685 22.6855 8.51755 22.6855 7.45777C22.6855 6.39775 23.5448 5.5387 24.6046 5.5387C25.6646 5.5387 26.5239 6.39775 26.5239 7.45777Z"
                      fill="#54575C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_675_641">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
   `;
  } else {
    template = `
    <div class="col-xl-7 col-lg-6">
      <div class="image-block mb-lg-0 mb-32">
      ${
        ad.listImagenes.length === 1
          ? `
              <img src="data:image/png;base64, ${ad.listImagenes[0].imagenResize}" role="button" class="buttonImg"  data-info="${ad.listImagenes[0].imagen}"/>
              <div class="popup-container">
                <span class="close">&times;</span>
                <img class="popupImage" src="" alt="Original Image">
              </div>`
          : `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
          ${ad.listImagenes
            .sort((a, b) => a.id - b.id)
            .map(
              (imagen, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="data:image/png;base64,${imagen.imagenResize}" role="button" data-key="${imagen.id}" class="buttonImg"  data-info="${
                imagen.imagen
              }">
                <div class="popup-container">
                  <span class="close">&times;</span>
                  <img class="popupImage" src="" alt="Original Image">
                </div>
              </div>
          `,
            )
            .join('')}
          </div>
          <a id="prevButton" class="carousel-control-prev" role="button">
            <span>&#10094;</span>
          </a>
          <a id="nextButton" class="carousel-control-next" role="button">
            <span>&#10095;</span>
          </a>
        </div>
        `
      }
    </div>
  </div>
  <div class="col-xl-5 col-lg-6">
    <div class="content">
      <div class="title">
        <div class="name-price mb-8">
          <h2 class="h-47 bold light-black">${ad.titulo}</h2>
          <h3 class="h-47 bold light-black">– ${ad.precio}€</h3>
        </div>
        <p class="light-black">${ad.descripcion}</p>
      </div>
      <div class="tag">
        <div class="category mb-16">
          <h5 class="h-27 light-black">Tags:</h5>
          <h6 class="light-black">${ad.listCategoria}</h6>
          <p> ${ad.transacion}</p>
        </div>
        <a href="area-del-usuario.html?user=${ad.apodoCreador}">
        <div class="category">
          <h5 class="h-27 light-black">${ad.apodoCreador}</h5>
        </div>
        </a>
      </div>
      <div class="btn-block">
        <a href="" class="cus-btn primary chat-btn">
         ¡¡Chat!!</a
        >
        <a
          href="./404.html"
          class="cus-btn light st-2 favorito-btn"
        >
          ¡Favorito!</a
        >
      </div>
      <p style="color:black;">${ad.transacion ? 'Venta' : 'Compra'}</p>
      <p style="color:black;">${moment(ad.fechaCreacion).format('DD/MM/YYYY')}</p>
      <div class="social-link">
        <h4 class="h-27 light-black">Compartir:</h4>
        <ul class="unstyled social-icons">
          <li>
            <a href="./404.html"
              ><i class="fab fa-facebook-f"></i
            ></a>
          </li>
          <li>
            <a href="./404.html"
              ><i class="fab fa-twitter"></i
            ></a>
          </li>
          <li>
            <a href="./404.html"
              ><i class="fab fa-snapchat-ghost"></i
            ></a>
          </li>
          <li>
            <a href="./404.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clip-path="url(#clip0_675_641)">
                  <path
                    d="M31.9691 9.40809C31.8942 7.7078 31.6192 6.53888 31.2253 5.52598C30.819 4.45082 30.1939 3.48823 29.3749 2.68802C28.5747 1.87537 27.6057 1.2439 26.543 0.843915C25.5243 0.450039 24.3614 0.175083 22.6612 0.100117C20.9482 0.0188025 20.4044 0 16.0598 0C11.7152 0 11.1714 0.0188025 9.46473 0.0937683C7.76445 0.168734 6.59552 0.443934 5.58287 0.837566C4.50746 1.2439 3.54487 1.86902 2.74467 2.68802C1.93201 3.48823 1.30078 4.45717 0.900555 5.51988C0.50668 6.53888 0.231724 7.70146 0.156758 9.40174C0.0754431 11.1147 0.0566406 11.6585 0.0566406 16.0031C0.0566406 20.3477 0.0754431 20.8915 0.150409 22.5982C0.225375 24.2984 0.500575 25.4674 0.894451 26.4803C1.30078 27.5554 1.93201 28.518 2.74467 29.3182C3.54487 30.1309 4.51381 30.7624 5.57652 31.1623C6.59552 31.5562 7.7581 31.8312 9.45862 31.9061C11.165 31.9813 11.7091 31.9999 16.0537 31.9999C20.3983 31.9999 20.9421 31.9813 22.6487 31.9061C24.349 31.8312 25.5179 31.5562 26.5306 31.1623C28.6811 30.3309 30.3814 28.6306 31.2129 26.4803C31.6065 25.4613 31.8817 24.2984 31.9567 22.5982C32.0316 20.8915 32.0504 20.3477 32.0504 16.0031C32.0504 11.6585 32.0441 11.1147 31.9691 9.40809ZM29.0875 22.4731C29.0186 24.0359 28.7561 24.8799 28.5373 25.4425C27.9996 26.8365 26.8932 27.943 25.4991 28.4807C24.9365 28.6995 24.0865 28.962 22.5298 29.0306C20.842 29.1058 20.3357 29.1243 16.0661 29.1243C11.7965 29.1243 11.2839 29.1058 9.60221 29.0306C8.0394 28.962 7.19549 28.6995 6.63288 28.4807C5.93914 28.2243 5.30767 27.8179 4.79511 27.2866C4.26376 26.7677 3.85743 26.1426 3.60103 25.4488C3.38224 24.8862 3.11974 24.0359 3.05112 22.4795C2.97591 20.7917 2.95735 20.2852 2.95735 16.0156C2.95735 11.7459 2.97591 11.2334 3.05112 9.55192C3.11974 7.98911 3.38224 7.14519 3.60103 6.58258C3.85743 5.8886 4.26376 5.25737 4.80146 4.74458C5.32012 4.21323 5.94524 3.8069 6.63923 3.55074C7.20184 3.33195 8.0521 3.06945 9.60856 3.00059C11.2964 2.92562 11.8028 2.90682 16.0722 2.90682C20.3482 2.90682 20.8544 2.92562 22.5361 3.00059C24.0989 3.06945 24.9429 3.33195 25.5055 3.55074C26.1992 3.8069 26.8307 4.21323 27.3432 4.74458C27.8746 5.26348 28.2809 5.8886 28.5373 6.58258C28.7561 7.14519 29.0186 7.99521 29.0875 9.55192C29.1624 11.2397 29.1812 11.7459 29.1812 16.0156C29.1812 20.2852 29.1624 20.7853 29.0875 22.4731Z"
                    fill="#54575C"
                  />
                  <path
                    d="M16.0592 7.78271C11.521 7.78271 7.83887 11.4646 7.83887 16.0031C7.83887 20.5416 11.521 24.2234 16.0592 24.2234C20.5977 24.2234 24.2796 20.5416 24.2796 16.0031C24.2796 11.4646 20.5977 7.78271 16.0592 7.78271ZM16.0592 21.3354C13.115 21.3354 10.7269 18.9475 10.7269 16.0031C10.7269 13.0586 13.115 10.6707 16.0592 10.6707C19.0036 10.6707 21.3916 13.0586 21.3916 16.0031C21.3916 18.9475 19.0036 21.3354 16.0592 21.3354Z"
                    fill="#54575C"
                  />
                  <path
                    d="M26.5239 7.45777C26.5239 8.51755 25.6646 9.37685 24.6046 9.37685C23.5448 9.37685 22.6855 8.51755 22.6855 7.45777C22.6855 6.39775 23.5448 5.5387 24.6046 5.5387C25.6646 5.5387 26.5239 6.39775 26.5239 7.45777Z"
                    fill="#54575C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_675_641">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
 `;
  }
  return template;
};
