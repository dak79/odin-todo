import { renderTasks } from '../task/tasks-ui';
import { clearListeners } from '../listeners';

export const showMenu = event => {
    const menu = event.target.dataset.name;
    clearListeners();
    renderTasks(menu, false);
}
