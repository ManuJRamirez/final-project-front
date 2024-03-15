import { menuLoggedSession, menuUnloggedSession } from "./sessionView.js";

export const sessionController = (nav) => {
    
    if(isAccountLoggedIn()) {
        nav.innerHTML = menuLoggedSession();
        const loggoutButton = nav.querySelector('button');
        loggoutButton.addEventListener('click', () => {
            localStorage.removeItem('token');
            sessionController(nav);
        })
    }
    if(!isAccountLoggedIn()){
        nav.innerHTML = menuUnloggedSession();
    }
    
}


const isAccountLoggedIn = () => {
    return localStorage.getItem('token');
};