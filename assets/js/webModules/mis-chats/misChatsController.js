import { getChats } from './misChatsModel.js';
import { decodeToken } from '../tools/decodeToken.js';

export const misChatsController = enviarMensajeFormData => {
  const wsocket = connectWebSocket();

  enviarMensajeFormData.addEventListener('submit', event => {
    event.preventDefault();
    enviar(wsocket);
  });
};

const connectWebSocket = () => {
  let queryString = window.location.search;

  function onError(error, err) {
    alert('error happened ' + err.type);
  }

  if (queryString === '') {
    const error = new Error('No existe el anuncio.');
    onError(error);
  } else {
    const token = localStorage.getItem('token');
    const apodo = decodeToken(token).sub;
    queryString += `&apodo=${apodo}`;
    // console.log('ws://localhost:8080/final-project/websocket' + queryString);
    console.log('ws://http://16.170.166.103:8080/final-project/websocket' + queryString);
    //let wsocket = new WebSocket('ws://localhost:8080/final-project/websocket' + queryString, ['Authorization', token]);
    let wsocket = new WebSocket('ws://http://16.170.166.103:8080/final-project/websocket' + queryString, ['Authorization', token]);

    wsocket.onerror = onError;

    function onClose() {
      alert('closed successfully');
    }

    wsocket.onclose = onClose;

    function onMessage(evt) {
      const obj = JSON.parse(evt.data);
      if (obj.mensaje != null) {
        createNewMessage(obj);
        /*else if (obj.sender) {
                createNewUser(obj);*/
      } else {
        alert(evt.data);
      }
    }

    wsocket.onmessage = onMessage;
    return wsocket;
  }
};

const enviar = wsocket => {
  var msg = document.getElementById('msg').value;

  if (wsocket instanceof WebSocket && wsocket.readyState === WebSocket.OPEN) {
    wsocket.send(msg);
    document.getElementById('msg').value = '';
  } else {
    alert('Connect first');
  }
};

const createNewMessage = obj => {
  var element = document.createElement('li');
  const fecha = new Date(obj.fecha);

  // Obtener las partes de la fecha (día, mes y año)
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1; // Se agrega 1 porque los meses van de 0 a 11 en JavaScript
  const año = fecha.getFullYear();

  // Crear una cadena con el formato deseado (por ejemplo, 'dd/mm/yyyy')
  const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;

  /* element.innerHTML = `<div class="entete">
  <span class="${statusClass}"></span>
  <h2>${obj.usuario}</h2>
  <h3>${obj.fecha}</h3>
  </div>
  <div class="triangle"></div>
  <div class="message">
  ${obj.mensaje}
  </div>`;*/

  var isMe = obj.me === true ? 'right' : 'left';
  element.classList.add(isMe);
  element.classList.add('clearfix');
  element.innerHTML = `
         <span class="chat-img pull-${isMe}"> 
        <strong class="primary-font">${obj.usuario}</strong>
        </span>
        <div class="chat-body clearfix">
            <div class="header">
            <strong class="primary-font text-muted"><i class="fa fa-clock-o"></i> ${fechaFormateada}</strong>
            </div>
            <p>${obj.mensaje}</p>
        </div>`;
  document.getElementById('chat').appendChild(element);
};
