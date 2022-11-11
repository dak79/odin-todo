import { selectNode, saveOnEnter } from '../helpers';
import { lists, checkListName } from './lists';
import { List } from '../classes';
import { newListUi, renderLists } from './lists-ui';
import { clearListeners } from '../listeners';

export const showList = event => {
    event.stopPropagation();
   
    console.log(event.target);
}
