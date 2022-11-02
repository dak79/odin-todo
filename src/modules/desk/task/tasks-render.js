import { cleanNode, selectNode } from '../../helpers';
import { createTasksUi } from './tasks-ui';

export const tasksRender = () => {
    const section = selectNode('#desk');
    const displayTasks = createTasksUi();
    cleanNode(section);
    section.appendChild(displayTasks);

}