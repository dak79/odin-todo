import { cleanNode, selectNode } from '../../helpers';

export const tasksRender = () => {
    const section = selectNode('#desk');
    const displayTasks = createTasksUi();
    cleanNode(section);
    section.appendChild(displayTasks);

}