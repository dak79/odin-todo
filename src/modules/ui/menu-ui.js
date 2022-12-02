import { btnsUi } from './btns-ui';
import { selectNode, createList } from '../helpers';
import { Menu } from '../classes';

/**
 * Render navigation menu.
 */
export const renderMenu = () => {
    const nav = selectNode('#nav-menu')
    const menu = createMenu();
    nav.appendChild(menu);
}

const createMenu = () => {
    const menu = createList([new Menu(1, 'Inbox'), new Menu(2, 'Today'), new Menu(3, 'This Week'), new Menu(4, 'Anytime'), new Menu(5, 'Complete')], 'menu', navBtn, 'menu', 'menu', 'menu-items');

    return menu;
}

/**
 * Create menu buttons.
 * @param { {} } menu - menu button.
 * @property { string } title - menu name. 
 * @returns { HTMLElement } - Button
 */
const navBtn = menu => {
    const btn = btnsUi(menu, 'menu', 'title', 'btns menu-btns text-btns', `Menu Button: ${menu.title}`, 'menu-title', menu.title);
    
    return [btn];
}
