import { decodeToken } from '../tools/decodeToken.js';

let usuario;
const tokenUsuario = decodeToken(localStorage.getItem('token'));
if (tokenUsuario) {
  usuario = tokenUsuario.sub;
}

export const menuLoggedSession = () => {
  return `
    <header class="large-screens">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg p-0">
            <div class="collapse navbar-collapse" id="mynavbar">
              <div class="left-nav">
                <a href="index.html" class="navbar-brand m-0 p-0"
                  ><img alt src="./assets/media/logo.png"/></a>
                <ul class="navbar-nav m-0">
                  <li class="has-children">
                    <li class="menu-item"><a href="index.html">Inicio</a></li>
                </ul>
              </div>
              <div class="search-block">
                <form
                  action="anuncios.html"
                  class="input-group search-bar"
                >
                  <input type="text" placeholder="Search..." required />
                  <button class="search" type="submit">
                    <i class="far fa-search search-icon"></i>
                  </button>
                </form>
              </div>
              <div class="right-nav">
                <ul class="navbar-nav m-0">
                  <li class="has-children">
                    <li class="menu-item"><a href="nuevo-anuncio.html">Crear Anuncio</a></li>
                    <li class="has-children">
                    <li class="menu-item"><a href="area-del-usuario.html?user=${usuario}">Mi Perfil</a></li>
                  <li class="has-children">
                    <li class="menu-item"><button type="button" class="menu-item-button" id="logoutButton">¡Desconectar!</button></li>
                  </li>
                </ul>

                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <header class="small-screen">
        <div class="container-fluid">
          <div class="mobile-menu">
            <div>
              <a class="navbar-brand" href="index.html"
                ><img alt src="./assets/media/logo.png"
              /></a>
            </div>
            <div class="hamburger-menu">
              <div class="bar"></div>
            </div>
          </div>
          <nav class="mobile-navar d-xl-none">
            <ul>
                <li class="menu-item"><a href="index.html">Inicio</a></li>
                <li class="menu-item"><a href="nuevo-anuncio.html">Crear Anuncio</a></li>
                <li class="menu-item"><a href="area-del-usuario.html?user=${usuario}">Mi Perfil</a></li>
                <li class="menu-item"><button type="button" class="menu-item-button-submenu" id="logoutButton">¡Desconectar!</button></li>  
            </ul>
          </nav>
        </div>
      </header>
      <!-- Header Area end -->


    `;
};

export const menuUnloggedSession = () => {
  return `
    <header class="large-screens">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg p-0">
            <div class="collapse navbar-collapse" id="mynavbar">
              <div class="left-nav">
                <a href="index.html" class="navbar-brand m-0 p-0"
                  ><img alt src="./assets/media/logo.png"
                /></a>
                <ul class="navbar-nav m-0">
                  <li class="has-children">
                    <li class="menu-item"><a href="index.html">Inicio</a></li>
                </ul>
              </div>
              <div class="search-block">
                <form
                  action="shop-listing-1.html"
                  class="input-group search-bar"
                >
                  <input type="text" placeholder="Search..." required />
                  <button class="search" type="submit">
                    <i class="far fa-search search-icon"></i>
                  </button>
                </form>
              </div>
              <div class="right-nav">
                <ul class="navbar-nav m-0">
                  <li class="has-children">
                    <li class="menu-item"><a href="anuncios.html">Anuncios</a></li>
                  <li class="has-children">
                    <li class="menu-item"><a href="registrar.html">¡Registrate!</a></li>
                  </li>
                </ul>
                <ul class="navbar-nav m-0">
                  <li class="menu-item">
                    <li class="menu-item"><a href="login.html">¡Conectate!</a></li>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <header class="small-screen">
        <div class="container-fluid">
          <div class="mobile-menu">
            <div>
              <a class="navbar-brand" href="index.html"
                ><img alt src="./assets/media/logo.png"
              /></a>
            </div>
            <div class="hamburger-menu">
              <div class="bar"></div>
            </div>
          </div>
          <nav class="mobile-navar d-xl-none">
            <ul>
                <li class="menu-item"><a href="index.html">Inicio</a></li>
                <li class="menu-item"><a href="anuncios.html">Anuncios</a></li>
                <li class="menu-item"><a href="registrar.html">¡Registrate!</a></li>
                <li class="menu-item"><a href="login.html">¡Conectate!</a></li>
              
            </ul>
          </nav>
        </div>
      </header>
      <!-- Header Area end -->



    `;
};
