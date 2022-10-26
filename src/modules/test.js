import { List, Task } from "./classes";

/* Test on Task Objects */
const inbox = [];
const task1 = new Task('Cook', 'Pasta al pesto', new Date(), 1, null);
const task2 = new Task('Play', 'Potato', new Date(2022, 9, 26), 1, null);

// Create 2 new tasks
console.log(task1);
console.log(task2);

// Check proto and instantiated property
console.log(Object.getPrototypeOf(task1));
console.log(Object.hasOwn(task1, 'title'));

// Add tasks to inbox
task1.addTask(inbox);
task2.addTask(inbox);
console.log(inbox);

// Find tasks in inbox
console.log(task1.findTask(inbox));
console.log(task2.findTask(inbox));

// Update task in inbox
task1.updateTask(inbox, 'title', 'OPPO');
task1.updateTask(inbox, 'panino');
console.log(inbox);

// Remove task from inbox
task1.removeTask(inbox);
console.log(inbox);

task2.removeTask(inbox);
console.log(inbox);

/* New List */
const list1 = new List('Life');
const list2 = new List('Work');

console.log(list1);
console.log(list2);