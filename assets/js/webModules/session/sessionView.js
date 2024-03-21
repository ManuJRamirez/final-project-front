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
                    <li class="menu-item"><a href="index-2.html">Inicio</a></li>
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
                    <li class="menu-item"><a href="index-2.html">Anuncios</a></li>
                  <li class="has-children">
                    <li class="menu-item"><a href="index-2.html">¡Desconectar!</a></li>
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
                <li class="menu-item"><a href="index-2.html">Inicio</a></li>
                <li class="menu-item"><a href="index-2.html">Anuncios</a></li>
                <li class="menu-item"><a href="index-2.html">¡Desconectar!</a></li>  
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
                    <li class="menu-item"><a href="index-2.html">Inicio</a></li>
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
                    <li class="menu-item"><a href="shop-listing-1.html">Anuncios</a></li>
                  <li class="has-children">
                    <li class="menu-item"><a href="index-2.html">¡Registrate!</a></li>
                  </li>
                </ul>
                <ul class="navbar-nav m-0">
                  <li class="menu-item">
                    <li class="menu-item"><a href="index-2.html">¡Conectate!</a></li>
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
                <li class="menu-item"><a href="index-2.html">Inicio</a></li>
                <li class="menu-item"><a href="shop-listing-1.html">Anuncios</a></li>
                <li class="menu-item"><a href="index-2.html">¡Registrate!</a></li>
                <li class="menu-item"><a href="index-2.html">¡Conectate!</a></li>
              
            </ul>
          </nav>
        </div>
      </header>
      <!-- Header Area end -->



    `;
};
