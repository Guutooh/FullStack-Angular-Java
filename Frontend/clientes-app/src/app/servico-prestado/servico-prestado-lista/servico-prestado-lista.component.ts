import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';
import { ServicoPrestadoService } from '../../servico-prestado.service'

/**
 * O decorator @Component define um componente Angular. Este componente é responsável
 * por exibir e gerenciar a lista de serviços prestados que serão buscados a partir de um
 * serviço externo. Ele é associado ao template HTML e ao arquivo CSS correspondentes.
 */
@Component({
  selector: 'app-servico-prestado-lista',  // Define o seletor do componente, que será usado em templates HTML.
  templateUrl: './servico-prestado-lista.component.html',  // Caminho para o template HTML deste componente.
  styleUrls: ['./servico-prestado-lista.component.css']  // Caminho para o arquivo de estilos CSS deste componente.
})
export class ServicoPrestadoListaComponent implements OnInit {

  /**
   * Atributo que armazenará o nome do cliente para busca dos serviços prestados.
   * Este valor será usado como critério de filtro na consulta.
   */
  nome: string;

  /**
   * Atributo que armazenará o número do mês selecionado pelo usuário para
   * filtrar os serviços prestados em um mês específico.
   */
  mes: number;

  /**
   * Array contendo a lista de meses do ano, de janeiro (1) a dezembro (12).
   * Este array é usado para popular uma lista de seleção (dropdown) no template HTML.
   */
  meses: number[];

  /**
   * Array que armazenará a lista de resultados da busca, ou seja, os serviços
   * prestados que correspondem aos critérios de busca (nome e mês).
   */
  lista: ServicoPrestadoBusca[];

  /**
   * Atributo que armazenará mensagens para exibição ao usuário, como uma
   * mensagem de "Nenhum Registro encontrado" caso a busca não retorne resultados.
   */
  message: string;

  /**
   * Construtor do componente, onde o serviço responsável pela busca dos serviços prestados
   * é injetado. Além disso, o array de meses é inicializado aqui.
   * 
   * @param service - Instância do serviço que realizará a busca dos serviços prestados.
   */
  constructor(
    private service: ServicoPrestadoService  // Injeção de dependência do serviço para busca dos dados.
  ) { 
    // Inicializa o array de meses de 1 a 12, representando os meses do ano.
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12];
  }

  /**
   * Método do ciclo de vida do Angular que é chamado após a criação do componente.
   * Neste caso, ele não possui nenhuma lógica específica e serve como um placeholder
   * para futuras implementações que precisem ocorrer quando o componente for inicializado.
   */
  ngOnInit(): void {
  }

  /**
   * Método responsável por realizar a consulta dos serviços prestados com base nos critérios
   * de nome e mês. Ele chama o serviço `ServicoPrestadoService` para buscar os dados e 
   * então processa a resposta.
   */
  consultar(){
    // Chama o método buscar do serviço, passando os critérios de nome e mês.
    this.service
      .buscar(this.nome, this.mes)
      .subscribe(response => {  // Inscreve-se para receber os dados retornados pelo serviço.
        this.lista = response;  // Armazena os dados retornados na variável lista.
        
        // Verifica se a lista retornada está vazia e define a mensagem apropriada.
        if( this.lista.length <= 0 ){
          this.message = "Nenhum Registro encontrado.";  // Define uma mensagem de nenhum registro encontrado.
        }else{
          this.message = null;  // Limpa a mensagem se houver registros na lista.
        }
      });
  }
}
