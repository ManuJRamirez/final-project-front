import { misChatsController } from "./misChatsController.js";


const enviarMensajeFormData = document.querySelector('#enviarMensajeForm');

document.addEventListener('DOMContentLoaded', () => {
    misChatsController(enviarMensajeFormData);
    
});