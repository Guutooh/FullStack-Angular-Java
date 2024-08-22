// Importa os módulos necessários do Angular.
import { Component, OnInit } from '@angular/core'; 

// Importa a classe Cliente, que representa a entidade Cliente.
import { Cliente } from '../../clientes/cliente'; 

// Importa o serviço ClientesService, que lida com operações relacionadas aos clientes.
import { ClientesService } from '../../clientes.service'; 

// Importa a classe ServicoPrestado, que representa a entidade Serviço Prestado.
import { ServicoPrestado } from '../servicoPrestado'; 

// Importa o serviço ServicoPrestadoService, que lida com operações relacionadas aos serviços prestados.
import { ServicoPrestadoService } from '../../servico-prestado.service'; 

// Decorador que define o componente Angular.
@Component({
  // Define o seletor para este componente, que pode ser usado no HTML como <app-servico-prestado-form>.
  selector: 'app-servico-prestado-form', 

  // Especifica o arquivo de template HTML para este componente.
  templateUrl: './servico-prestado-form.component.html', 

  // Especifica o arquivo de estilos CSS para este componente.
  styleUrls: ['./servico-prestado-form.component.css'] 
})

// Exporta a classe do componente, que implementa a interface OnInit.
export class ServicoPrestadoFormComponent implements OnInit {

  // Array que armazena a lista de clientes disponíveis.
  clientes: Cliente[] = [];

  // Instância de ServicoPrestado para armazenar os dados do serviço prestado.
  servico: ServicoPrestado;

  // Variável que indica se a operação foi bem-sucedida.
  success: boolean = false;

  // Array que armazena mensagens de erro retornadas pelo backend.
  errors: String[];

  // Construtor que injeta os serviços necessários.
  constructor(
    // Injeta o serviço ClientesService para obter a lista de clientes.
    private clienteService: ClientesService,

    // Injeta o serviço ServicoPrestadoService para salvar os dados do serviço prestado.
    private service: ServicoPrestadoService
  ) { 
    // Inicializa uma nova instância de ServicoPrestado.
    this.servico = new ServicoPrestado();
  }

  // Método do ciclo de vida do Angular que é chamado após a criação do componente.
  ngOnInit(): void {
    // Chama o serviço para obter a lista de clientes.
    this.clienteService
      .getClientes()
      // Inscreve-se no Observable retornado e atribui a resposta ao array 'clientes'.
      .subscribe(response => this.clientes = response);
  }

  // Método chamado ao submeter o formulário de serviço prestado.
  onSubmit() {
    // Chama o serviço para salvar o serviço prestado.
    this.service
      .salvar(this.servico)
      // Inscreve-se no Observable retornado para manipular a resposta ou o erro.
      .subscribe(response => {
        // Se a operação for bem-sucedida, define 'success' como true e limpa os erros.
        this.success = true;
        this.errors = null;

        // Reinicializa a instância de ServicoPrestado após o salvamento.
        this.servico = new ServicoPrestado();
      }, errorResponse => {
        // Se houver um erro, define 'success' como false e armazena as mensagens de erro.
        this.success = false;
        this.errors = errorResponse.error.errors;
      });
  }
}
