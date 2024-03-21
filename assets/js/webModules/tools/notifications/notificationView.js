export const createNotification = (notificationType, message) =>{

    return notificationType === 'success' ? `
    <div class="notification ${notificationType}">
        <div class='content'>
            <div class="alert alert-success alert-white rounded">
                <button type="button" class="close" id="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div class="icon"><i class="fa fa-check"></i></div>
                <strong>¡Correcto!</strong> ${message}
            </div>
        </div>
    </div>
    `
    :

    `  
    <div class="notification ${notificationType}">
        <div class='content'>
            <div class="alert alert-danger alert-white rounded">
                <button type="button" class="close" id="close" data-dismiss="alert" aria-hidden="true">×</button>
                <div class="icon"><i class="fa fa-times-circle"></i></div>
                <strong>¡Error!</strong> ${message}
            </div>
        </div>
    </div>
    `
}