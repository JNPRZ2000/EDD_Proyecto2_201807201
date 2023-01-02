"use strict";
import ArrayList from "../tda/ArrayList.js";
class Movie {
    constructor(id, nombre, descripcion, puntuacion, precio, paginas, categoria) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.puntuacion = parseFloat(puntuacion);
        this.precio = parseFloat(precio);
        this.paginas = parseInt(paginas);
        this.categoria = categoria;
        this.startslist = new ArrayList();
        this.comments = new ArrayList();
    }
    getID() { return this.id; }
    getNombre() { return this.nombre; }
    getDescripcion() { return this.descripcion; }
    getPuntuacion() { return this.puntuacion; }
    getPrecio() { return this.precio; }
    getPaginas() { return this.paginas; }
    getCategoria() { return this.categoria; }
    getAvgStars(stars) {
        this.startslist.add(parseInt(stars));
        this.puntuacion = 0;
        for (let st of this.startslist.iter()) {
            this.puntuacion += st;
        }
        this.puntuacion = this.puntuacion / this.startslist.size;
        return this.puntuacion;
    }
    toString() {
        return `ID: ${this.id}\nNombre: ${this.nombre}\nPuntuación: ${this.puntuacion}\nPrecio: ${this.precio}\nPáginas: ${this.paginas}\nCategoría: ${this.categoria}`;
    }
}
export default Movie;