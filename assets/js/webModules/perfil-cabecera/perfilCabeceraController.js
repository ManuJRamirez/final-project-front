import { decodeToken } from '../tools/decodeToken.js';
import { perfilCabeceraView } from './perfilCabeceraView.js';
import { getUsuario, actualizarUsuario } from './perfilCabeceraModel.js';
import { printEvent } from '../tools/printEvent.js';
import { nuevaPassword } from '../nueva-password/nuevaPasswordModel.js';
import { isPasswordOk } from '../signup/signupController.js';

export const perfilCabeceraController = async (userForm, usuarioFromUrl) => {
  const token = localStorage.getItem('token');
  const editarPerfilBtn = document.getElementById('editarPerfilBtn');
  const editarContraseniaBtn = document.getElementById('editar-contrasenia-btn');
  const miPerfilTitulo = document.getElementById('perfil-titulo');

  let disabledUser = true;
  let disabledPwd = true;

  if (token) {
    const usuarioFromToken = decodeToken(token).sub;

    if (usuarioFromUrl === usuarioFromToken) {
      userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);
      let usuarioBBDD = await getUsuario(usuarioFromToken);
      cargarDatosUsuarioEnFormulario(usuarioBBDD);

      if (editarPerfilBtn) {
        editarPerfilBtn.addEventListener('click', event => {
          event.preventDefault();
          disabledUser = false; // Habilitar edición del perfil
          userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);
          disableEditButtons(true); // Deshabilitar botones "Editar contraseña" y "Borrar la cuenta"
          disableGuardarButtons(false);
          cargarDatosUsuarioEnFormulario(usuarioBBDD);
          const guardarBtn = document.getElementById('guardarBtn');
          if (guardarBtn) {
            guardarBtn.addEventListener('click', async event => {
              event.preventDefault();
              guardarBtn.disabled = true;
              try {
                usuarioBBDD = await actualizarUsuario(userForm);
                printEvent(
                  'userUpdate',
                  {
                    notificationType: 'success',
                    message: '¡Felicidades!¡Perfil actualizado correctamente',
                  },
                  userForm,
                );
                //alert('¡Felicidades!¡Datos actualizado correctamente');
                disableEditButtons(false);
                disableGuardarButtons(true);
                disabledUser = true;
                userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);

                cargarDatosUsuarioEnFormulario(usuarioBBDD);
              } catch (error) {
                alert('Error al intentar actualizar los datos');
              }
            });
          }
          const cancelarEditBtn = document.getElementById('cancelarEditBtn');
          if (cancelarEditBtn) {
            cancelarEditBtn.addEventListener('click', async event => {
              disabledUser = true; // Deshabilitar edición del perfil
              userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);
              disableEditButtons(false); // Deshabilitar botones "Editar contraseña" y "Borrar la cuenta"
              disableGuardarButtons(true);
              cargarDatosUsuarioEnFormulario(usuarioBBDD);
            });
          }
        });
      }
      if (editarContraseniaBtn) {
        editarContraseniaBtn.addEventListener('click', event => {
          event.preventDefault();
          disabledPwd = false; // Habilitar edición del password
          userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);
          disableEditButtons(true); // Deshabilitar botones "Editar contraseña" y "Borrar la cuenta"
          disableGuardarPwdButtons(false);
          cargarDatosUsuarioEnFormulario(usuarioBBDD);
          const guardarBtn = document.getElementById('guardarPwdBtn');
          if (guardarBtn) {
            guardarBtn.addEventListener('click', async event => {
              event.preventDefault();

              const nuevaPasswordInput = document.getElementById('editarContrasenia');
              const repitePasswordInput = document.getElementById('comprobarEditarContrasenia');
              try {
                if (isPasswordOk(nuevaPasswordInput, repitePasswordInput) && comparaContrasenia(nuevaPasswordInput, repitePasswordInput)) {
                  guardarBtn.disabled = true;
                  const password = {
                    password: nuevaPasswordInput.value,
                  };
                  try {
                    await nuevaPassword(password);
                    printEvent(
                      'userUpdate',
                      {
                        notificationType: 'success',
                        message: '¡Felicidades!¡Contraseña actualizada correctamente',
                      },
                      userForm,
                    );
                    //alert('¡Felicidades!¡Datos actualizado correctamente');
                    disableEditButtons(false);
                    disableGuardarPwdButtons(true);
                    disabledPwd = true;
                    userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);

                    cargarDatosUsuarioEnFormulario(usuarioBBDD);
                  } catch (error) {
                    printEvent(
                      'userUpdate',
                      {
                        notificationType: 'error',
                        message: 'Error al intentar actualizar los datos',
                      },
                      userForm,
                    );
                    //alert('Error al intentar actualizar los datos');
                    guardarBtn.disabled = false;
                  }
                }
              } catch (error) {
                printEvent(
                  'userUpdate',
                  {
                    notificationType: 'error',
                    message: error, //'Introduzca una contraseña correcta (min:6 caract,  1 letra, 1 letra mayúsculas, 1 número, 1 signo, sin espacios)',
                  },
                  userForm,
                );
              }
            });
          }
          const cancelarContraseniaBtn = document.getElementById('cancelarEditPwdBtn');
          if (cancelarContraseniaBtn) {
            cancelarContraseniaBtn.addEventListener('click', async event => {
              disabledPwd = true; // Deshabilitar edición del perfil
              userForm.innerHTML = perfilCabeceraView(disabledUser, disabledPwd);
              disableEditButtons(false); // Deshabilitar botones "Editar contraseña" y "Borrar la cuenta"
              disableGuardarPwdButtons(true);
              cargarDatosUsuarioEnFormulario(usuarioBBDD);
            });
          }
        });
      }
    }
  } else {
    const borrarCuentaBtn = document.getElementById('borrar-cuenta-btn');
    editarPerfilBtn.style.display = 'none';
    editarContraseniaBtn.style.display = 'none';
    borrarCuentaBtn.style.display = 'none';
    miPerfilTitulo.style.display = 'none';
  }
};

const comparaContrasenia = (nuevaPasswordInput, repitePasswordInput) => {
  return nuevaPasswordInput.value === repitePasswordInput.value;
};

export const disableEditButtons = disabled => {
  const editarContraseniaBtn = document.getElementById('editar-contrasenia-btn');
  const borrarCuentaBtn = document.getElementById('borrar-cuenta-btn');
  const editarPerfilBtn = document.getElementById('editarPerfilBtn');

  editarContraseniaBtn.disabled = disabled;
  borrarCuentaBtn.disabled = disabled;
  editarPerfilBtn.disabled = disabled;
};

export const disableGuardarButtons = disabled => {
  const guardarBtn = document.getElementById('guardarBtn');
  const cancelarEditBtn = document.getElementById('cancelarEditBtn');

  guardarBtn.disabled = disabled;
  cancelarEditBtn.disabled = disabled;

  guardarBtn.style.display = disabled ? 'none' : 'block';
  cancelarEditBtn.style.display = disabled ? 'none' : 'block';
};

export const disableGuardarPwdButtons = disabled => {
  const guardarBtn = document.getElementById('guardarPwdBtn');
  const cancelarEditBtn = document.getElementById('cancelarEditPwdBtn');

  guardarBtn.disabled = disabled;
  cancelarEditBtn.disabled = disabled;

  guardarBtn.style.display = disabled ? 'none' : 'block';
  cancelarEditBtn.style.display = disabled ? 'none' : 'block';
};

const cargarDatosUsuarioEnFormulario = usuario => {
  document.getElementById('nombre').value = usuario.nombre;
  document.getElementById('apellidos').value = usuario.apellidos;
  document.getElementById('emailUser').value = usuario.email;
  document.getElementById('apodo').value = usuario.apodo;
  document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;
  document.getElementById('notificaciones').value = usuario.notificacion;
};
