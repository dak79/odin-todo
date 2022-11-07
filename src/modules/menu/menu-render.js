// import { tasksRender } from '../../desk/task/tasks-render';
// import { tasks } from '../../desk/task/tasks';
// import { filterAnytimeTask, filterCompleteTask, filterIncompleteTask, filterThisWeekTask, filterTodayTask } from './menu';

// export const renderInbox = () => {
//     const incompleteTask = filterIncompleteTask(tasks);
//     tasksRender(incompleteTask);
// }

// export const renderToday = () => {
//     const todayTask = filterTodayTask(tasks);
//     const incompleteTodayTask = filterIncompleteTask(todayTask);
//     tasksRender(incompleteTodayTask);
// }

// export const renderThisWeek = () => {
//     const thisWeekTask = filterThisWeekTask(tasks);
//     const incompleteThisWeekTask = filterIncompleteTask(thisWeekTask);
//     tasksRender(incompleteThisWeekTask);
// }

// export const renderAnytime = () => {
//     const anytimeTask = filterAnytimeTask(tasks);
//     const incompleteAnytimeTask = filterIncompleteTask(anytimeTask);
//     tasksRender(incompleteAnytimeTask);
// }

// export const renderComplete = () => {
//     console.log('CLICK COMPLETE BUTTON');
//     const completeTask = filterCompleteTask(tasks);
//     tasksRender(completeTask);
// }