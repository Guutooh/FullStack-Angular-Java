import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
  { path: 'clientes-form', component: ClientesFormComponent },  // Rota para o formulário de criação de clientes
  { path: 'clientes-form/:id', component: ClientesFormComponent },  // Rota para o formulário de edição de clientes (usando ID como parâmetro)
  { path: 'clientes-lista', component: ClientesListaComponent },  // Rota para a lista de clientes
  { path: '', redirectTo: '/clientes-lista', pathMatch: 'full' }  // Redireciona a rota raiz para a lista de clientes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importa o RouterModule com as rotas definidas para o módulo de clientes
  exports: [RouterModule],  // Exporta o RouterModule para ser utilizado em outros módulos
})
export class ClientesRoutingModule {}
