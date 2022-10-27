import { appendChildren } from './helpers';
import { side } from './ui-sidebar';
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
