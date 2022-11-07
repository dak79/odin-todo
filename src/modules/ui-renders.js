import { createMain } from './ui';
import { renderHeader } from './sidebar/header/header-render';
import { defaultList } from './sidebar/lists/lists';
import { renderLists } from './sidebar/lists/lists-render';
import { renderMenu } from './sidebar/menu/menu-ui';
import { renderTasks } from './desk/task/tasks-ui';
import { exampleTasks } from './desk/task/tasks-example';

export const renderPage = () => {
    
    createMain();
    renderHeader();
    renderMenu();
    renderLists();
    defaultList();
    exampleTasks();
    renderTasks('inbox');
}
