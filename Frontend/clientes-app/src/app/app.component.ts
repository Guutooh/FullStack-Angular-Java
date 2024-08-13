import { Component, AfterViewInit } from '@angular/core';
import jQuery from 'jquery';

@Component({
  selector: 'app-root',  // Define o seletor CSS que identifica este componente no HTML
  templateUrl: './app.component.html',  // Especifica o caminho para o arquivo de template HTML do componente
  styleUrls: ['./app.component.css']  // Especifica o caminho para o arquivo de estilos CSS do componente
})
export class AppComponent implements AfterViewInit {
  title = 'clientes-app';  // Título da aplicação, que pode ser usado no template

  ngAfterViewInit(): void {
    // Este método é executado após o componente e suas views filhas serem inicializados e renderizados.
    
    (function($) {
      "use strict";

      // Adiciona o estado "ativo" aos links de navegação da sidebar
      var path = window.location.href; 
      // Obtém o URL completo atual do navegador (usado para comparar com os links na navegação lateral)
      
      $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        // Itera sobre cada link de navegação na sidebar
        if (this.href === path) {
          $(this).addClass("active");
          // Se o link corresponde ao URL atual, a classe "active" é adicionada, destacando o link na interface
        }
      });

      // Alterna a exibição da navegação lateral
      $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        // Evita o comportamento padrão do clique no botão (como seguir um link)
        $("body").toggleClass("sb-sidenav-toggled");
        // Alterna a classe "sb-sidenav-toggled" no elemento <body>, que pode colapsar/expandir a sidebar
      });
    })(jQuery);
    // A função é imediatamente invocada, passando jQuery como parâmetro ($) para evitar conflitos com outras bibliotecas
  }
}
