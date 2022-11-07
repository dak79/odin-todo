import { renderTasks } from '../task/tasks-ui';
import { selectNode, cleanNode } from '../helpers';
import { tasks, tasksVisualizedOn, orderTaskByDate } from '../task/tasks';

export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showMenu = event => {
    const menu = event.target.dataset.name;
    const desk = selectNode('#desk');
    cleanNode(desk);

    orderTaskByDate(tasks);
    tasksVisualizedOn(tasks, menu);

    renderTasks(tasks, menu);
}
