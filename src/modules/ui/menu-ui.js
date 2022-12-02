import { titleBtn } from './btns-ui';
import { selectNode, createLi, createUl } from '../helpers';
import { Menu } from '../classes';

/**
 * Render navigation menu.
 */
export const renderMenu = () => {
    const nav = selectNode('#nav-menu')
    const menuItems = [new Menu(1, 'Inbox'), new Menu(2, 'Today'), new Menu(3, 'This Week'), new Menu(4, 'Anytime'), new Menu(5, 'Complete')];

    const ul = createUl('menu');
    menuItems.map(item => {
        const node = createLi(item, ['menu-items'], navBtn);
        ul.appendChild(node);    
    });
    nav.appendChild(ul);
}

/**
 * Create menu buttons.
 * @param { {} } menu - menu button.
 * @property { string } title - menu name. 
 * @returns { HTMLElement } - Button
 */
const navBtn = menu => {
    const btn = titleBtn(menu, 'title', ['btns', 'menu-btns', 'text-btns'], `Menu button: ${menu.title}`)
    // const btn = btnsUi( menu, 'menu', 'title', 'btns menu-btns text-btns', `Menu Button: ${menu.title}`, 'menu-title', menu.title);
    
    return [btn];
}
