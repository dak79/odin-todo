import { Task } from "./modules/classes";

const todo1 = new Task('Cook', 'Pasta al pesto', new Date(), 1, null);
const todo2 = new Task('Play', 'Potato', new Date(2022, 9, 26), 1, null);
console.log(todo1);
console.log(todo2);
