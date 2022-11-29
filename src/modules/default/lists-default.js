import { List } from '../classes';
import { lists } from '../lists/lists';

export const defaultList = () => {
    const life = new List('Life');
    const work = new List('Work');

    life.add(lists);
    work.add(lists); 
}
