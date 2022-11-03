import { selectNodes } from '../../helpers';
import { checkboxState, expandTask, selectDate, editTask, deleteTask } from './tasks-handler';

export const addTaskListeners = () => {
    const checkboxes = selectNodes('.tasks-checkbox');
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', checkboxState));

    const expandBtns = selectNodes('.expand-btn');
    expandBtns.forEach(btn => btn.addEventListener('click', expandTask))

    const dueDates = selectNodes('.task-due-date');
    dueDates.forEach(date => date.addEventListener('click', selectDate))
    
    const editBtns = selectNodes('.task-edit-btn');
    editBtns.forEach(btn => btn.addEventListener('click', editTask));
    
    const deleteBtns = selectNodes('.task-delete-btn');
    deleteBtns.forEach(btn => btn.addEventListener('click', deleteTask));
}