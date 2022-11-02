import { setAttributes } from "../../helpers";

export const createLogo = () => {
    const logo = document.createElement('div');
    setAttributes(logo, {
        class: 'side-header-logo',
        id: 'side-header-logo'
    })
    logo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#f59e0b" d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z" /></svg>';
    
    return logo;
}

export const createTitle = () => {
    const title = document.createElement('h1');
    setAttributes(title, {
        class: 'side-title',
        id: 'side-header-title'
    })
 
    title.textContent = 'ToDo'

    return title;
}

export const createBtnNewTask = () => {
    const btnNewTask = document.createElement('button');
    setAttributes(btnNewTask, {
        type: 'button',
        id: 'btn-new-task',
        class: 'btn'
    })
    btnNewTask.textContent = '+';

    return btnNewTask;
}
