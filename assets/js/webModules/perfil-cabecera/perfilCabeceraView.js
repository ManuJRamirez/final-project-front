export const perfilCabeceraView = () => {
  return `   
<section class="checkout p-96user">
    <div class="container">
        <div class="shipping p-96 pt-0">
            <h2 class="h-47 bold color-white mb-48">¡Mi perfil!</h2>
            <form action="./checkout.html" id = "usuarioPerfil">
                <div class="row">
                    <div class="col-lg-6">
                        <input type="text" id="name" placeholder="Nombre" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" id="last-name" placeholder="Apellidos" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                        <input type="email" id="emailuser" placeholder="Email" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" id="username" placeholder="Nombre de usuario" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                        <input type="password" id="country" placeholder="Nueva contraseña" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                        <input type="password" id="adress" placeholder="Repetir nueva contraseña" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                        <input type="text" id="state" placeholder="Fecha de nacimiento -> AAAA-MM-DD" class="form-control mb-16" required>
                    </div>
                    <div class="col-lg-6">
                   <select name="notificaciones" id="notificaciones" class="form-control mb-16" required>
                          <option value="">Notificaciones sobre favoritos</option>
                          <option value="true" name="true" value>Sí</option>
                          <option value="false" name="false">No</option>
                        </select>
                    </div>
                    <button class="cus-btn editar">Editar perfil</button>
                    <button class="cus-btn editar">Editar contraseña</button>
                    </div>
                    <button class="cus-btn borrar">Borrar la cuenta</button>
            </form>
        </div>
    </div>
</section>

`;
};
