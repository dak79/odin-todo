import { renderPage, renderLists } from './ui-renders';
import { Task, List } from './classes';
import { selectNode, selectNodes } from './helpers';
import { addNewList, addNewTask, showInbox, showToday, showThisWeek, showAnytime, showList } from './handlers';

const inbox = [];
export const lists = [];

export const loadPage = () => {
    renderPage();
    defaultList();
    exampleTasks();

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
    addListenerLists();
}

const addListenerLists = () => {
    const projects = selectNodes('.btn-lists');
    projects.forEach(project => project.addEventListener('click', showList))
}

const exampleTasks = () => {
    const todoOne = new Task('Go to market', 'Buy fruit and vegetables', new Date(), 1, ['Bananas', 'Apples', 'Oranges', 'Tomatoes', 'Potatos', 'Salad']);
    const todoTwo = new Task('Organize Meeting', 'Introduce new teammate', new Date(28, 9, 2022), 2, ['Send invitations', 'Prepare short presentation']);
    const todoThree = new Task('Pay Bills', 'Pay electricity and gas bills', new Date(2, 10, 2022), 3, ['Electric Bill', 'Gas Bill']);
    const todoFour = new Task('ToDo App', 'The Odin Project To Do App', new Date(20, 10, 2022), 1, ['Code Design', 'Classes', 'Ui', 'Logic', 'Set up webpack']);

    todoOne.add(inbox);
    todoTwo.add(inbox);
    todoThree.add(inbox);
    todoFour.add(inbox);
}



