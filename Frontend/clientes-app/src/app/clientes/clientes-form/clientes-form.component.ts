import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: string[];
  
  constructor(private service: ClientesService) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {}

  onSubmit(){
    this.service.salvar(this.cliente)
    .subscribe(response =>{
      this.success = true;
    })
  }


}
