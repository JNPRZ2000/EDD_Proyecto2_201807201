"use strict";
import Actor from "../models/Actor.js";
class CardActor {
    constructor(actor) { this.element = this._addElements(actor); }
    _addElements(actor) {
        if (actor instanceof Actor) {
            let card = document.createElement("div"); card.className = "card";
            let header = document.createElement("h5"); header.className = "card-header"; header.textContent = `${actor.getName()}`;
            let body = document.createElement("div"); body.className = "card-body";
            let title = document.createElement("h2"); title.className = "card-title"; title.textContent = `${actor.getDNI()}`;
            let text = document.createElement("p"); text.className = "card-text"; text.textContent = `${actor.getDescription()}`;
            card.appendChild(header);
            card.appendChild(body);
            body.appendChild(title);
            body.appendChild(text);
            return card;
        }
        return document.createElement("div");
    }
} export default CardActor;