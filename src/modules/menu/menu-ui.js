import { btnsUi } from '../ui/btns-ui';
import { selectNode, createList } from '../helpers';
import { addAppListeners } from '../listeners';

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

const menuArr = [
    {   
        id: 1,
        title: 'Inbox',
        tags:['menu']
    },
    {
        id: 2,
        title: 'Today',
        tags:['menu']
    },
    {
        id: 3,
        title: 'This Week',
        tags:['menu']
    },
    {
        id: 4,
        title: 'Anytime',
        tags:['menu']
    },
    {
        id: 5,
        title: 'Complete',
        tags:['menu']
    }
]

const createMenu = () => {
    const menu = createList(menuArr, 'menu', navBtn, 'menu', 'menu', 'menu-items');

    return menu;
}

/**
 * Create menu buttos.
 * @param { Object } desk - Desk button.
 * @property { string } title - Desk name. 
 * @returns { HTMLElement } - Button
 */
const navBtn = desk => {
    const btn = btnsUi(desk, 'menu', 'title', 'btns menu-btns text-btns', `Menu Button: ${desk.title}`, 'menu-title', desk.title);
    
    return [btn];
}
