"use strict";
import Controller from "../models/Controller.js"; import Customer from "../models/Customer.js"; import Movie from "../models/Movie.js";
class CardMovie {
  constructor(user, movie, controller) { this.element = this._addItems(user, movie, controller); }
  showComments(array) {
    let g = '<table class = "table table-dark table-striped">';
    g += '\n\t<tr><th>COMENTARIOS</th></tr>';
    for (let comm of array.iter()) {
      g += `\n\t<tr><td>${comm}</td></tr>`;
    }
    g += "\n</table>";
    return g;
  }
  _addItems(user, movie, controller) {
    if (user instanceof Customer && movie instanceof Movie) {
      let card = document.createElement("div"); card.setAttribute("class", "card");
      let cardHeader = document.createElement("div"); cardHeader.setAttribute("class", "card-header"); cardHeader.textContent = movie.getNombre();
      card.appendChild(cardHeader);
      let cardbody = document.createElement("div"); cardbody.setAttribute("class", "card-body");
      let cardtitle = document.createElement("h5"); cardtitle.setAttribute("class", "card-title"); cardtitle.textContent = movie.getCategoria();
      cardbody.appendChild(cardtitle);
      let stars = document.createElement("div"); stars.setAttribute("class", "form-stars");
      let clasificacion = document.createElement("p"); clasificacion.setAttribute("class", "clasificacion");
      stars.appendChild(clasificacion);
      //
      let star1 = document.createElement("input"); star1.setAttribute("id", `${movie.getID()}1`); star1.setAttribute("type", "radio"); star1.setAttribute("name", `${movie.getID()}`); star1.setAttribute("value", "1");
      let label1 = document.createElement("label"); label1.setAttribute("for", `${movie.getID()}1`); label1.textContent = "★";
      let star2 = document.createElement("input"); star2.setAttribute("id", `${movie.getID()}2`); star2.setAttribute("type", "radio"); star2.setAttribute("name", `${movie.getID()}`); star2.setAttribute("value", "2");
      let label2 = document.createElement("label"); label2.setAttribute("for", `${movie.getID()}2`); label2.textContent = "★";
      let star3 = document.createElement("input"); star3.setAttribute("id", `${movie.getID()}3`); star3.setAttribute("type", "radio"); star3.setAttribute("name", `${movie.getID()}`); star3.setAttribute("value", "3");
      let label3 = document.createElement("label"); label3.setAttribute("for", `${movie.getID()}3`); label3.textContent = "★";
      let star4 = document.createElement("input"); star4.setAttribute("id", `${movie.getID()}4`); star4.setAttribute("type", "radio"); star4.setAttribute("name", `${movie.getID()}`); star4.setAttribute("value", "4");
      let label4 = document.createElement("label"); label4.setAttribute("for", `${movie.getID()}4`); label4.textContent = "★";
      let star5 = document.createElement("input"); star5.setAttribute("id", `${movie.getID()}5`); star5.setAttribute("type", "radio"); star5.setAttribute("name", `${movie.getID()}`); star5.setAttribute("value", "5");
      let label5 = document.createElement("label"); label5.setAttribute("for", `${movie.getID()}5`); label5.textContent = "★";
      //
      stars.appendChild(star1); stars.appendChild(label1);
      stars.appendChild(star2); stars.appendChild(label2);
      stars.appendChild(star3); stars.appendChild(label3);
      stars.appendChild(star4); stars.appendChild(label4);
      stars.appendChild(star5); stars.appendChild(label5);
      cardbody.appendChild(stars);
      //
      let estrellas = Math.round(movie.getPuntuacion());
      this.puntuar(estrellas, star1, star2, star3, star4, star5)
      let btnCalificar = document.createElement("button"); btnCalificar.textContent = "Calificar"; btnCalificar.setAttribute("class", "btn btn-primary");
      btnCalificar.onclick = () => {
        if (star1.checked) { estrellas = movie.getAvgStars(1); this.puntuar(estrellas, star1, star2, star3, star4, star5); }
        if (star2.checked) { estrellas = movie.getAvgStars(2); this.puntuar(estrellas, star1, star2, star3, star4, star5); }
        if (star3.checked) { estrellas = movie.getAvgStars(3); this.puntuar(estrellas, star1, star2, star3, star4, star5); }
        if (star4.checked) { estrellas = movie.getAvgStars(4); this.puntuar(estrellas, star1, star2, star3, star4, star5); }
        if (star5.checked) { estrellas = movie.getAvgStars(5); this.puntuar(estrellas, star1, star2, star3, star4, star5); }
      }
      //
      let btnInformacion = document.createElement("button"); btnInformacion.className = "btn btn-primary"; btnInformacion.textContent = "Info";
      let panelUsuario = document.getElementById("panelUsuario");
      let panelPelicula = document.getElementById("panelPelicula");
      let inner = this.showComments(movie.comments);
      btnInformacion.onclick = function () {
        panelUsuario.style.display = "none";
        panelPelicula.style.display = "inline";
        let btnVolver = document.getElementById("btnVolver");
        btnVolver.onclick = function () { panelPelicula.style.display = "none"; panelUsuario.style.display = "inline"; }
        let cardnombre = document.getElementById("cardNombre"); cardnombre.textContent = `Película: ${movie.getNombre()}`;
        let cardid = document.getElementById("cardId"); cardid.textContent = `ID: ${movie.getID()}`;
        let cardpuntuacion = document.getElementById("cardPuntuacion"); cardpuntuacion.textContent = `Puntuación: ${movie.getPuntuacion()}`;
        let cardprecio = document.getElementById("cardPrecio"); cardprecio.textContent = `Precio: ${movie.getPrecio()}`;
        let cardpags = document.getElementById("cardPaginas"); cardpags.textContent = `Páginas: ${movie.getPaginas()}`;
        let cardCategoria = document.getElementById("cardCategoria"); cardCategoria.textContent = `Categoría: ${movie.getCategoria()}`;
        let carddesc = document.getElementById("cardDesc"); carddesc.textContent = `Descripción:\n${movie.getDescripcion()}`;
        let btnAddComment = document.getElementById("btnAddComment");
        let comment = document.getElementById("txtComentario");
        let comentarios = document.getElementById("comentarios");
        let divaux = document.createElement("div");


        while (comentarios.hasChildNodes()) {
          comentarios.removeChild(comentarios.firstChild);
        }
        if (inner != null) { divaux.innerHTML += inner; comentarios.appendChild(divaux); }
        btnAddComment.onclick = function () {
          movie.comments.add(`${document.getElementById("navbar").textContent}:\n${comment.value}`); comment.value = "";
          inner = new CardMovie().showComments(movie.comments);
          if (inner != null) {
            while (comentarios.hasChildNodes()) {
              comentarios.removeChild(comentarios.firstChild);
            }
            divaux = document.createElement("div");
            divaux.innerHTML += inner;
            comentarios.appendChild(divaux);
          }
        }
        let btnAlquilar = document.getElementById("btnAlquilar");
        btnAlquilar.onclick = function () {
          if (controller instanceof Controller) {
            controller.merkleTree.add(`${document.getElementById("navbar").textContent}${document.getElementById("cardNombre").textContent}`);
            alert("Pelicula Alquilada!");
          }
        }

      }

      cardbody.appendChild(btnInformacion);
      cardbody.appendChild(btnCalificar);
      //
      let cardtext = document.createElement("p"); cardtext.setAttribute("class", "card-text"); cardtext.textContent = movie.getDescripcion();
      cardbody.appendChild(cardtext);
      card.appendChild(cardbody);
      return card;
    }
    return null;
  }

  puntuar(estrellas, star1, star2, star3, star4, star5) { if (estrellas == 1) { star1.click(); } if (estrellas == 2) { star2.click(); } if (estrellas == 3) { star3.click(); } if (estrellas == 4) { star4.click(); } if (estrellas == 5) { star5.click(); } }
} export default CardMovie;