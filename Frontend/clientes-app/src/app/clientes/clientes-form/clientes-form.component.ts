import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;  // Objeto que representa um cliente
  success: boolean = false;  // Flag para indicar se a operação foi bem-sucedida
  errors: String[];  // Array para armazenar mensagens de erro
  id: number;  // ID do cliente para operações de edição

  constructor(
    private service: ClientesService,  // Injeção de dependência do serviço ClientesService
    private router: Router,  // Injeção de dependência do serviço Router para navegação
    private activatedRoute: ActivatedRoute  // Injeção de dependência para acessar parâmetros da rota ativa
  ) {
    this.cliente = new Cliente();  // Inicializa um novo objeto Cliente
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;  // Obtém os parâmetros da rota como um Observable

    params.subscribe((urlParams) => {  // Inscreve-se para receber os parâmetros da rota
      this.id = urlParams['id'];  // Extrai o parâmetro 'id' da URL

      if (this.id) {  // Se o ID existir, estamos em modo de edição
        this.service.getClienteById(this.id).subscribe(
          (response) => (this.cliente = response),  // Se o cliente for encontrado, popula o objeto cliente com os dados recebidos
          (errorResponse) => (this.cliente = new Cliente())  // Se houver erro, inicializa um novo objeto Cliente
        );
      }
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);  // Navega de volta para a lista de clientes
  }

  onSubmit() {
    if (this.id) {  // Se existe um ID, atualiza o cliente existente
      this.service.atualizar(this.cliente).subscribe(
        (response) => {
          this.success = true;  // Define sucesso como true
          this.errors = null;  // Limpa os erros
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar o cliente.'];  // Define uma mensagem de erro
        }
      );

    } else {  // Se não existe ID, cria um novo cliente
      this.service.salvar(this.cliente).subscribe(
        (response) => {
          this.success = true;  // Define sucesso como true
          this.errors = null;  // Limpa os erros
          this.cliente = response;  // Atualiza o objeto cliente com a resposta do servidor
        },
        (errorResponse) => {
          this.success = false;  // Define sucesso como false
          this.errors = errorResponse.error.errors;  // Atribui as mensagens de erro recebidas do servidor
        }
      );
    }
  }
}
