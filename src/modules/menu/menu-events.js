import { selectNode, selectNodes } from '../helpers';
import { renderTasks } from '../task/tasks-ui';

export const menuListeners = () => {
     
    const btnNewTask = selectNode('#btn-new-task');
    btnNewTask.addEventListener('click', addNewTask);

    const btnsMenu = selectNodes('.btn-menu');
    btnsMenu.forEach(btn => btn.addEventListener('click', showMenu));
}

const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

const showMenu = event => {
    const menu = event.target.dataset.name;
    renderTasks(menu);
}