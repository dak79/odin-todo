import { MixCrud } from '../../class-mixin';

class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        TaskProperty.#incrementId();
        this.id = TaskProperty.#id;
        this.title = title;
        this.description = description;
        import('date-fns').then((module) => {
            this.dueDate = module.format(dueDate, 'dd-MM-yyyy');
        })
        this.tags = [];
        this.priority = priority;
        this.checklist = checklist;
    }    
}

export class Task extends MixCrud(TaskProperty) {
    constructor(...args) {
        super(...args);
    }
}

