import { findItemId, selectNode } from "../../helpers";
import { addTaskListeners } from "./task-listeners";
import { tasks } from "./tasks";
import { tasksRender } from "./tasks-render";


export const checkboxState = event => {
    const data = event.target.dataset.number;
    const checkbox = selectNode(`#task-checkbox-${data}`);

    if (checkbox.checked) {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', true);
        taskToUpdate.addTag('complete');
        taskToUpdate.tags = taskToUpdate.tags.filter(tag => tag === 'complete');
        tasksRender(tasks, taskToUpdate.visualizedOn);
        addTaskListeners();

    } else {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', false);
        taskToUpdate.deleteTag('complete');
        taskToUpdate.addTag('inbox');
        taskToUpdate.updateTags();
        tasksRender(tasks, 'complete');
        addTaskListeners();
    }
}

export const expandTask = () => {
    console.log('CLICK EXPAND TASK');
}

export const selectDate = () => {
    console.log('CLICK ON SELECT DATE');
}

export const editTask = () => {
    console.log('CLICK ON EDIT TASK');
}

export const deleteTask = () => {
    console.log('CLICK ON DELETE TASK');
}