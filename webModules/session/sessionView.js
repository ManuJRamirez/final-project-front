export const menuLoggedSession = () => {
    return `
    <ul>
        <li>
            <a href="../post-ad.html">¡Cree su anuncio AHORA!<a>
            <button>Cerrar sesión</button>
        </li>
    </ul>        
    `;
}

export const menuUnloggedSession = () => {
    return `
    <ul>
        <li>
            <a href="../login.html">¡Conéctate ahora!</a>
            <a href="../signup.html">¡Registrate!</a>
        </li>
    </ul>
    `;
}