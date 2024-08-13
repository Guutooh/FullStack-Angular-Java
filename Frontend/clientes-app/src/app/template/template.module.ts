import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavbarComponent,  // Declaração do componente NavbarComponent
    SidebarComponent  // Declaração do componente SidebarComponent
  ],
  imports: [
    CommonModule,  // Importa CommonModule para funcionalidades comuns do Angular, como diretivas e pipes
    RouterModule  // Importa RouterModule para habilitar o roteamento dentro dos componentes
  ],
  exports: [
    NavbarComponent,  // Exporta NavbarComponent para que outros módulos possam utilizá-lo
    SidebarComponent  // Exporta SidebarComponent para que outros módulos possam utilizá-lo
  ]
})
export class TemplateModule { }
