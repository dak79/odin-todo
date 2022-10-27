import { appendChildren, setAttributes, createList, sideButton } from "./helpers";
import { lists } from "./todo";
import logoImg from '../assets/icons/logo.svg';

export const hooks = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const navbar = side();
    const desk = floor(); 

    root.appendChild(main);
    appendChildren(main, [navbar, desk]);
}

const side = () => {
    const section = document.createElement('section');
    section.classList.add('navbar');
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
    
    const logo = document.createElement('img');
    setAttributes(logo, {
        src: logoImg,
        alt: 'logo To Do',
        class: 'logo-img'
     });

    const title = document.createElement('h1');
    title.classList.add('side-title');
    title.textContent = 'ToDo';

    appendChildren(header, [logo, title]);
    return header;
}

const sideNavbar = () => {
    const nav = document.createElement('nav');
    nav.classList.add('side-navbar');
    const menu = createList(['Inbox', 'Today', 'This Week', 'Any Time'], sideButton, 'menu');

    nav.appendChild(menu);
    return nav;
}

const sideSectionLists = () => {
    const section = document.createElement('section');
    section.classList.add('side-section-lists');
    const list = createList(lists, sideButton, 'lists');

    section.appendChild(list);

    return section
}

const sideFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('side-footer');
    const btnNewList = document.createElement('button');
    setAttributes(btnNewList, {
        type: 'button',
        id: 'btn-new-list',
        class: 'btn-footer'
    });
    btnNewList.textContent = '+ New List';

    const btnNewTask = document.createElement('button');
    setAttributes(btnNewTask, {
        type: 'button',
        id: 'btn-new-task',
        class: 'btn-footer'
    })
    btnNewTask.textContent = '+ New Task';

    appendChildren(footer, [btnNewList, btnNewTask]);
    return footer;
}
const floor = () => {
    const section = document.createElement('section');
    section.classList.add('desk');

    return section;
}