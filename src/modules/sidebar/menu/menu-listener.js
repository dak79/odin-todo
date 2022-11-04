import { selectNode, selectNodes } from "../../helpers";
import { addNewTask, showInbox, showToday, showThisWeek, showAnytime, showComplete, showMenu } from './menu-handler';

export const menuListeners = () => {
     
    const btnNewTask = selectNode('#btn-new-task');
    btnNewTask.addEventListener('click', addNewTask);

    const btnsMenu = selectNodes('.btn-menu');
    console.log(btnsMenu);
    btnsMenu.forEach(btn => btn.addEventListener('click', showMenu));

    // const btnInbox = selectNode('#btn-inbox');
    // btnInbox.addEventListener('click', showInbox);

    // const btnToday = selectNode('#btn-today');
    // btnToday.addEventListener('click', showToday);

    // const btnThisWeek = selectNode('#btn-this-week');
    // btnThisWeek.addEventListener('click', showThisWeek);

    // const btnAnytime = selectNode('#btn-anytime');
    // btnAnytime.addEventListener('click', showAnytime);

    // const btnComplete = selectNode('#btn-complete');
    // btnComplete.addEventListener('click', showComplete)
}