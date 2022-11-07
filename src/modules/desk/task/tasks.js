


// Tasks database
export const tasks = [];

export const orderTaskByDate = () => tasks.sort((firstDate, secondDate) =>(firstDate.dueDate !== null ? firstDate.dueDate : Infinity) - (secondDate.dueDate !== null ? secondDate.dueDate : Infinity));

export const updateTimeTasks = () => {
    tasks.map(task => {
        task.updateTime();
    });
}
export const tasksVisualizedOn = value => {
    tasks.map(task => {
        task.visualizedOn = value;
    })
}

// export const tasksCheckDueDate = array => {
//     const today = filterTodayTask(array);
//     console.log(today);
//     const thisWeek = filterThisWeekTask(array);
//     console.log(thisWeek);
//     const anytime = filterAnytimeTask(array);
//     console.log(anytime);

    
// }

// export const filterTodayTask = array => {
//     const today = new Date();
    
//     return array.filter(item => item.dueDate ? item.dueDate.toLocaleDateString() === today.toLocaleDateString() : 0);
// }

// export const filterThisWeekTask = array => {
//     const thisWeek = getWeekNumber(new Date);
//     return array.filter(item => getWeekNumber(item.dueDate) === thisWeek);
// }

// export const filterAnytimeTask = array => {
//     const today = new Date();
//     const thisWeek = getWeekNumber(new Date);

//     return array.filter(item => getWeekNumber(item.dueDate) > thisWeek || !item.dueDate || getWeekNumber(item.dueDate) < today);
// }

// const getWeekNumber = date => {
//     const currentDate = date;
    
//     const startDate = date ? new Date(currentDate.getFullYear(), 0, 1) : 0;
//     const days = Math.ceil((currentDate - startDate) / (24 * 60 * 60 * 1000));
//     const weekNumber = Math.floor(days/7);
    
//     return weekNumber;
// }

export const filterIncompleteTask = array => array.filter(item => item.complete === false);

export const filterCompleteTask = array => array.filter(item => item.complete === true);