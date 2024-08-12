import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';


const routes: Routes = [
  {path: 'clientes-form', component: ClientesFormComponent},
  {path: 'clientes-form/:id', component: ClientesFormComponent},
  { path: 'clientes-lista', component: ClientesListaComponent },
  { path: '', redirectTo : '/clientes-lista', pathMatch: 'full' }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
