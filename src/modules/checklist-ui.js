







/**
 * Create checklist and priority Ui.
 * @param { Object } object - Object for retriving data.
 * @param { 'radio'|'checkbox' } type - Radio Button or Checkbox field.
 * @param { string } legendText - Legend text content.
 * @param { string[] } array - Radio names or Checklist label.
 * @param { string|null } radioGroup - Name attribute value's for Radio Buttons.
 * @param { string|null } defaultChecked - Set checked button by default or null for Radio Buttons.
 * @returns { Node } A fieldset with radio buttons or checkboxes. 
 */
 const checklistAndPriorityUi = (object, type, legendText, array, radioGroup, defaultChecked) => {

    let name = (type === 'checkbox') ? 'checklist' : type;
    
    const fieldset = document.createElement('fieldset');
    setAttributes(fieldset, {
        id: `${name}-fieldset-${object.id}`,
        class: `${name}-fieldset`
    });

    const legend = document.createElement('legend');
    legend.textContent = legendText;

    const wrapper = document.createElement('div');
    setAttributes(wrapper, {
        id: `${name}s-wrapper-${object.id}`,
        class: `${name}s-wrapper`
    });

    if (array) {
        array.forEach((item, index) => {
            if (typeof item !== 'string') String(item);
    
            name = (type === 'checkbox') ? 'checklist-item' : type;
    
            const group = document.createElement('div');
            setAttributes(group, {
                id: `${name}-wrapper-${object.id}-${index}`,
                class: `${name}-wrapper`
            });

            console.log(object.checklist)
            const checkbox = checkboxAndRadioUi(object.checklist, type, name, item, index, radioGroup, (type === 'checkbox') ? 'Done / Not Done checklist check button' : `${item} Radio Button`);
            
            appendChildren(group, checkbox);
            
            if (type === 'checkbox') {
                console.log(array, object)
                const checklistBtnsWrapper = document.createElement('span');
                setAttributes(checklistBtnsWrapper, {
                    id: `${name}-btns-wrapper-${object.id}-${index}`,
                    class: 'checklist-btns-wrapper'
                });

                const btnEditChecklist = btnsUi(object, 'checklist', 'edit', 'btns checklist-edit-btn svg-btns', `Edit checklist: ${object.checklist[index]}`, 'checklist', 'edit', index);
    
                const btnDeleteChecklist = btnsUi(object, 'checklist', 'delete', 'btns checklist-delete-btn svg-btns', `Delete checklist: ${object.checklist[index]}`, 'checklist', 'delete', index);
                appendChildren(checklistBtnsWrapper, [btnEditChecklist, btnDeleteChecklist])
                group.appendChild(checklistBtnsWrapper);
            }
        
            
            if (type === 'radio') {
                if (object.priority) {
                    if (object.priority === item) checkbox[0].checked = true;
                } else {
                    if (item === defaultChecked) checkbox[0].checked = true;
                }
            }

            wrapper.appendChild(group);
        });
    }

    appendChildren(fieldset, [legend, wrapper]);

    return fieldset;
}