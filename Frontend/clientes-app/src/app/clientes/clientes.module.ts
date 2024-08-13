import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

@NgModule({
  declarations: [
    ClientesFormComponent,  // Declaração do componente ClientesFormComponent
    ClientesListaComponent  // Declaração do componente ClientesListaComponent
  ],
  
  imports: [
    CommonModule,  // Importa CommonModule, que fornece diretivas e pipes comuns do Angular
    ClientesRoutingModule,  // Importa o módulo de roteamento específico para clientes
    FormsModule  // Importa FormsModule para suporte a formulários
  ], 
  exports: [
    ClientesFormComponent,  // Exporta ClientesFormComponent para uso em outros módulos
    ClientesListaComponent  // Exporta ClientesListaComponent para uso em outros módulos
  ]
})
export class ClientesModule { }
