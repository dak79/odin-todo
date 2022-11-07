import { createMain } from './ui';
import { renderHeader } from './sidebar/header/header-render';
import { defaultList } from './sidebar/lists/lists';
import { renderLists } from './sidebar/lists/lists-render';
import { renderMenu } from './sidebar/menu/menu-ui';
import { renderTasks } from './desk/task/tasks-ui';
import { exampleTasks } from './desk/task/tasks';
import { tasks } from './desk/task/tasks';
import { renderInbox } from './sidebar/menu/menu-render';

export const renderPage = () => {
    
    createMain();
    renderHeader();
    renderMenu();
    renderLists();
    defaultList();
    // UPDATE TIME e MIGLIORARE LA CHIAMATA DI RENDER TASK DOPO EXAMPLE.
    exampleTasks();
}
