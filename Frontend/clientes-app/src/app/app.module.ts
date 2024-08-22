// Importa o módulo necessário para que a aplicação Angular funcione no navegador
import { BrowserModule } from '@angular/platform-browser';
// Importa o decorador @NgModule, que é usado para definir módulos no Angular
import { NgModule } from '@angular/core';
// Importa o módulo HttpClientModule para fazer requisições HTTP e a constante HTTP_INTERCEPTORS para configurar interceptadores
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// Importa o módulo FormsModule que permite o uso de formulários template-driven
import { FormsModule } from '@angular/forms';

// Importa o módulo de rotas principal da aplicação
import { AppRoutingModule } from './app-routing.module';
// Importa o componente principal da aplicação, que serve como o root component
import { AppComponent } from './app.component';

// Importa módulos e serviços personalizados criados para a aplicação
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { ClientesModule } from './clientes/clientes.module';
import { ClientesService } from './clientes.service';
import { ServicoPrestadoModule } from './servico-prestado/servico-prestado.module';
import { ServicoPrestadoService } from './servico-prestado.service';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';

// Decorador @NgModule que define um módulo Angular
@NgModule({
  // Declaração dos componentes que pertencem a este módulo
  declarations: [
    AppComponent,  // Componente raiz da aplicação
    HomeComponent, // Componente que representa a página inicial
    LoginComponent, // Componente que representa a página de login
    LayoutComponent // Componente que gerencia o layout da aplicação
  ],
  // Importa outros módulos que este módulo precisa para funcionar
  imports: [
    BrowserModule,        // Necessário para a aplicação funcionar no navegador
    FormsModule,          // Permite o uso de formulários template-driven
    HttpClientModule,     // Permite fazer requisições HTTP na aplicação
    AppRoutingModule,     // Define as rotas da aplicação
    TemplateModule,       // Módulo que gerencia templates e layouts comuns
    ClientesModule,       // Módulo que gerencia a funcionalidade relacionada a clientes
    ServicoPrestadoModule // Módulo que gerencia a funcionalidade relacionada a serviços prestados
  ],
  // Define os serviços que estarão disponíveis para injeção em toda a aplicação
  providers: [
    ClientesService,        // Serviço responsável por operações relacionadas a clientes
    ServicoPrestadoService, // Serviço responsável por operações relacionadas a serviços prestados
    AuthService,            // Serviço responsável pela autenticação de usuários
    {
      // Define um provedor para interceptadores HTTP
      provide: HTTP_INTERCEPTORS,       // Usado para registrar interceptadores HTTP
      useClass: TokenInterceptor,       // Classe do interceptador que será usado para adicionar o token nas requisições
      multi: true                       // Indica que múltiplos interceptadores podem ser aplicados
    }
  ],
  // Componente raiz que será inicializado quando a aplicação iniciar
  bootstrap: [AppComponent]
})
// Classe que define o módulo principal da aplicação
export class AppModule { }
