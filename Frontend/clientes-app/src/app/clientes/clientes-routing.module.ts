import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard'; // Importa o guard de autenticação que protege as rotas

// Define as rotas para o módulo de clientes
const routes: Routes = [
  { 
    path: 'clientes',  // Rota pai para todas as rotas de clientes
    component: LayoutComponent,  // Componente LayoutComponent como wrapper para as rotas filhas
    canActivate: [AuthGuard],  // Protege as rotas filhas, permitindo acesso apenas se o usuário estiver autenticado
    children: [  // Define as rotas filhas sob a rota 'clientes'
    
      { path: 'form', component: ClientesFormComponent },  // Rota para o formulário de cadastro de novos clientes
      { path: 'form/:id', component: ClientesFormComponent },  // Rota para o formulário de edição de clientes (com ID passado como parâmetro)
      { path: 'lista', component: ClientesListaComponent },  // Rota para a listagem de clientes
      { path: '', redirectTo: '/clientes/lista', pathMatch: 'full' }  // Redireciona para a listagem se a rota for '/clientes'
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importa as rotas definidas para serem usadas pelo módulo
  exports: [RouterModule]  // Exporta RouterModule para que as rotas estejam disponíveis no módulo que importar este módulo
})
export class ClientesRoutingModule { }
