import { appendChildren, setAttributes } from './helpers';

import { renderHeader } from './header/header-ui';
import { defaultList } from './lists/lists';
import { renderLists } from './lists/lists-render';
import { renderMenu } from './menu/menu-ui';
import { renderTasks } from './task/tasks-ui';
import { exampleTasks } from './task/tasks-example';

export const renderPage = () => {
    renderMain();
    renderHeader();
    renderMenu();
    renderLists();
    defaultList();
    exampleTasks();
    renderTasks('inbox');
}

const renderMain = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const sidebar = side();
    const desk = floor();
    
    root.appendChild(main);
    appendChildren(main, [sidebar, desk]);
}

const floor = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'desk',
        id:'desk'
    })

    return section;
}

const side = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        id: 'navbar',
        class: 'navbar'
    })
    const header = sideHeader();
    const navbar = sideNavbar();
    const sectionList = sideSectionLists();
    
    appendChildren(section, [header, navbar, sectionList]);
    
    return section;
}

const sideHeader = () => {
    const header = document.createElement('header');
    setAttributes(header, {
        class: 'side-header',
        id: 'side-header'
    })
    
    return header;
}

const sideNavbar = () => {
    const nav = document.createElement('nav');
    setAttributes(nav, {
        class: 'side-navbar',
        id: 'side-navbar'
    })

    return nav;
}

const sideSectionLists = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'side-section-lists',
        id: 'side-section-lists'
    })
    
    return section
}