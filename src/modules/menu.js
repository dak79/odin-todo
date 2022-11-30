import { renderTasks } from './ui/tasks-ui';
import { clearListeners, listeners } from './listeners';

export const showMenu = event => {
    const menu = event.target.dataset.name;
    clearListeners(listeners);
    renderTasks(menu, false);
}
