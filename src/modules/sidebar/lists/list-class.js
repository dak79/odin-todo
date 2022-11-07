import { MixCrud } from '../../classes';

class ListProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    constructor(title) {
        ListProperty.#incrementId();
        this.type = 'list';
        this.id = ListProperty.#id;
        this.title = title;
        this.tags = ['list'];
    }
}

export class List extends MixCrud(ListProperty) {
    constructor(...args) {
        super(...args);
    }
}
