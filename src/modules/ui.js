import { appendChildren, setAttributes, createList, sideButton } from "./helpers";
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
    header.classList.add('sideHeader');
    
    const logo = document.createElement('img');
    setAttributes(logo, {
        src: logoImg,
        alt: 'logo To Do',
        class: 'logo-img'
     });

    const title = document.createElement('h1');
    title.classList.add('title-side');
    title.textContent = 'To Do';

    appendChildren(header, [logo, title]);
    return header;
}

const sideNavbar = () => {
    const nav = document.createElement('nav');
    const menu = createList(['Inbox', 'Today', 'This Week', 'Any Time'], sideButton, 'menu');

    nav.appendChild(menu);

    return nav;

}

const sideSectionLists = () => {
    const list = document.createElement('section');

    return list

}

const sideFooter = () => {
    const footer = document.createElement('footer');

    return footer;
}
const floor = () => {
    const section = document.createElement('section');
    section.classList.add('desk');

    return section;
}