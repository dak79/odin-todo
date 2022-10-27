import { renderPage, renderLists } from './ui-renders';
import { List } from './classes';

const inbox = [];
export const lists = [];

export const loadPage = () => {
    renderPage();
    defaultList();
}

const defaultList = () => {
    const life = new List('Life');
    const work = new List('Work');

    life.add(lists);
    work.add(lists); 
    renderLists();
}

