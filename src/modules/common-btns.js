import { setAttributes } from './helpers';

/**
 * Buttons UI
 * @param { {}|null } type - list task. 
 * @param { ('edit'|'delete'|'new'|'title'|'expand') } btnType - role of the
 * button in UI.
 * @param { string|null } textContent - button text content
 * @param { string|null } idPrefix - part of id value.
 * @param { ('list'|'task'|'due-date'|null) } dataType - data-type value.
 * @param { {} } attrs - btn attributes.
 * 
 * @returns { HTMLElement } - Button.
 */
export const btnsUi = (type, btnType, textContent, idPrefix, dataType, attrs) => {
    const btn = document.createElement('button');
    setAttributes(btn, attrs);

    if (btnType === 'edit') {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" id="svg-${idPrefix}-${type.id}" class="svg-btns-edit" data-number="${type.id}" data-type="${dataType}"><path d="m19.725 9.4-4.9-4.875 1.25-1.275q.75-.75 1.812-.775 1.063-.025 1.913.775l1.225 1.225q.85.8.787 1.85-.062 1.05-.812 1.8ZM18.3 10.825 7.35 21.8H2.425v-4.9L13.4 5.95Z" id="svg-${idPrefix}-path-${type.id}" class="svg-btns-edit" data-number="${type.id}" data-type="${dataType}"/></svg>`;
    } else  if (btnType === 'delete') {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" id="svg-${idPrefix}-${type.id}" class="svg-btns-delete" data-number="${type.id}" data-type="${dataType}"><path d="M6.675 22.15q-1.4 0-2.4-.987-1-.988-1-2.413V6.225H1.7v-3.4h6.7v-1.65h7.175v1.65H22.3v3.4h-1.575V18.75q0 1.425-.987 2.413-.988.987-2.413.987Zm1.675-5.125h2.825V7.95H8.35Zm4.5 0h2.825V7.95H12.85Z" id="svg-${idPrefix}-path-${type.id}" class="svg-btns-delete" data-number="${type.id}" data-type="${dataType}" /></svg>`;
    } else if (btnType === 'new' || btnType === 'title') {
        btn.textContent = textContent;
    } else {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 16.35-7-7 2.4-2.375 4.6 4.6 4.6-4.6L19 9.35Z"/></svg>`;
    }

    return btn;
}
