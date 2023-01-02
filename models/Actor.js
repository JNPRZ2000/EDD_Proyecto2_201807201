"use strict";
class Actor {
    constructor(dni, nombre, correo, descripcion) {
        this.dni = parseInt(dni);
        this.name = nombre;
        this.correo = correo;
        this.descripcion = descripcion;
    }
    getDNI() { return this.dni; }
    getName() { return this.name; }
    getMail() { return this.correo; }
    getDescription() { return this.descripcion; }
    toString() { return `DNI: ${this.dni}\nNombre: ${this.name}\nCorreo: ${this.correo}`; }
} export default Actor;