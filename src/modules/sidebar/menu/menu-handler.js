import { selectNode, cleanNode } from '../../helpers';
import { tasksRender } from '../../desk/task/tasks-render';
import { addTaskListeners } from '../../desk/task/task-listeners';
export const addNewTask = () => {
    console.log('CLICK NEW TASK');
}

export const showInbox = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    tasksRender();
    addTaskListeners();

    console.log('CLICK SHOW INBOX');
}
export const showToday = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    console.log('CLICK SHOW TODAY');
}
export const showThisWeek = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    console.log('CLICK SHOW THIS WEEK');
}
export const showAnytime = () => {
    const desk = selectNode('#desk');
    cleanNode(desk);
    console.log('CLICK SHOW ANYTIME');
}