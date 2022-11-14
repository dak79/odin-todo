import { isAfter, isToday , isThisWeek, endOfWeek, isBefore } from 'date-fns'

class TaskBase {
   
    constructor(title, description, dueDate, priority, checklist){
        this.type = 'task';
        this.constructor.incrementId();
        this.id = this.constructor.id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.expanded = false;
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

    deleteTag(value) {
        const index = this.tags.findIndex(tag => tag === value);
        if (index >= 0) this.tags.splice(index, 1);
    }

    updateTime() {
        if (isToday(this.dueDate) && (!this.tags.find(tag => tag === 'today'))) this.addTag('today');

        if (isThisWeek(this.dueDate, { weekStartsOn: 1 }) && (!this.tags.find(tag => tag === 'this-week'))) this.addTag('this-week');

        if ((isAfter(this.dueDate, endOfWeek(new Date(), { weekStartsOn: 1 })) || (!this.dueDate)) && (!this.tags.find(tag => tag === 'anytime'))) this.addTag('anytime');

        if (isBefore(this.dueDate, new Date()) && (this.dueDate) && (!this.tags.find(tag => tag === 'late' || tag === 'today'))) this.addTag('late');
    }
}

class ListBase {
    constructor(title) {
        this.constructor.incrementId();
        this.type = 'list';
        this.id = this.constructor.id;
        this.title = title;
        this.tags = ['list'];
    }
}

export const MyMixin = superclass => class extends superclass {
    static id = 0;
    static incrementId() {
        this.id++;
    }

    // USED BY LIST AND TASK
    add(array) {
        array.push(this);
    }
    
    // USED BY LIST AND TASK
    update(key, value) {
        return (key in this) ? this[key] = value : false;
    }

    // USED BY LIST AND TASK
    delete(array) {    
        const index = array.indexOf(this);
        array.splice(index, 1);
    }
}

export class List extends MyMixin(ListBase) {
    constructor(...args) {
        super(...args);
    }
}

export class Task extends MyMixin(TaskBase) {
    constructor(...args) {
        super(...args);
    }
}