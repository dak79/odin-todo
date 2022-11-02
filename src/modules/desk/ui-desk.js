import { setAttributes } from '../helpers';
import '../../styles/desk.css';

export const floor = () => {
    const section = document.createElement('section');
    setAttributes(section, {
        class: 'desk',
        id:'desk'
    })

    return section;
}