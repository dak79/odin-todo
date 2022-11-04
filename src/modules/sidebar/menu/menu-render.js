import { tasksRender } from '../../desk/task/tasks-render';
import { addTaskListeners } from '../../desk/task/task-listeners';
import { tasks } from '../../desk/task/tasks';
import { filterAnytimeTask, filterCompleteTask, filterIncompleteTask, filterThisWeekTask, filterTodayTask } from './menu';

export const renderInbox = () => {
    const incompleteTask = filterIncompleteTask(tasks);
    tasksRender(incompleteTask);
    addTaskListeners();
}

export const renderToday = () => {
    const todayTask = filterTodayTask(tasks);
    const incompleteTodayTask = filterIncompleteTask(todayTask);
    tasksRender(incompleteTodayTask);
    addTaskListeners();
}

export const renderThisWeek = () => {
    const thisWeekTask = filterThisWeekTask(tasks);
    const incompleteThisWeekTask = filterIncompleteTask(thisWeekTask);
    tasksRender(incompleteThisWeekTask);
    addTaskListeners();
}

export const renderAnytime = () => {
    const anytimeTask = filterAnytimeTask(tasks);
    const incompleteAnytimeTask = filterIncompleteTask(anytimeTask);
    tasksRender(incompleteAnytimeTask);
    addTaskListeners();
}

export const renderComplete = () => {
    console.log('CLICK COMPLETE BUTTON');
    const completeTask = filterCompleteTask(tasks);
    tasksRender(completeTask);
    addTaskListeners();
}