export const createNotification = (notificationType, message) =>  `
    <div class="notification ${notificationType}">
        <div class='content'>
            <div class="alert alert-${notificationType === 'success' ? 'success' : 'danger'} alert-white rounded">
                <button type="button" class="close icon-close" id="close" data-dismiss="alert" aria-hidden="true"><i class="fa fa-${notificationType === 'success' ? 'check' : 'times-circle'}"></i></button>
                <strong>${notificationType === 'success' ? '¡Correcto!' : '¡Error!'}</strong> ${message}
            </div>
        </div>
    </div>
`;
