export const MixCrud = superclass => class extends superclass {
    // USED BY LIST AND TASK
    add(array) {
        array.push(this);
    }
    
    // // USED BY LIST
    // findId(array, id) {
    //     return array.find(element => element.id === id);
    // }

    // // USED BY LIST
    // findName(array) {
    //     return array.find(element => element.title.toLowerCase().trim() === this.title.toLowerCase().trim());
    // }

    // USED BY LIST
    update(key, value) {
        return (key in this) ? this[key] = value : false;
    }

    // USED BY LIST
    delete(array) {    
        const index = array.indexOf(this);
        array.splice(index, 1);
    }
}
