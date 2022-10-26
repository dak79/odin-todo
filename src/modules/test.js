import { List, Task } from "./classes";

/* Test on Task Objects */
const inbox = [];
const task1 = new Task('Cook', 'Pasta al pesto', new Date(), 1, null);
const task2 = new Task('Play', 'Potato', new Date(2022, 9, 26), 1, null);

// Create two new tasks
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
task1.deleteTask(inbox);
console.log(inbox);

task2.deleteTask(inbox);
console.log(inbox);

/* Tests on New List Objects */
const lists = [];
const list1 = new List('Life');
const list2 = new List('Work');

// Create two new lists
console.log(list1);
console.log(list2);

// Check proto and instantiated property
console.log(Object.getPrototypeOf(list1));
console.log(Object.hasOwn(list1, 'title'));

// Add list to lists
list1.addTag(lists);
list2.addTag(lists);
console.log(lists);

// Find list in lists
console.log(list1.findTag(lists));
console.log(list2.findTag(lists));

// Update task in inbox
list1.updateTag(lists, 'title', 'Daily life');
list1.updateTag(lists, 'panino');
console.log(lists);

// Remove task from inbox
list1.deleteTag(lists);
console.log(lists);

list2.deleteTag(lists);
console.log(lists);

