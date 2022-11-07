import { renderInbox } from '../../sidebar/menu/menu-render';
import { Task } from './task-class';
import { tasksRender } from './tasks-render';


// Tasks database
export const tasks = [];

export const exampleTasks = () => {
    const todoOne = new Task('Go to market', 'Buy fruit and vegetables', new Date('2022-11-04'), 1, ['Bananas', 'Apples', 'Oranges', 'Tomatoes', 'Potatos', 'Salad']);
    const todoTwo = new Task('Organize Meeting', 'Introduce new teammate', new Date('2022-11-15'), 2, ['Send invitations', 'Prepare short presentation']);
    const todoThree = new Task('Pay Bills', 'Pay electricity and gas bills', new Date('2022-11-6'), 3, ['Electric Bill', 'Gas Bill']);
    const todoFour = new Task('ToDo App', 'The Odin Project To Do App', new Date('2022-12-8'), 1, ['Code Design', 'Classes', 'Ui', 'Logic', 'Set up webpack']);
    const todoFive = new Task('Passport - Date null control', 'Kaya Passport', null, 1, ['Print Document', 'Send document by mail']);
    const todoSix = new Task('Call Police - In late control', 'Driving Licence', new Date('2022-10-28'), 1, ['Print Document', 'Send document by mail']);
    const todoSeven = new Task('Buy chili pepper', 'Get some spicy taste, sometime', new Date('2022-11-08'), 1, ['Take metro']);
    const todoEight = new Task('Mail', 'Send me mail please', new Date('2022-11-04'), 1, ['Take metro']);
    
    todoOne.add(tasks);
    todoTwo.add(tasks);
    todoThree.add(tasks);
    todoFour.add(tasks);
    todoFive.add(tasks);
    todoSix.add(tasks);
    todoSeven.add(tasks);
    todoEight.add(tasks);
    orderTaskByDate(tasks);
    tasksVisualizedOn(tasks, 'inbox')
    tasksRender(tasks, 'inbox')
    console.log(tasks);
}

export const orderTaskByDate = array => array.sort((firstDate, secondDate) => {
    
    return (firstDate.dueDate !== null ? firstDate.dueDate : Infinity) - (secondDate.dueDate !== null ? secondDate.dueDate : Infinity)
})

export const tasksVisualizedOn = (array, value) => {
    array.map(item => {
        item.visualizedOn = value;
    })
}

export const tasksCheckDueDate = array => {
    const today = filterTodayTask(array);
    console.log(today);
    const thisWeek = filterThisWeekTask(array);
    console.log(thisWeek);
    const anytime = filterAnytimeTask(array);
    console.log(anytime);

    
}

export const filterTodayTask = array => {
    const today = new Date();
    
    return array.filter(item => item.dueDate ? item.dueDate.toLocaleDateString() === today.toLocaleDateString() : 0);
}

export const filterThisWeekTask = array => {
    const thisWeek = getWeekNumber(new Date);
    return array.filter(item => getWeekNumber(item.dueDate) === thisWeek);
}

export const filterAnytimeTask = array => {
    const today = new Date();
    const thisWeek = getWeekNumber(new Date);

    return array.filter(item => getWeekNumber(item.dueDate) > thisWeek || !item.dueDate || getWeekNumber(item.dueDate) < today);
}

const getWeekNumber = date => {
    const currentDate = date;
    
    const startDate = date ? new Date(currentDate.getFullYear(), 0, 1) : 0;
    const days = Math.ceil((currentDate - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.floor(days/7);
    
    return weekNumber;
}

export const filterIncompleteTask = array => array.filter(item => item.complete === false);

export const filterCompleteTask = array => array.filter(item => item.complete === true);