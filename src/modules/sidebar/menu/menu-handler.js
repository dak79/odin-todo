import { renderTasks } from '../../desk/task/tasks-render';
import { selectNode, cleanNode } from '../../helpers';
import { tasks, tasksVisualizedOn, orderTaskByDate } from '../../desk/task/tasks';

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
