import { addNewTask, showInbox, showToday, showThisWeek, showAnytime } from './handlers';
import { addNewList } from './lists/lists-handlers';
import { selectNode } from './helpers';

export const mainPageListeners = () => {
     const btnNewList = selectNode('#btn-new-list');
     btnNewList.addEventListener('click', addNewList);
     
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
}