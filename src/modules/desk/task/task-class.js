import { MixCrud } from '../../class-mixin';

class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    static #today = new Date();
    static #isToday(dueDate) {
        return dueDate ? dueDate.toLocaleDateString() === this.#today.toLocaleDateString() ? true : false : false;
    }
    
    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        TaskProperty.#incrementId();
        this.id = TaskProperty.#id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.complete = false;
        this.tags = ['inbox'];
        if (TaskProperty.#isToday(this.dueDate)) this.addTag('today');

        this.priority = priority;
        this.checklist = checklist;
    }  
    
    addTag(value) {
        this.tags.push(value)
    } 
}

export class Task extends MixCrud(TaskProperty) {
    constructor(...args) {
        super(...args);
    }
}

