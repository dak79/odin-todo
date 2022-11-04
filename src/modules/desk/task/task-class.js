import { MixCrud } from '../../class-mixin';

class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    static #today = new Date();
    static #isToday(date) {
        return date ? date.toLocaleDateString() === this.#today.toLocaleDateString() ? true : false : false;
    }

    static #getWeekNumber(date) {
        const currentDate = date;
        const startDate = date ? new Date(date.getFullYear(), 0, 1) : false;
        const days = Math.ceil((currentDate - startDate) / (24 * 60 * 60 * 1000));
        const weekNumber = Math.floor(days/7);
        
        return weekNumber; 

    }

    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        TaskProperty.#incrementId();
        this.id = TaskProperty.#id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        console.log(this.dueDate)
        this.complete = false;
        this.tags = ['inbox'];
        if (TaskProperty.#isToday(this.dueDate)) this.addTag('today');
        if (TaskProperty.#getWeekNumber(new Date()) === TaskProperty.#getWeekNumber(this.dueDate)) this.addTag('this-week');
        if (TaskProperty.#getWeekNumber(this.dueDate) > TaskProperty.#getWeekNumber(new Date()) || !this.dueDate) this.addTag('anytime')
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

