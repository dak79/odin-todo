import { renderTasks } from '../task/tasks-ui';
import { clearListeners } from '../listeners';

export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showMenu = event => {
    const menu = event.target.dataset.name;
    clearListeners();
    renderTasks(menu, false);
}