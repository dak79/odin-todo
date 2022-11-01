import { setAttributes, appendChildren } from '../helpers';
import '../../styles/sidebar.css';

export const side = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        id: 'navbar',
        class: 'navbar'
    })
    const header = sideHeader();
    const navbar = sideNavbar();
    const sectionList = sideSectionLists();
    // const footer = sideFooter();
    
    appendChildren(section, [header, navbar, sectionList]);
    
    return section;
}

const sideHeader = () => {
    const header = document.createElement('header');
    setAttributes(header, {
        class: 'side-header',
        id: 'side-header'
    })
    
    return header;
}

const sideNavbar = () => {
    const nav = document.createElement('nav');
    setAttributes(nav, {
        class: 'side-navbar',
        id: 'side-navbar'
    })

    return nav;
}

const sideSectionLists = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'side-section-lists',
        id: 'side-section-lists'
    })
    
    return section
}

// const sideFooter = () => {
//     const footer = document.createElement('footer');
//     footer.classList.add('side-footer');
   
//     const btnNewTask = createBtnNewTask();

//     appendChildren(footer, [btnNewTask]);
//     return footer;
// }

// const createBtnNewTask = () => {
//     const btnNewTask = document.createElement('button');
//     setAttributes(btnNewTask, {
//         type: 'button',
//         id: 'btn-new-task',
//         class: 'btn-footer'
//     })
//     btnNewTask.textContent = '+ New Task';

//     return btnNewTask;
// }
