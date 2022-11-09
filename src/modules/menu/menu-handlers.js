import { renderTasks } from '../task/tasks-ui';

export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showMenu = event => {
    const menu = event.target.dataset.name;
    renderTasks(menu, false);
}