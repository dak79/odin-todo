import { Project, Task } from "./classes";

const todo1 = new Task('Cook', 'Pasta al pesto', new Date(), 1, null);
const todo2 = new Task('Play', 'Potato', new Date(2022, 9, 26), 1, null);

const project1 = new Project('Week');
const project2 = new Project('Today');




project1.createTask(todo1);
project1.createTask(todo2);
// console.log(project1.data)
// console.log(todo1);
// console.log(todo1.id);
// console.log(todo2);
// console.log(todo2.id);
// console.log(project1)
// console.log(project2);

// console.log(project1.readTask(1));
project1.updateTask(1, 'title', 'Sleep');

// console.log(project1)

project1.removeTask(2);
console.log(project1);