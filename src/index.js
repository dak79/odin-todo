import { todo } from "./modules/factory";

const todo1 = todo('Cook', 'Pasta al pesto', new Date(2022, 10, 25), 1, null);
console.log(todo1);