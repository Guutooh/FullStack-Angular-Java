import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca'; // Importa o modelo ServicoPrestadoBusca, que representa os dados retornados pela busca de serviços prestados
import { ServicoPrestadoService } from '../../servico-prestado.service'; // Importa o serviço ServicoPrestadoService para realizar a busca

@Component({
  selector: 'app-servico-prestado-lista', // Define o seletor do componente
  templateUrl: './servico-prestado-lista.component.html', // Especifica o caminho para o template HTML do componente
  styleUrls: ['./servico-prestado-lista.component.css'] // Especifica o caminho para o arquivo de estilos CSS do componente
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string; // Armazena o nome do cliente para o filtro de busca
  mes: number; // Armazena o mês selecionado para o filtro de busca
  meses: number[]; // Armazena a lista de meses (1 a 12) para a seleção no filtro
  lista: ServicoPrestadoBusca[]; // Armazena os resultados da busca de serviços prestados
  message: string; // Armazena a mensagem a ser exibida, como "Nenhum Registro encontrado."

  constructor(
    private service: ServicoPrestadoService // Injeta o serviço ServicoPrestadoService para realizar a busca de serviços prestados
  ) { 
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12]; // Inicializa o array com todos os meses do ano (1 a 12)
  }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado; não realiza nenhuma ação específica aqui
  }

  consultar() {
    // Método chamado para realizar a consulta de serviços prestados com base nos filtros aplicados
    this.service
      .buscar(this.nome, this.mes) // Chama o método 'buscar' do serviço com os parâmetros 'nome' e 'mes'
      .subscribe(response => { // Inscreve-se na resposta da API
        this.lista = response; // Armazena a resposta da API (lista de serviços prestados) na variável 'lista'
        if( this.lista.length <= 0 ){
          this.message = "Nenhum Registro encontrado."; // Define a mensagem caso não haja resultados
        } else {
          this.message = null; // Limpa a mensagem se houver resultados
        }
      });
  }
}
