import { createList } from '../../helpers';
import { tasks } from './tasks';


export const createTasksUi = () => {
    const todoes = createList(tasks, taskItem, 'tasks', 'task-item');

    return todoes
}

const taskItem = () => {
    
}