import { setAttributes } from '../helpers';
 
/**
 * Create Buttons Ui.
 * @param { {} } object - Object for retriving data. 
 * @param { 'new'|'title'|'edit'|'expand'|'delete' } name - Type of button and value (or part of value) for soem button attributes. 
 * @param { string[] } classes - Values for class attributes. 
 * @param { string } ariaLabel - Aria-label value.
 * @returns { Node } - A button.
 */
export const btnsUi = (object, name, classes, ariaLabel) => {
    const button = document.createElement('button');
    setAttributes(button, {
        type: 'button',
        id: (name === 'new' && (object.type === 'task' || object.type === 'list')) ? `${name}-${object.type}-btn` : `${name}-${object.type}-${object.id}-btn`,
        'aria-label': `${ariaLabel}`,
        'data-btn': `${name}`,
    })

    if (name === 'new') {
        button.setAttribute('data-type', `${name}-${object.type}`);
        if (object.type === 'checklist') button.setAttribute('data-number', object.id);

        button.textContent = '+';
    }

    if (name === 'title') {
        setAttributes(button, {
            'data-number': `${object.id}`,
            'data-name': `${object.title.toLowerCase().trim().replace(' ', '-')}`
        });
        button.textContent = `${object.title}`
    }

    if (name === 'edit' || name === 'delete' || name === 'expand') {
        setAttributes(button, {
            'data-number': `${object.id}`,
            'data-type': `${object.type}`
        });

        if (name === 'edit') {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${object.id}" data-type="${object.type}" data-btn="${name}"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" data-number="${object.id}" data-type="${object.type}" data-btn="${name}"/></svg>`;
        } 
        
        if (name === 'delete') {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${object.id}" data-type="${object.type}" data-btn="${name}"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" data-number="${object.id}" data-type="${object.type}" data-btn="${name}" /></svg>`;
        } 
        
        if (name === 'expand') {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="svg-expand" data-number="${object.id}" data-btn="${name}" data-type="${object.type}"><path d="m12 16.35-7-7 2.4-2.375 4.6 4.6 4.6-4.6L19 9.35Z" data-number="${object.id}" data-btn="${name}" data-type="${object.type}"/></svg>`;
        }
    }
    
    button.classList.add(...classes);
    
    return button;
}
