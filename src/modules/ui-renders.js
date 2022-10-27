import { appendChildren, selectNode, cleanNode } from './helpers';
import { side, createLists } from './ui-sidebar';
import { floor } from './ui-desk';

export const renderPage = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const sidebar = side();
    const desk = floor();
     
    root.appendChild(main);
    appendChildren(main, [sidebar, desk]);
}

export const renderLists = () => {
    const section = selectNode('#side-section-lists');
    const updateList = createLists();
    cleanNode(section);
    section.appendChild(updateList);
}




