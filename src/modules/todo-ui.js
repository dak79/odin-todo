import { appendChildren, setAttributes } from './helpers';
import { renderHeader } from './ui/header-ui';
import { defaultList } from './default/lists-default';
import { renderLists } from './ui/lists-ui';
import { renderMenu } from './ui/menu-ui';
import { renderTasks } from './ui/tasks-ui';
import { exampleTasks } from './default/tasks-example';
import { tasks, updateTimeTasks } from './tasks';
import { addAppListeners } from './listeners';
import { currentDesk } from './menu';
import { storageAvailable } from './localStorage';
import { Checklist, Task } from './classes';

export const renderPage = () => {
    pageUi();
    renderHeader();
    renderMenu();
    defaultList();
    renderLists(true);
    exampleTasks();
    updateTimeTasks();
    // renderTasks(currentDesk[0], true);
    // addAppListeners();
    if (storageAvailable('localStorage')) {
        console.log('yess');
        //localStorage.removeItem('tasks');
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        console.log(localStorage);
        
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));

        storedTasks.map(storedTask => {
            Object.setPrototypeOf(storedTask, Task.prototype);

            storedTask.checklist.map(check => {
                Object.setPrototypeOf(check, Checklist.prototype);
            })
            

        })

        //Object.assign(new Task, storedTasks);
        
        console.log(storedTasks);
        
        tasks.splice(0, tasks.length, ...storedTasks);
        console.log(tasks);
 
    }

    // exampleTasks();
    // updateTimeTasks();
    renderTasks(currentDesk[0], true);
    addAppListeners();
}

const pageUi = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const sidebar = side();
    const desk = floor();
    
    root.appendChild(main);
    appendChildren(main, [sidebar, desk]);

}

const floor = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'desk',
        id:'desk'
    });

    return section;
}

const side = () => {
    const section = document.createElement('section');
    section.classList.add('navbar');
   
    const header = sideHeader();
    const navbar = sideNavbar();
    const sectionList = sideSectionLists();
    
    appendChildren(section, [header, navbar, sectionList]);
    
    return section;
}

const sideHeader = () => {
    const header = document.createElement('header');
    setAttributes(header, {
        class: 'headers',
        id: 'nav-header'
    });
    
    return header;
}

const sideNavbar = () => {
    const nav = document.createElement('nav');
    setAttributes(nav, {
        class: 'nav-menu',
        id: 'nav-menu'
    });

    return nav;
}

const sideSectionLists = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'section-lists',
        id: 'section-lists'
    });

    return section;
}


