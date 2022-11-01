import { createMain } from './ui';
import { renderHeader } from './sidebar/header/header-render';
import { defaultList } from './sidebar/lists/lists';
import { renderLists } from './sidebar/lists/lists-render';
import { renderMenu } from './sidebar/menu/menu-ui';

export const renderPage = () => {
    
    createMain();
    renderHeader();
    renderMenu();
    renderLists();
    defaultList();
}
