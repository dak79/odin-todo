import { MixCrud } from '../class-mixin';

class ListProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    constructor(title) {
        ListProperty.#incrementId();
        this.id = ListProperty.#id;
        this.title = title;
    }
}

export class List extends MixCrud(ListProperty) {
    constructor(...args) {
        super(...args);
    }
}

// Lists database
export const lists = [];