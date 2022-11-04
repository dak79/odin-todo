import { createMain } from './ui';
import { renderHeader } from './sidebar/header/header-render';
import { defaultList } from './sidebar/lists/lists';
import { renderLists } from './sidebar/lists/lists-render';
import { renderMenu } from './sidebar/menu/menu-ui';
import { tasksRender } from './desk/task/tasks-render';
import { exampleTasks } from './desk/task/tasks';
import { tasks } from './desk/task/tasks';
import { renderInbox } from './sidebar/menu/menu-render';

export const renderPage = () => {
    
    createMain();
    renderHeader();
    renderMenu();
    renderLists();
    defaultList();
    //renderInbox();
    exampleTasks();
}
