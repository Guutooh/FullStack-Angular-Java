// Importações necessárias para o funcionamento do componente
import { Component, AfterViewInit } from '@angular/core';  // Importa os decoradores Component e AfterViewInit do Angular
import jQuery from 'jquery'  // Importa o jQuery, uma biblioteca JavaScript popular para manipulação de DOM

@Component({
  selector: 'app-layout',  // Define o seletor CSS para instanciar o componente
  templateUrl: './layout.component.html',  // Define o caminho para o template HTML deste componente
  styleUrls: ['./layout.component.css']  // Define o caminho para os arquivos CSS específicos deste componente
})
export class LayoutComponent implements AfterViewInit {  // Declaração da classe do componente implementando a interface AfterViewInit

  // Construtor do componente. Atualmente, não realiza nenhuma operação.
  constructor() { }

  // Método do ciclo de vida do Angular que é executado após a visualização do componente ser totalmente inicializada
  ngAfterViewInit(){
    
    // Função autoexecutável que encapsula o código jQuery
    (function($) {
        "use strict";  // Modo estrito para melhor qualidade de código
    
        // Adiciona estado ativo aos links da barra lateral de navegação
        var path = window.location.href;  // Obtém o caminho completo do URL atual
        $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
            // Itera sobre cada link de navegação na barra lateral
            if (this.href === path) {
                // Se o URL do link for igual ao URL atual, adiciona a classe "active"
                $(this).addClass("active");
            }
        });
    
        // Alterna a navegação lateral (abre ou fecha a barra lateral)
        $("#sidebarToggle").on("click", function(e) {
            e.preventDefault();  // Evita o comportamento padrão do clique
            $("body").toggleClass("sb-sidenav-toggled");  // Alterna a classe "sb-sidenav-toggled" no corpo do documento
        });

    })(jQuery);  // Passa o objeto jQuery como argumento para a função autoexecutável
  }

}
