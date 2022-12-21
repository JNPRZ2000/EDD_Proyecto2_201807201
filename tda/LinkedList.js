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
        this.size = 0;
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
        this.size += 1;
        this.ids += 1;
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
        }
        g += `\n\tlabel = "${name}"`;
        g += "}";
        return g;
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
        }
        return str += "]";
    }
}
export default LinkedList;