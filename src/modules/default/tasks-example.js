import { Checklist, Task } from '../classes';
import { tasks } from '../tasks';

export const exampleTasks = () => {
    const todoOne = new Task('Go to market', 'Buy fruit and vegetables', new Date('2022-11-04'), 'low', [new Checklist(1, 'Bananas'), new Checklist(1, 'Apples'), new Checklist(1, 'Oranges'), new Checklist(1, 'Tomatoes'), new Checklist(1, 'Potatos'), new Checklist(1, 'Salad'), new Checklist(1, 'Carrots'), new Checklist(1, 'Onions')]);
    todoOne.addTag('life');
    todoOne.add(tasks);
    
    const todoTwo = new Task('Organize Meeting', 'Introduce new teammate', new Date('2022-11-10'), 'medium', [new Checklist(2, 'Send invitations'), new Checklist(2, 'Prepare short presentation')]);
    todoTwo.addTag('work');
    todoTwo.add(tasks);
    
    const todoThree = new Task('Pay Bills', 'Pay electricity and gas bills', new Date('2022-11-6'), 'high', [new Checklist(3, 'Electric Bill'), new Checklist(3, 'Gas Bill')]);
    todoThree.addTag('life');
    todoThree.add(tasks);
  
    const todoFour = new Task('ToDo App', 'The Odin Project To Do App', new Date('2023-7-8'), 'low', [new Checklist(4, 'Code Design'), new Checklist(4, 'Classes'), new Checklist(4, 'Ui'), new Checklist(4, 'Logic'), new Checklist(4, 'Set up webpack')]);
    todoFour.addTag('work');
    todoFour.add(tasks);

    const todoFive = new Task('Passport', 'Kaya Passport', null, 'low', [new Checklist(5, 'Print Document'), new Checklist(5, 'Send document by mail')]);
    todoFive.addTag('life');
    todoFive.add(tasks);

    const todoSix = new Task('Call Police', 'Driving Licence', new Date('2022-10-28'), 'medium', [new Checklist(6, 'Print Document'), new Checklist(6, 'Send document by mail'), new Checklist(6, 'Bring document to police')]);
    todoSix.addTag('life');
    todoSix.add(tasks);
   
    const todoSeven = new Task('Buy chili pepper', 'Get some spicy taste, sometime', new Date('2022-11-08'), 'high', [new Checklist(7, 'Take metro')]);
    todoSeven.addTag('life');
    todoSeven.add(tasks);

    const todoEight = new Task('Mail', 'Send me mail please', new Date('2022-12-08'), 'high', [new Checklist(8, 'Take metro')]);
    todoEight.addTag('work');
    todoEight.add(tasks);
}
