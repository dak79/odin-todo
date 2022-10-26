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
task1.add(inbox);
task2.add(inbox);
console.log(inbox);

// Find tasks in inbox
console.log(task1.find(inbox));
console.log(task2.find(inbox));

// Update task in inbox
task1.update(inbox, 'title', 'OPPO');
task1.update(inbox, 'panino');
console.log(inbox);

// Remove task from inbox
task1.delete(inbox);
console.log(inbox);

task2.delete(inbox);
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
list1.add(lists);
list2.add(lists);
console.log(lists);

// Find list in lists
console.log(list1.find(lists));
console.log(list2.find(lists));

// Update task in inbox
list1.update(lists, 'title', 'Daily life');
list1.update(lists, 'panino');
console.log(lists);

// Remove task from inbox
list1.delete(lists);
console.log(lists);

list2.delete(lists);
console.log(lists);

/* Test add list tag to task object  */
const task3 = new Task('Cook', 'Pasta al pesto', new Date(), 1, null);
const task4 = new Task('Play', 'Potato', new Date(2022, 9, 26), 1, null);

const list3 = new List('Life');
const list4 = new List('Work');

// Add tags
list3.add(task4.tags);
list4.add(task4.tags);
console.log(task4);

list3.add(task3.tags);
console.log(task3);

// Find tag in task
console.log(list3.find(task4.tags))
console.log(list4.find(task3.tags));

