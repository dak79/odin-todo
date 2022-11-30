import { setAttributes } from '../helpers';

/**
 * 
 * @param { {} } object - Object for retriving data. 
 * @param { string } name - Part of value of ids, classes, name and data-type attributes.  
 * @param { string } labelText - label.textContent value. 
 * @returns { node[] } - A label and a select nodes.
 */
export const tagsUi = (object, name, labelText) => {
    const label = document.createElement('label');
    setAttributes(label, {
        for: `${object.type}-${name}-${object.id}`,
        class: `${object.type}-${name}-labels`
    });
    label.textContent = labelText;

    const select = document.createElement('select');
    setAttributes(select, {
        id: `${object.type}-${name}-${object.id}`,
        class: `${object.type}-${name}`,
        name: `${name}`,
        'data-number': `${object.id}`,
        'data-type': `${name}`
    });

    const option = document.createElement('option');
    option.setAttribute('value', '');
    option.textContent = '-- Choose list --';
    select.appendChild(option);

    //updateTagsUi(select);

    return [label, select]
}

/**
 * Populate and update task tags
 * @param { Node } select - Select HTMLElement
 */
 const updateTagsUi = select => {
    // Update label
    object.tags.forEach(tag => label.textContent += `${(tag.charAt(0).toUpperCase() + tag.slice(1)).replace('', ` - `)}`);
    
    // update selectTags
    if (!select) select = selectNode(`select[name='tags']`);

    if (select) {
        lists.map(list => {
            console.log(select.options);
            let opti = Array.from(select.options).map(opt => opt.text);
            console.log(opti);
    
            if(!opti.includes(list.title)) select.options.add(new Option(list.title, list.title))
        });
    }
}