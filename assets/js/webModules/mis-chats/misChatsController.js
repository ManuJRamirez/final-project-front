import { getChats } from './misChatsModel.js';
import { decodeToken } from '../tools/decodeToken.js';

const token = localStorage.getItem('token');
let wsocket;
let formData;

export const misChatsController = async enviarMensajeFormData => {
  formData = enviarMensajeFormData;
  let queryString = window.location.search;

  if (queryString !== '') {
    const apodo = decodeToken(token).sub;
    queryString += `&apodo=${apodo}`;

    activarChat(queryString);
  } else {
    const responseListadoChats = await getChats();
    crearListadoChats(responseListadoChats);
  }
};

const crearListadoChats = responseListadoChats => {
  responseListadoChats.misChats.forEach(element => {
    crearChat(element);
  });
};

const crearChat = chat => {
  const listadoChat = document.getElementById('listadoChat');

  var element = document.createElement('li');
  element.classList.add('bounceInDown');

  const fecha = new Date(chat.fechaUltimoMensaje);
  const fechaFormateada = formatearFecha(fecha);

  element.innerHTML = `
  <a href="#" class="clearfix btnChat">
    <div class="friend-name">	
      <strong>${chat.tituloAnuncio}</strong>
    </div>
    <div class="last-message text-muted">${chat.participante}</div>
    <small class="time text-muted">${fechaFormateada}</small>
  </a>
  `;
  listadoChat.appendChild(element);

  const btnChat = element.querySelector('.btnChat');
  btnChat.addEventListener('click', function (event) {
    event.preventDefault();

    listadoChat.querySelectorAll('li').forEach(li => {
      li.classList.remove('active');
    });

    element.classList.add('active');

    const listadoMensajes = document.getElementById('chat');
    listadoMensajes.innerHTML = '';

    const queryString = `?id=${chat.idAnuncio}&apodo=${decodeToken(token).sub}&idChat=${chat.id}`;
    activarChat(queryString);
  });
};

const activarChat = queryString => {
  desactivarChat();

  wsocket = connectWebSocket(queryString);
  const enviarMensaje = event => {
    event.preventDefault();
    enviar(wsocket);
  };

  formData.addEventListener('submit', enviarMensaje);
};

const desactivarChat = () => {
  if (wsocket) {
    wsocket.close();
    wsocket = null;

    formData.removeEventListener('submit', enviarMensaje);
  }
};

const connectWebSocket = queryString => {
  //let wsocket = new WebSocket('ws://localhost:8080/final-project/websocket' + queryString, ['Authorization', token]);
  let wsocket = new WebSocket('ws://http://16.170.166.103:8080/final-project/websocket' + queryString, ['Authorization', token]);

  function onError() {
    alert('Error websocket.');
  }

  wsocket.onerror = onError;

  function onClose() {}

  wsocket.onclose = onClose;

  function onMessage(evt) {
    const obj = JSON.parse(evt.data);
    if (obj.mensaje != null) {
      crearNuevoMensaje(obj);
    } else {
      alert(evt.data);
    }
  }

  wsocket.onmessage = onMessage;
  return wsocket;
};

const enviar = wsocket => {
  var msg = document.getElementById('msg').value;

  if (wsocket instanceof WebSocket && wsocket.readyState === WebSocket.OPEN) {
    if (msg != '') {
      wsocket.send(msg);
      document.getElementById('msg').value = '';
    }
  } else {
    alert('Connect first');
  }
};

const crearNuevoMensaje = obj => {
  var element = document.createElement('li');
  const fecha = new Date(obj.fecha);
  const fechaFormateada = formatearFecha(fecha);

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

const formatearFecha = fecha => {
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const año = fecha.getFullYear();

  return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;
};
