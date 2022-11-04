import { MixCrud } from '../../class-mixin';

class TaskProperty {
    static #id = 0;
    static #incrementId() {
        this.#id++;
    }

    
    isToday(date) {
        const today = new Date();
        return date ? date.toLocaleDateString() === today.toLocaleDateString() ? true : false : false;
    }

    getWeekNumber(date) {
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
        this.updateTags();
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

    updateTags() {
        if (this.isToday(this.dueDate)) this.addTag('today');
        if (this.getWeekNumber(new Date()) === this.getWeekNumber(this.dueDate)) this.addTag('this-week');
        if (this.getWeekNumber(this.dueDate) > this.getWeekNumber(new Date()) || !this.dueDate) this.addTag('anytime');
        if (this.getWeekNumber(this.dueDate) < this.getWeekNumber(new Date())) this.addTag('late');
    }
}

export class Task extends MixCrud(TaskProperty) {
    constructor(...args) {
        super(...args);
    }
}

