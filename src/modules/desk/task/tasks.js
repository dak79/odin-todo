import { Task } from "./task-class";

// Tasks database
export const tasks = [];

export const exampleTasks = () => {
    const todoOne = new Task('Go to market', 'Buy fruit and vegetables', new Date(), 1, ['Bananas', 'Apples', 'Oranges', 'Tomatoes', 'Potatos', 'Salad']);
    const todoTwo = new Task('Organize Meeting', 'Introduce new teammate', new Date(28, 9, 2022), 2, ['Send invitations', 'Prepare short presentation']);
    const todoThree = new Task('Pay Bills', 'Pay electricity and gas bills', new Date(2, 10, 2022), 3, ['Electric Bill', 'Gas Bill']);
    const todoFour = new Task('ToDo App', 'The Odin Project To Do App', new Date(20, 10, 2022), 1, ['Code Design', 'Classes', 'Ui', 'Logic', 'Set up webpack']);

    todoOne.add(tasks);
    todoTwo.add(tasks);
    todoThree.add(tasks);
    todoFour.add(tasks);
}