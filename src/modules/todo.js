import { renderPage, renderLists } from './ui-renders';
import { List } from './classes';
import { selectNode } from './helpers';
import { addNewList, addNewTask, showInbox, showToday, showThisWeek, showAnytime } from './handlers';

const inbox = [];
export const lists = [];

export const loadPage = () => {
    renderPage();
    defaultList();

    /* Event Listeners */
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

const defaultList = () => {
    const life = new List('Life');
    const work = new List('Work');

    life.add(lists);
    work.add(lists); 
    renderLists();
}

