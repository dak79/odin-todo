import { selectNode } from "../../helpers";
import { addNewTask, showInbox, showToday, showThisWeek, showAnytime, showComplete } from './menu-handler';

export const menuListeners = () => {
     
    const btnNewTask = selectNode('#btn-new-task');
    btnNewTask.addEventListener('click', addNewTask);

    const btnInbox = selectNode('#btn-inbox');
    btnInbox.addEventListener('click', showInbox);

    const btnToday = selectNode('#btn-today');
    btnToday.addEventListener('click', showToday);

    const btnThisWeek = selectNode('#btn-this-week');
    btnThisWeek.addEventListener('click', showThisWeek);

    const btnAnytime = selectNode('#btn-anytime');
    btnAnytime.addEventListener('click', showAnytime);

    const btnComplete = selectNode('#btn-complete');
    btnComplete.addEventListener('click', showComplete)
}