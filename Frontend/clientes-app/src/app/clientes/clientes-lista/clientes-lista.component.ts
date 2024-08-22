import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../cliente'; // Importa o modelo Cliente que representa a estrutura dos dados do cliente.
import { ClientesService } from '../../clientes.service'; // Importa o serviço ClientesService que lida com as operações relacionadas a clientes.

@Component({
  selector: 'app-clientes-lista', // Seletor que identifica este componente no template HTML.
  templateUrl: './clientes-lista.component.html', // Caminho para o template HTML deste componente.
  styleUrls: ['./clientes-lista.component.css'] // Caminho para o arquivo de estilos CSS deste componente.
})
export class ClientesListaComponent implements OnInit {

  // Array que armazena a lista de clientes obtida através do serviço. Inicialmente, está vazio.
  clientes: Cliente[] = [];

  // Propriedade para armazenar o cliente selecionado para exclusão.
  clienteSelecionado: Cliente;

  // Propriedade para armazenar a mensagem de sucesso que será exibida ao usuário.
  mensagemSucesso: string;

  // Propriedade para armazenar a mensagem de erro que será exibida ao usuário.
  mensagemErro: string;

  // Construtor da classe que injeta dependências necessárias: ClientesService para realizar operações relacionadas a clientes,
  // e Router para permitir navegação programática entre as páginas do aplicativo.
  constructor(
    private service: ClientesService, // Serviço que lida com operações de CRUD para clientes.
    private router: Router // Serviço de roteamento que permite a navegação programática.
  ) {}

  // Método do ciclo de vida do Angular que é executado assim que o componente é inicializado.
  ngOnInit(): void {
    // Chama o método 'getClientes' do serviço para obter a lista de clientes do backend.
    // O método 'subscribe' é usado para lidar com a resposta assíncrona, onde a lista de clientes é atribuída à propriedade 'clientes'.
    this.service
      .getClientes() // Faz uma chamada HTTP para obter a lista de clientes.
      .subscribe(
        resposta => this.clientes = resposta, // Se a chamada for bem-sucedida, atribui a resposta (lista de clientes) à propriedade 'clientes'.
        erro => this.mensagemErro = 'Erro ao carregar a lista de clientes.' // Em caso de erro, define uma mensagem de erro.
      );
  }

  // Método que navega para a página de formulário de cadastro de novos clientes.
  // É chamado quando o usuário clica no botão "Novo" na interface.
  novoCadastro() {
    this.router.navigate(['/clientes/form']); // Navega programaticamente para a rota '/clientes/form' onde o formulário de cadastro é exibido.
  }

  // Método que armazena o cliente selecionado pelo usuário para exclusão.
  // É chamado quando o usuário clica no botão de exclusão de um cliente na lista.
  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente; // Atribui o cliente clicado à propriedade 'clienteSelecionado'.
  }

  // Método que realiza a exclusão do cliente selecionado.
  // É chamado quando o usuário confirma a exclusão no modal de confirmação.
  deletarCliente() {
    // Chama o método 'deletar' do serviço passando o cliente selecionado. 
    // O serviço realiza a chamada HTTP para excluir o cliente no backend.
    this.service
      .deletar(this.clienteSelecionado)
      .subscribe(
        response => {
          // Se a exclusão for bem-sucedida, exibe uma mensagem de sucesso e recarrega a lista de clientes.
          this.mensagemSucesso = 'Cliente deletado com sucesso!'; // Define a mensagem de sucesso que será exibida na interface.
          this.ngOnInit(); // Recarrega a lista de clientes chamando novamente o 'ngOnInit', atualizando a exibição.
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'  // Em caso de erro, define a mensagem de erro para ser exibida.
      );
  }
}
