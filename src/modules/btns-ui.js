import { setAttributes } from './helpers';
 
/**
 * 
 * @param { {}|null } object - Object for retriving data: task, list, menu.
 * @param { 'task'|'due-date'|'lists'|'menu'|'checklist' } name - Part of id's value.
 * @param { 'expand'|'delete'|'edit'|'title'|'new' } type - Button type. 
 * @param { string } classNames - Class or space-separated list of classes
 * @param { string } ariaLabel - Aria-label value. 
 * @param { string } dataType - Data-type value. 
 * @param { 'expand'|'delete'|'edit'|string } textContent - Button text content.
 * @param { number|null } index - For sub-lists buttons like checklist delete and edit.
 * @returns { node } - A button.
 */
export const btnsUi = (object, name, type, classNames, ariaLabel, dataType, textContent, index) => {
    const btn = document.createElement('button');
    setAttributes(btn, {
        type: 'button',
        id: (object) ? (name === 'checklist' && type !== 'new') ? `${name}-${type}-btn-${object.id}-${index}` : `${name}-${type}-btn-${object.id}` :
        `${type}-${name}-btn`,
        class: `${classNames}`,
        'aria-label': `${ariaLabel}`,
        'data-number': (object) ? `${object.id}` : 0,
        'data-btn': `${type}`,
        'data-type': `${dataType}`,
        'data-name': (type === 'title') ? `${object.title.replace(' ', '-').toLowerCase().trim()}` : 0
    });

    if (textContent === 'edit') {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${object.id}" data-type="${dataType}" data-btn="${type}"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" data-number="${object.id}" data-type="${dataType}" data-btn="${type}"/></svg>`;
    } else  if (textContent === 'delete') {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" data-number="${object.id}" data-type="${dataType}" data-btn="${type}"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" data-number="${object.id}" data-type="${dataType}" data-btn="${type}" /></svg>`;
    } else if (textContent === 'expand') {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="svg-expand" data-number="${object.id}" data-btn="${type}" data-type="${dataType}"><path d="m12 16.35-7-7 2.4-2.375 4.6 4.6 4.6-4.6L19 9.35Z" data-number="${object.id}" data-btn="${type}" data-type="${dataType}"/></svg>`;
    } else {
        btn.textContent = textContent;
    }

    return btn;
}
