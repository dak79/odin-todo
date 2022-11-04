import { setAttributes, selectNode } from '../helpers';

export const desk = selectNode('#desk');

export const floor = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'desk',
        id:'desk'
    })

    return section;
}