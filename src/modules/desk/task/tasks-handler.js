import { findItemId, selectNode } from "../../helpers";
import { renderAnytime, renderComplete, renderInbox } from "../../sidebar/menu/menu-render";
import { tasks } from "./tasks";


export const checkboxState = event => {
    const data = event.target.dataset.number;
    const checkbox = selectNode(`#task-checkbox-${data}`);

    if (checkbox.checked) {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', true);
        renderInbox();
    } else {
        const taskToUpdate = findItemId(tasks, Number(data));
        taskToUpdate.update('complete', false);
        renderComplete(); 
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