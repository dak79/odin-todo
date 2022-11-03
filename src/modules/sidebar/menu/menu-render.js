import { tasksRender } from '../../desk/task/tasks-render';
import { addTaskListeners } from '../../desk/task/task-listeners';
import { tasks } from '../../desk/task/tasks';
import { filterTodayTask } from '../../helpers';

export const renderInbox = () => {
    tasksRender(tasks);
    addTaskListeners();
}

export const renderToday = () => {
    const todayTask = filterTodayTask(tasks);
    tasksRender(todayTask);
}