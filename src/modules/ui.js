import { appendChildren } from './helpers';
import { side } from './sidebar/ui-sidebar';
import { floor } from './desk/ui-desk';

export const createMain = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const sidebar = side();
    const desk = floor();
    
    root.appendChild(main);
    appendChildren(main, [sidebar, desk]);

}