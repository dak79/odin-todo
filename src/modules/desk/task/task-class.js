import { MixCrud } from '../../class-mixin';

class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    
    static #isToday(date) {
        const today = new Date();
        return date ? date.toLocaleDateString() === today.toLocaleDateString() ? true : false : false;
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
        this.complete = false;
        this.tags = ['inbox'];
        this.updateTime();
        this.visualizedOn = '';
        this.priority = priority;
        this.checklist = checklist;
    }  

    addTag(value) {
        this.tags.push(value);
    } 

    deleteTag() {
        const index = this.tags.indexOf(this)
        this.tags.splice(index, 1)
    }

    updateTime() {
        if (TaskProperty.#isToday(this.dueDate) && (!this.tags.find(tag => tag === 'today'))) this.addTag('today');
        if (TaskProperty.#getWeekNumber(new Date()) === TaskProperty.#getWeekNumber(this.dueDate) && (!this.tags.find(tag => tag === 'this-week'))) this.addTag('this-week');
        if ((TaskProperty.#getWeekNumber(this.dueDate) > TaskProperty.#getWeekNumber(new Date()) || !this.dueDate) && (!this.tags.find(tag => tag === 'anytime'))) this.addTag('anytime');
        if (this.dueDate && (TaskProperty.#getWeekNumber(this.dueDate) < TaskProperty.#getWeekNumber(new Date()) || this.dueDate < new Date()) && (!this.tags.find(tag => tag === 'late'))) this.addTag('late');
    }
}

export class Task extends MixCrud(TaskProperty) {
    constructor(...args) {
        super(...args);
    }
}

