import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';  // Importa o componente da página inicial (Home)
import { LoginComponent } from './login/login.component';  // Importa o componente de login
import { LayoutComponent } from './layout/layout.component';  // Importa o componente de layout que organiza a estrutura da aplicação
import { AuthGuard } from './auth.guard';  // Importa o guard de autenticação para proteger rotas

// Define as rotas da aplicação
const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Rota para a página de login, acessível sem autenticação
  { 
    path: '',  // Rota raiz da aplicação
    component: LayoutComponent,  // Componente de layout que serve como contêiner para as rotas filhas
    children: [
      { 
        path: 'home',  // Rota para a página inicial (Home)
        component: HomeComponent,  // Componente associado à rota 'home'
        canActivate: [AuthGuard]  // Protege a rota usando o AuthGuard, permitindo acesso apenas se o usuário estiver autenticado
      },
      { 
        path: '',  // Rota vazia que corresponde à raiz do LayoutComponent
        redirectTo: '/home',  // Redireciona para a rota '/home'
        pathMatch: 'full'  // pathMatch 'full' garante que o redirecionamento ocorra apenas quando o caminho estiver completamente vazio
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Configura o roteamento para a aplicação usando as rotas definidas
  exports: [RouterModule]  // Exporta o RouterModule configurado para que esteja disponível em toda a aplicação
})
export class AppRoutingModule { }
