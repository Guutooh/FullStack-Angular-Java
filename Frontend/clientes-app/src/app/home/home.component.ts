import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',  // Define o seletor CSS que identifica este componente no template HTML
  templateUrl: './home.component.html',  // Especifica o caminho para o arquivo de template HTML do componente
  styleUrls: ['./home.component.css']  // Especifica o caminho para o arquivo de estilos CSS do componente
})
export class HomeComponent implements OnInit {

  constructor() { }  // Construtor do componente, que é executado quando o componente é instanciado

  ngOnInit(): void {
  }  // Método do ciclo de vida do Angular chamado logo após a criação do componente
}
