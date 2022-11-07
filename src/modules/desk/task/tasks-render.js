import { cleanNode, selectNode } from '../../helpers';
import { createTasksUi } from './tasks-ui';
import { addTaskListeners } from './tasks-events';

export const renderTasks = (array, type) => {
    const section = selectNode('#desk');
    const displayTasks = createTasksUi(array, type);
    cleanNode(section);
    section.appendChild(displayTasks);
    addTaskListeners();
}