import { Task } from './task-class';
import { addTaskListeners } from './task-listeners';
import { tasksRender } from './tasks-render';


// Tasks database
export const tasks = [];

export const exampleTasks = () => {
    const todoOne = new Task('Go to market', 'Buy fruit and vegetables', new Date('2022-11-04'), 1, ['Bananas', 'Apples', 'Oranges', 'Tomatoes', 'Potatos', 'Salad']);
    const todoTwo = new Task('Organize Meeting', 'Introduce new teammate', new Date('2022-11-15'), 2, ['Send invitations', 'Prepare short presentation']);
    const todoThree = new Task('Pay Bills', 'Pay electricity and gas bills', new Date('2022-11-6'), 3, ['Electric Bill', 'Gas Bill']);
    const todoFour = new Task('ToDo App', 'The Odin Project To Do App', new Date('2022-12-8'), 1, ['Code Design', 'Classes', 'Ui', 'Logic', 'Set up webpack']);

    todoOne.add(tasks);
    todoTwo.add(tasks);
    todoThree.add(tasks);
    todoFour.add(tasks);
    orderTaskByDate(tasks);
    tasksRender(tasks);
    addTaskListeners();
}

const orderTaskByDate = array => array.sort((firstDate, secondDate) => {
    
    return (firstDate.dueDate !== null ? firstDate.dueDate : Infinity) - (secondDate.dueDate !== null ? secondDate.dueDate : Infinity)
})


