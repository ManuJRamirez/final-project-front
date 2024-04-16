import { getChats } from "./misChatsModel.js";
import { decodeToken } from "../tools/decodeToken.js";

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
        alert("error happened " + err.type);
    }

    if (queryString === '') {
        const error = new Error("No existe el anuncio.");
        onError(error);
    } else {
        const token = localStorage.getItem('token'); 
        const apodo = decodeToken(token).sub;
        queryString += `&apodo=${apodo}`;
        console.log("ws://localhost:8080/final-project/websocket" + queryString);
        let wsocket = new WebSocket("ws://localhost:8080/final-project/websocket" + queryString, ['Authorization', token]);

        wsocket.onerror = onError;

        function onClose() {
            alert("closed successfully");
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

const enviar = (wsocket) => {
    var msg = document.getElementById("msg").value;

    if (wsocket instanceof WebSocket && wsocket.readyState === WebSocket.OPEN) {
        wsocket.send(msg);
        document.getElementById("msg").value = ""; 
    } else {
        alert("Connect first");
    }
}

const createNewMessage = (obj) => {
    var element = document.createElement("li");
    var statusClass = (obj.me === true) ? "status green" : "status blue";
    element.innerHTML = `<div class="entete">
                        <span class="${statusClass}"></span>
                        <h2>${obj.usuario}</h2>
                        <h3>${obj.fecha}</h3>
                        </div>
                        <div class="triangle"></div>
                        <div class="message">
                            ${obj.mensaje}
                        </div>`
    var isMe = (obj.me === true) ? "me" : "you";
    element.setAttribute("class", isMe);
    document.getElementById("chat").appendChild(element);

}