"use strict";

import Movie from "../models/Movie.js";

class Node {
    constructor(value, id) {
        this.value = value;
        this.id = id;
        this.next = null;
        this.prev = null;
    }
    toString() { return `${this.value}`; }
}
class ArrayList {
    constructor() {
        this.root = null;
        this.last = null;
        this.id = 0;
        this.size = 0;
    }
    isEmpty() {
        return this.root == null;
    }
    add(value) {
        const newnode = new Node(value, this.id);
        if (this.root == null) {
            this.root = newnode;
            this.last = newnode;
        } else {
            this.last.next = newnode;
            newnode.prev = this.last;
            this.last = newnode;
        }
        this.size++;
        this.id++;
    }
    *iter() {
        var current = this.root;
        while (current != null) {
            yield current.value;
            current = current.next;
        }
    }
    *iterReverse() {
        var current = this.last;
        while (current != null) {
            yield current.value;
            current = current.prev;
        }
    }
    /**
     * SI LA LISTA ESTÁ FORMADA POR "MOVIES" ENTONCES ESTA SE ORDENA A PARTIR DE SU NOMBRE
     */
    orderMovies() {
        var currenti = this.root;
        var currentj = this.root;
        var aux = null
        while (currenti != null) {
            currentj = this.root;
            while (currentj.next != null) {
                if (currenti.value instanceof Movie && currentj.value instanceof Movie) {
                    if (currentj.value.getNombre().localeCompare(currentj.next.value.getNombre()) > 0) {
                        aux = currentj.value;
                        currentj.value = currentj.next.value;
                        currentj.next.value = aux;
                    }
                }
                currentj = currentj.next;
            }
            currenti = currenti.next;
        }
    }
    toString() {
        var g = "[";
        var current = this.root;
        while (current != null) {
            if (current.next != null) {
                g += `${current},`;
            } else {
                g += `${current}`;
            }
        }
        return g + "]";
    }
} export default ArrayList;