import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientesFormComponent } from './clientes-form.component';
import { ClientesRoutingModule } from './clientes-routing.module';


@NgModule({
  declarations: [ClientesFormComponent],
  
  imports: [
    CommonModule,
    ClientesRoutingModule,
    
  ], exports:[
    ClientesFormComponent
  ]
})
export class ClientesModule { }
