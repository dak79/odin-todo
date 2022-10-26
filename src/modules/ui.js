

export const hooks = () => {
    const root = document.querySelector('#root');
    
    const main = document.createElement('main');
    main.classList.add('container');
    const navbar = side();
    const desk = floor(); 

    root.appendChild(main);
    main.appendChild(navbar);
    main.appendChild(desk);
}

const side = () => {
    const section = document.createElement('section');
    section.classList.add('navbar');

    return section;
}

const floor = () => {
    const section = document.createElement('section');
    section.classList.add('desk');

    return section;
}