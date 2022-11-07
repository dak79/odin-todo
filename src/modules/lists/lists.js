import { List } from '../classes';
import { renderLists } from './lists-ui';
import { addListenerLists } from './lists-events';

// Lists database
export const lists = [];

export const defaultList = () => {
    const life = new List('Life');
    const work = new List('Work');

    life.add(lists);
    work.add(lists); 
    renderLists();
    addListenerLists();
}