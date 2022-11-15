import { Task } from '../classes';
import { tasks, tasksVisualizedOn } from './tasks';

export const exampleTasks = () => {
    const todoOne = new Task('Go to market', 'Buy fruit and vegetables', new Date('2022-11-04'), 'low', ['Bananas', 'Apples', 'Oranges', 'Tomatoes', 'Potatos', 'Salad', 'Carrots', 'Onions']);
    todoOne.add(tasks);
    
    const todoTwo = new Task('Organize Meeting', 'Introduce new teammate', new Date('2022-11-10'), 'medium', ['Send invitations', 'Prepare short presentation']);
    todoTwo.add(tasks);
    
    const todoThree = new Task('Pay Bills', 'Pay electricity and gas bills', new Date('2022-11-6'), 'high', ['Electric Bill', 'Gas Bill']);
    todoThree.add(tasks);
  
    const todoFour = new Task('ToDo App', 'The Odin Project To Do App', new Date('2023-7-8'), 'low', ['Code Design', 'Classes', 'Ui', 'Logic', 'Set up webpack']);
    todoFour.add(tasks);

    const todoFive = new Task('Passport - Date null control', 'Kaya Passport', null, 'low', ['Print Document', 'Send document by mail']);
    todoFive.add(tasks);

    const todoSix = new Task('Call Police - In late control', 'Driving Licence', new Date('2022-10-28'), 'medium', ['Print Document', 'Send document by mail', 'Bring document to police']);
    todoSix.add(tasks);
   
    const todoSeven = new Task('Buy chili pepper', 'Get some spicy taste, sometime', new Date('2022-11-08'), 'high', ['Take metro']);
    todoSeven.add(tasks);

    const todoEight = new Task('Mail', 'Send me mail please', new Date('2022-12-08'), 'high', ['Take metro']);
    todoEight.add(tasks);
    
    tasksVisualizedOn('inbox');
}
