import { btnsUi } from '../ui/btns-ui';
import { selectNode, createList } from '../helpers';
import { addAppListeners } from '../listeners';
import { Menu } from '../classes';

/**
 * Render navigation menu.
 * @param { boolean } isFirstLoad - Check if it is first load for page.
 */
export const renderMenu = isFirstLoad => {
    const nav = selectNode('#nav-menu')
    const menu = createMenu();
    nav.appendChild(menu);
    if (!isFirstLoad) addAppListeners();
}

const createMenu = () => {
    const menu = createList([new Menu(1, 'Inbox'), new Menu(2, 'Today'), new Menu(3, 'This Week'), new Menu(4, 'Anytime'), new Menu(5, 'Complete')], 'menu', navBtn, 'menu', 'menu', 'menu-items');

    return menu;
}

/**
 * Create menu buttons.
 * @param { Object } desk - Desk button.
 * @property { string } title - Desk name. 
 * @returns { HTMLElement } - Button
 */
const navBtn = desk => {
    const btn = btnsUi(desk, 'menu', 'title', 'btns menu-btns text-btns', `Menu Button: ${desk.title}`, 'menu-title', desk.title);
    
    return [btn];
}
