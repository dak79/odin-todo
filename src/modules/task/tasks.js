// Tasks database
export const tasks = [];

export const orderTaskByDate = () => tasks.sort((firstDate, secondDate) =>
        firstDate.dueDate - secondDate.dueDate || secondDate.id - firstDate.id
);

export const updateTimeTasks = () => tasks.map(task => task.updateTime());

export const tasksVisualizedOn = value => tasks.map(task => task.visualizedOn = value);
