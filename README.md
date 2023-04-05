# To Do App


## Live Preview
[To Do](https://dak79.github.io/odin-todo/)

## Description
This project is part of The Odin Project - Full Stack JavaScript Path. The main goals is to implement a mantainable web app, exploring ES6, Npm and some code design principles. 

``` mermaid
Class01 <|-- Class02  
Class03 *-- Class04  
Class05 o-- Class06  
Class07 .. Class08  
Class09 -- Class10  
```



## Tecnologies
* HTML
* CSS
* JavaScript ES6
* Git
* Npm

## Assignement
* Your ‘todos’ are going to be objects that you’ll want to dynamically create, which means either using factories or constructors/classes to generate them.

* Brainstorm what kind of properties your todo-items are going to have. At a minimum they should have a `title`, `description`, `dueDate` and `priority`. You might also want to include `notes` or even a `checklist`.

* Your todo list should have `projects` or separate lists of `todos`. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into.

* You should separate your application logic (i.e. creating new todos, setting todos as complete, changing todo priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

* The look of the User Interface is up to you, but it should be able to do the following: 
  * view all projects
  * view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
  * expand a single todo to see/edit its details
  * delete a todo

* For inspiration, check out the following great todo apps. (look at screenshots, watch their introduction videos etc.)
  * [Todoist](https://en.todoist.com/)
  * [Things](https://culturedcode.com/things/)
  * [any.do](https://www.any.do/)
  
* Since you are probably already using webpack, adding external libraries from npm is a cinch! You might want to consider using the following useful library in your code:
  * [date-fns](https://github.com/date-fns/date-fns) gives you a bunch of handy functions for formatting and manipulating dates and times.

* We haven’t learned any techniques for actually storing our data anywhere, so when the user refreshes the page, all of their todos will disappear! You should add some persistence to this todo app using the Web Storage API.
  * localStorage ([docs here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)) allows you to save data on the       user’s computer. The downside here is that the data is ONLY accessible on the computer that it was created on. Even so, it’s pretty handy! Set up a         function that saves the projects (and todos) to localStorage every time a new project (or todo) is created, and another function that looks for that       data in localStorage when your app is first loaded. Additionally, here are a couple of quick tips to help you not get tripped up:
      * Make sure your app doesn’t crash if the data you may want retrieve from localStorage isn’t there!
      * localStorage uses JSON to send and store data, and when you retrieve the data, it will also be in JSON format. You will learn more about this               language in a later lesson, but it doesn’t hurt to get your feet wet now. Keep in mind you cannot store functions in JSON, so you’ll have to figure         out how to add methods back to your object properties once you fetch them. Good luck! 
