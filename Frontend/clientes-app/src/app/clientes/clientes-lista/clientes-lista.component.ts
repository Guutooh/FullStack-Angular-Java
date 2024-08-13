import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];  // Lista de clientes que será exibida na tabela
  clienteSelecionado: Cliente;  // Cliente que será selecionado para edição ou deleção
  mensagemSucesso: string;  // Mensagem de sucesso a ser exibida após uma operação bem-sucedida
  mensagemErro: string;  // Mensagem de erro a ser exibida em caso de falha em uma operação

  constructor(
    private service: ClientesService,  // Injeta o serviço ClientesService para manipulação de dados
    private router: Router  // Injeta o serviço Router para navegação entre páginas
  ) {}

  ngOnInit(): void {
    this.service
      .getClientes()  // Chama o serviço para obter a lista de clientes
      .subscribe(resposta => this.clientes = resposta);  // Preenche o array clientes com a resposta recebida do servidor
  }

  novoCadastro() {
    this.router.navigate(['/clientes-form']);  // Navega para a página de formulário de cadastro de clientes
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;  // Armazena o cliente selecionado para deleção
  }

  deletarCliente() {
    this.service
      .deletar(this.clienteSelecionado)  // Chama o serviço para deletar o cliente selecionado
      .subscribe(
        response => {
          this.mensagemSucesso = 'Cliente deletado com sucesso!';  // Define a mensagem de sucesso
          this.ngOnInit();  // Recarrega a lista de clientes para refletir a deleção
        },
        erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'  // Define a mensagem de erro em caso de falha
      );
  }
}
