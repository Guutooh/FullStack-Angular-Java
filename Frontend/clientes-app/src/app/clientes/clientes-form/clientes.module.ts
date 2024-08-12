import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientesFormComponent } from './clientes-form.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientesFormComponent],
  
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule

  ], exports:[
    ClientesFormComponent
  ]
})
export class ClientesModule { }
