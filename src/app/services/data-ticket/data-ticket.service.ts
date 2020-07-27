import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataTicketService {

  URL_SERVICE: String = "http://localhost:3000/";
  URL_TICKETS: String = "http://localhost:3000/tickets";

  constructor(public http: HttpClient) { }

  /* ======================================
            GET USUARIOS
=======================================*/
  getUsuarios() {
    let url = this.URL_SERVICE + 'usuarios';
    return this.http.get(url);
  }


  /* ======================================
            GET CATEGORÍAS
=======================================*/
  getCategorias() {
    let url = this.URL_SERVICE + 'categorias';
    return this.http.get(url);
  }


  /* ======================================
          GET DATA CARD INICIAL
=======================================*/
  getTicketInicial() {
    let url = `${this.URL_TICKETS}/inicial`
    return this.http.get(url);
  }


  /* ======================================
          GET DATA CARD ACTUALIZAR
=======================================*/
  getTicketActualizar() {
    let url = `${this.URL_TICKETS}/actualizar`;
    return this.http.get(url);
  }


  /* ======================================
        GET DATA CARD COMPARAR
=======================================*/
  getTicketComparar() {
    let url = `${this.URL_TICKETS}/comparar`;
    return this.http.get(url);
  }


  /* ======================================
        GET DATA CARD CONDICIONES
=======================================*/
  getTicketCondiciones() {
    let url = `${this.URL_TICKETS}/condiciones`;
    return this.http.get(url);
  }


  /* ======================================
        GET DATA CARD FINAL
=======================================*/
  getTicketFinal() {
    let url = `${this.URL_TICKETS}/final`;
    return this.http.get(url);
  }


}
