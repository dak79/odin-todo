// Tasks database
export const tasks = [];

export const orderTaskByDate = () => tasks.sort((firstDate, secondDate) =>(firstDate.dueDate !== null ? firstDate.dueDate : Infinity) - (secondDate.dueDate !== null ? secondDate.dueDate : Infinity));

export const updateTimeTasks = () => tasks.map(task => task.updateTime());

export const tasksVisualizedOn = value => tasks.map(task => task.visualizedOn = value);
