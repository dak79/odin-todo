import { setAttributes, appendChildren, createList, navBtn } from '../helpers';
import '../../styles/sidebar.css';

export const side = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        id: 'navbar',
        class: 'navbar'
    })
    const header = sideHeader();
    const navbar = sideNavbar();
    const sectionList = sideSectionLists();
    const footer = sideFooter();

    appendChildren(section, [header, navbar, sectionList, footer]);
    
    return section;
}

const sideHeader = () => {
    const header = document.createElement('header');
    header.classList.add('side-header');
    
    const logo = createLogo();
    const title = createTitle();

    appendChildren(header, [logo, title]);
    return header;
}

const createLogo = () => {
    const logo = document.createElement('div');
    logo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3,5H9V11H3V5M5,7V9H7V7H5M11,7H21V9H11V7M11,15H21V17H11V15M5,20L1.5,16.5L2.91,15.09L5,17.17L9.59,12.59L11,14L5,20Z" /></svg>'
    
    return logo;
}

const createTitle = () => {
    const title = document.createElement('h1');
    title.classList.add('side-title');
    title.textContent = 'ToDo'

    return title;
}

const sideNavbar = () => {
    const nav = document.createElement('nav');
    nav.classList.add('side-navbar');
    const menu = createMenu();

    nav.appendChild(menu);
    return nav;
}

const createMenu = () => {
    const menu = createList([{title: 'Inbox'}, {title: 'Today'}, {title: 'This Week'}, {title: 'Anytime'}], navBtn, 'menu', 'menu-items');

    return menu;
}

const sideSectionLists = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'side-section-lists',
        id: 'side-section-lists'
    })
    
    return section
}

const sideFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('side-footer');
   
    const btnNewTask = createBtnNewTask();

    appendChildren(footer, [btnNewTask]);
    return footer;
}

const createBtnNewTask = () => {
    const btnNewTask = document.createElement('button');
    setAttributes(btnNewTask, {
        type: 'button',
        id: 'btn-new-task',
        class: 'btn-footer'
    })
    btnNewTask.textContent = '+ New Task';

    return btnNewTask;
}
