import { setAttributes } from '../helpers';

export const floor = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'desk',
        id:'desk'
    })

    return section;
}