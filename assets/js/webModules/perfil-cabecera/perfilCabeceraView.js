export const perfilCabeceraView = (disabledUser, disabledPwd) => {
  let estiloTextoUsuario = '';
  let disabledTextoUsuario = '';
  let disabledContrasenia = '';
  let estiloContrasenia = '';
  let requeridoUsuario = '';
  let requeridoPwd = '';

  if (disabledUser === true) {
    estiloTextoUsuario = 'disabledBtn';
    disabledTextoUsuario = 'disabled= "true"';
    requeridoPwd = 'required';
  }
  if (disabledPwd === true) {
    estiloContrasenia = 'disabledBtn';
    disabledContrasenia = 'disabled= "true"';
    requeridoUsuario = 'required';
  }
  return `
    <div class="row">
        <div class="col-lg-6">
            <input type="text" id="nombre" name="nombre" placeholder="Nombre" class="form-control mb-16 ${estiloTextoUsuario}" ${requeridoUsuario} ${disabledTextoUsuario} >
        </div>
        <div class="col-lg-6">
            <input type="text" id="apellidos" name="apellidos" placeholder="Apellidos" class="form-control mb-16 ${estiloTextoUsuario}" ${requeridoUsuario} ${disabledTextoUsuario} >
        </div>
        <div class="col-lg-6">
            <input type="email" id="emailUser" name="email" placeholder="Email" class="form-control mb-16 ${estiloTextoUsuario}" ${requeridoUsuario} ${disabledTextoUsuario}> 
        </div>
        <div class="col-lg-6">
            <input type="text" id="apodo" name="apodo" placeholder="Nombre de usuario" class="form-control mb-16 disabledBtn"   disabled= "true">
        </div>
        <div class="col-lg-6">
            <input type="password" id="editarContrasenia"  placeholder="Nueva contraseña" class="form-control mb-16 ${estiloContrasenia}" ${requeridoPwd}  ${disabledContrasenia}>
        </div>
        <div class="col-lg-6">
            <input type="password" id="comprobarEditarContrasenia" placeholder="Repetir nueva contraseña" class="form-control mb-16 ${estiloContrasenia}" ${requeridoPwd}  ${disabledContrasenia}>
        </div>
        <div class="col-lg-6">
            <input type="text" id="fechaNacimiento" name="fechaNacimiento" placeholder="Fecha de nacimiento -> DD/MM/AAAA" class="form-control mb-16 ${estiloTextoUsuario}" ${requeridoUsuario}  ${disabledTextoUsuario} >
        </div>
        <div class="col-lg-6">
            <select name="notificaciones" id="notificaciones" name="notificacion" class="form-control mb-16 ${estiloTextoUsuario}" ${requeridoUsuario}  ${disabledTextoUsuario} >
                <option value="">Notificaciones sobre favoritos</option>
                <option value="true" name="true" value>Sí</option>
                <option value="false" name="false">No</option>
            </select>
        </div>
    </div>`;
};
