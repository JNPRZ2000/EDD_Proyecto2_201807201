"use strict";
import ArrayList from "./ArrayList.js";
/**
 * Nodo para Tabla Hash
 */
class HashNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() { return `${this.key}: ${this.value}`; }
}
/**
 * Tabla Hash
 */
class HashTable {
    constructor(size) {
        /**
         * Tamaño de la tabla
         */
        this._size = size;
        /**
         * Número de elementos ingresados en la tabla
         */
        this.length = 0;
        /**
         * Tabla
         */
        this.table = new Array(this._size).fill(null);
    }
    set(key, value) {

        let index = this._hash(key);
        while (this.table[index] instanceof HashNode) {
            index += 1;
            if (index == this._size) { index = 0; }
        }
        let newnode = new HashNode(key, value);
        this.table[index] = newnode;
        this.length += 1;
        this._rehashing();
    }

    /**
     * Función que retorna el indice establecido para el valor
     * @param {*} key 
     * @returns 
     */
    _hash(key) {
        return key % this.table.length;
    }
    /**
     * Función que incrementa el valor de la tabla cuando esta está a cierto porcentaje
     */
    _rehashing() {
        var percent = this.length / this._size;
        if (percent > 0.75) {
            console.log(`REHASHING: ${percent}`);
            let auxtable = this.table;
            this._size = this.length * 5;
            this.length = 0;
            this.table = new Array(this._size).fill(null);
            for (let at of auxtable) {
                if (at instanceof HashNode) {
                    this.set(at.key, at.value);
                }
            }

        }
    }
    getContent() {
        let arr = new ArrayList();
        for (let el of this.table) {
            arr.add(el);
        }
        return arr;
    }
    toHTML(name) {
        let g = ""
        g += '\n\t<table class = "table table-dark table-striped">';
        g += `\n\t\t<tr><th colspan="2">TABLA HASH: ${name}</th></tr>`;
        let element = null;
        for (let i = 0; i < this.table.length; i += 1) {
            element = this.table[i];
            g += "\n\t\t<tr>";
            if (element != null) {
                g += `\n\t\t\t<td>${i}</td><td>${element.value}</td>`;
            } else {
                g += `\n\t\t\t<td>${i}</td><td>${element}</td>`;
            }
            g += "\n\t\t</tr>"
        }
        g += "\n\t</table>";
        return g;
    }
    toHTMLUSER(name) {
        let g = ""
        g += '\n\t<table class = "table table-dark table-striped">';
        g += `\n\t\t<tr><th>TABLA HASH: ${name}</th></tr>`;
        let element = null;
        for (let i = 0; i < this.table.length; i += 1) {
            element = this.table[i];
            g += "\n\t\t<tr>";
            if (element != null) {
                g += `\n\t\t\t<td>${element.value}</td>`;
            }
            g += "\n\t\t</tr>"
        }
        g += "\n\t</table>";
        return g;
    }
} export default HashTable;