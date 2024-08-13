import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente'; // Importa o modelo Cliente
import { ClientesService } from '../../clientes.service'; // Importa o serviço para manipulação de clientes
import { ServicoPrestado } from '../servicoPrestado'; // Importa o modelo ServicoPrestado
import { ServicoPrestadoService } from '../../servico-prestado.service'; // Importa o serviço para manipulação de serviços prestados

@Component({
  selector: 'app-servico-prestado-form', // Define o seletor do componente
  templateUrl: './servico-prestado-form.component.html', // Define o caminho para o template HTML deste componente
  styleUrls: ['./servico-prestado-form.component.css'] // Define o caminho para os arquivos de estilo CSS deste componente
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = []; // Array para armazenar a lista de clientes
  servico: ServicoPrestado; // Objeto que representa o serviço prestado que será criado ou editado
  success: boolean = false; // Flag para indicar se o serviço foi salvo com sucesso
  errors: String[]; // Array para armazenar mensagens de erro

  constructor(
    private clienteService: ClientesService, // Injeta o serviço ClientesService
    private service: ServicoPrestadoService // Injeta o serviço ServicoPrestadoService
  ) { 
    this.servico = new ServicoPrestado(); // Inicializa o objeto servico como uma nova instância de ServicoPrestado
  }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado
    this.clienteService
      .getClientes() // Chama o serviço para obter a lista de clientes
      .subscribe(response => this.clientes = response); // Armazena a lista de clientes na propriedade 'clientes'
  }

  onSubmit() {
    // Método chamado ao submeter o formulário
    this.service
      .salvar(this.servico) // Chama o serviço para salvar o serviço prestado
      .subscribe(response => {
        this.success = true; // Define a flag de sucesso como true
        this.errors = null; // Limpa as mensagens de erro
        this.servico = new ServicoPrestado(); // Reseta o objeto 'servico' para criar um novo formulário limpo
      }, errorResponse => {
        this.success = false; // Define a flag de sucesso como false em caso de erro
        this.errors = errorResponse.error.errors; // Armazena as mensagens de erro retornadas pela API
      });
  }

}
