import { cleanNode, selectNode } from '../../helpers';
import { createTasksUi } from './tasks-ui';

export const tasksRender = (array, type) => {
    const section = selectNode('#desk');
    const displayTasks = createTasksUi(array, type);
    cleanNode(section);
    section.appendChild(displayTasks);
}