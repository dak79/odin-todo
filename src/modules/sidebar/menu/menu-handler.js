import { tasksRender } from '../../desk/task/tasks-render';
import { selectNode, cleanNode } from '../../helpers';
import { renderInbox, renderToday, renderThisWeek, renderAnytime, renderComplete } from './menu-render';
import { tasks } from '../../desk/task/tasks';

export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showMenu = event => {
    const menu = event.target.dataset.name;
    const desk = selectNode('#desk');
    cleanNode(desk);
    tasksRender(tasks, menu);
    console.log(tasks);
}

export const showInbox = () => {
}

export const showToday = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderToday();
}

export const showThisWeek = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderThisWeek();
}

export const showAnytime = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderAnytime();
}

export const showComplete = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    renderComplete();
}