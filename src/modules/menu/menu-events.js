import { selectNode, selectNodes } from '../helpers';
import { renderTasks } from '../task/tasks-ui';
import { addListeners, addListener } from '../listeners';

export const menuListeners = () => {
    addListener('#btn-new-task', 'click', addNewTask);
    addListeners('.btn-menu', 'click', showMenu);
}


const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

const showMenu = event => {
    const menu = event.target.dataset.name;
    renderTasks(menu);
}