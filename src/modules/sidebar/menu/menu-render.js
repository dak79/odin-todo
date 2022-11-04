import { tasksRender } from '../../desk/task/tasks-render';
import { addTaskListeners } from '../../desk/task/task-listeners';
import { tasks } from '../../desk/task/tasks';
import { filterAnytimeTask, filterThisWeekTask, filterTodayTask } from './menu';

export const renderInbox = () => {
    tasksRender(tasks);
    addTaskListeners();
}

export const renderToday = () => {
    const todayTask = filterTodayTask(tasks);
    tasksRender(todayTask);
    addTaskListeners();
}

export const renderThisWeek = () => {
    const thisWeekTask = filterThisWeekTask(tasks);
    tasksRender(thisWeekTask);
    addTaskListeners();
}

export const renderAnytime = () => {
    const anytimeTask = filterAnytimeTask(tasks);
    tasksRender(anytimeTask);
    addTaskListeners();
}