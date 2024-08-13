import { ServicoPrestadoService } from './servico-prestado.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientesService } from './clientes.service';
import { ClientesModule } from './clientes/clientes.module';
import { HomeComponent } from './home/home.component';
import { TemplateModule } from './template/template.module';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';


@NgModule({
  declarations: [
    AppComponent,  // Declaração do componente raiz da aplicação
    HomeComponent  // Declaração do componente Home
  ],
  imports: [
    BrowserModule,  // Importa o módulo necessário para executar a aplicação Angular em um navegador
    HttpClientModule,  // Importa o módulo para realizar requisições HTTP
    AppRoutingModule,  // Importa o módulo de roteamento da aplicação
    TemplateModule,  // Importa o módulo de template que contém Navbar e Sidebar
    ClientesModule,  // Importa o módulo de clientes que gerencia funcionalidades relacionadas a clientes
    ServicoPrestadoModule // Importa o módulo de Servicos que gerencia funcionalidades relacionadas a Servicos prestados
  ],
  providers: [
    ClientesService, // Declaração do serviço ClientesService como um provedor disponível em toda a aplicação
    ServicoPrestadoService // Declaração do serviço ServicoPrestadoService como um provedor disponível em toda a aplicação
  ],
  bootstrap: [
    AppComponent  // Especifica o componente raiz que Angular deve carregar e bootstrap ao iniciar a aplicação
  ],
})
export class AppModule {}
