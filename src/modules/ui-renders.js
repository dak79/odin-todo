import { createMain } from './ui';
import { renderHeader } from './sidebar/header/header-render';
import { defaultList } from './sidebar/lists/lists';
import { renderLists } from './sidebar/lists/lists-render';
import { renderMenu } from './sidebar/menu/menu-ui';
import { tasksRender } from './desk/task/tasks-render';
import { exampleTasks } from './desk/task/tasks';
import { lazy } from './helpers';

export const renderPage = () => {
    
    createMain();
    renderHeader();
    renderMenu();
    renderLists();
    defaultList();
    tasksRender();
    exampleTasks();
}

// export const lazy = (URI, mod) => {
//     import(URI).then((module) => {
//         module[mod];
//     })

// }
