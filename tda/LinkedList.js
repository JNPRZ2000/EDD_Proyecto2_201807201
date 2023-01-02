"use strict";
class Node {
    constructor(value, id) {
        this.id = id;
        this.value = value;
        this.next = null;
    }
    getID() { return this.id; }
    getValue() { return this.value; }
    getNext() { return this.next; }
    setValue(v) { this.value = v; }
    setNext(n) { this.next = n; }
    toString() { return `${this.value}`; }
}
class LinkedList {
    /**
     * Simply linked list
     */
    constructor() {
        this.root = null;
        this._size = 0;
        this.ids = 0;
    }
    /**
     * Add a value
     * @param {*} v 
     */
    add(v) {
        let newnode = new Node(v, this.ids);
        if (this.root == null) {
            this.root = newnode;
        } else {
            let current = this.root;
            while (current.getNext() != null) {
                current = current.getNext();
            }
            current.setNext(newnode);
        }
        this._size += 1;
        this.ids += 1;
    }
    *iter() {
        let current = this.root;
        while (current != null) {
            yield current.getValue();
            current = current.getNext();
        }
    }
    toGraph(name = "LinkedList") {
        let g = `digraph ${name}{`;
        g += "rankdir = LR;";
        let current = this.root;
        while (current != null) {
            g += `\n\tnode[shape = box label = "${current}"]"${current.getID()}";`;
            current = current.getNext();
        }
        current = this.root;
        while (current != null) {
            if (current.getNext() != null) {
                g += `\n\t"${current.getID()}"->"${current.getNext().getID()}"`;
            }
            current = current.getNext();
        }
        g += `\n\tlabel = "${name}"`;
        g += "}";
        return g;
    }
    size() {
        return this._size;
    }
    get(i) {
        if (this.root != null) {
            if (i < 0 || i >= this._size) {
                console.log("<LINKED LIST: GET> index out of bounds");
                return null;
            } else {
                let auxi = 0;
                let current = this.root;
                while (auxi != i && current != null) {
                    current = current.getNext();
                }
                return current.getValue();
            }
        } else {
            console.log("<LINKED LIST: GET> empty list");
            return null;
        }
    }
    isEmpty() {
        return this.root == null;
    }
    toString() {
        let str = "[";
        let current = this.root;
        while (current != null) {
            if (current.getNext() != null) {
                str += `${current},`;
            } else {
                str += `${current}`
            }
            current = current.getNext();
        }
        return str += "]";
    }
}
export default LinkedList;