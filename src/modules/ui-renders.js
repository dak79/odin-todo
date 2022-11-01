import { appendChildren } from './helpers';
import { defaultList } from './sidebar/lists/lists';
import { renderLists } from './sidebar/lists/lists-ui';
import { renderMenu } from './sidebar/menu/menu-ui';
import { side } from './sidebar/ui-sidebar';
import { floor } from './ui-desk';

export const renderPage = () => {
    
    createMain();
    renderMenu();
    renderLists();
    defaultList();
}

const createMain = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const sidebar = side();
    const desk = floor();
    
    root.appendChild(main);
    appendChildren(main, [sidebar, desk]);

}
