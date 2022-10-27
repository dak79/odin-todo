import { setAttributes, appendChildren, createList, sideBtn } from './helpers';
import logoImg from '../assets/icons/logo.svg';
import { lists } from './todo';

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
    const logo = document.createElement('img');
    setAttributes(logo, {
        src: logoImg,
        alt: 'logo To Do',
        class: 'logo-img'
     });

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
    const menu = createList([{title: 'Inbox'}, {title: 'Today'}, {title: 'This Week'}, {title: 'Any Time'}], sideBtn, 'menu');

    return menu;
}

const sideSectionLists = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'side-section-lists',
        id: 'side-section-lists'
    })
    const projects = createLists()
        
    section.appendChild(projects);

    return section
}

export const createLists = () => {
    const projects = createList(lists, sideBtn, 'lists');
    return projects;
}

const sideFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('side-footer');
    const btnNewList = createBtnNewList();
   
    const btnNewTask = createBtnNewTask();

    appendChildren(footer, [btnNewList, btnNewTask]);
    return footer;
}

const createBtnNewList = () => {
    const btnNewList = document.createElement('button');
    setAttributes(btnNewList, {
        type: 'button',
        id: 'btn-new-list',
        class: 'btn-footer'
    });
    btnNewList.textContent = '+ New List';

    return btnNewList; 
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
