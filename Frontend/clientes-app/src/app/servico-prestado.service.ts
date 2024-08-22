// Importa o decorador Injectable, que indica que a classe pode ser injetada como uma dependência
import { Injectable } from '@angular/core';
// Importa HttpClient para fazer requisições HTTP e HttpParams para manipular parâmetros de requisição
import { HttpClient, HttpParams } from '@angular/common/http';
// Importa a classe ServicoPrestado, que representa a estrutura de dados de um serviço prestado
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
// Importa Observable, que é usado para lidar com operações assíncronas
import { Observable } from 'rxjs';
// Importa as configurações de ambiente, como a URL base da API
import { environment } from '../environments/environment';
// Importa a interface ServicoPrestadoBusca, que representa a estrutura dos dados retornados ao buscar serviços prestados
import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';

// Decorador Injectable que permite que o serviço seja injetado em outros componentes ou serviços
@Injectable({
  providedIn: 'root'  // Indica que o serviço será disponibilizado em toda a aplicação
})
export class ServicoPrestadoService {

  // Define a URL base da API, combinando a URL do ambiente com o endpoint de serviços prestados
  apiURL: string = environment.apiURLBase + "/api/servicos-prestados";

  // Construtor que injeta o HttpClient para realizar requisições HTTP
  constructor(private http: HttpClient) { }

  /**
   * Salva um novo serviço prestado no servidor, enviando uma requisição HTTP POST.
   * 
   * @param servicoPrestado - Objeto do tipo ServicoPrestado que será salvo no servidor.
   * @returns Um Observable que pode ser assinado para receber a resposta do servidor.
   */
  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    // Envia uma requisição POST para a URL da API, enviando o objeto servicoPrestado no corpo da requisição
    return this.http.post<ServicoPrestado>(this.apiURL, servicoPrestado);
  }

  /**
   * Busca serviços prestados no servidor com base no nome do cliente e no mês.
   * 
   * @param nome - Nome do cliente usado como critério de busca.
   * @param mes - Mês usado como critério de busca.
   * @returns Um Observable que pode ser assinado para receber a lista de serviços prestados correspondentes.
   */
  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {

    // Cria um objeto HttpParams para adicionar os parâmetros de consulta (nome e mes)
    const httpParams = new HttpParams()
      .set("nome", nome)  // Adiciona o nome como parâmetro de consulta
      .set("mes", mes ? mes.toString() : '');  // Adiciona o mês como parâmetro, convertendo para string. Se o mês for nulo ou indefinido, adiciona uma string vazia.

    // Concatena os parâmetros com a URL base da API
    const url = this.apiURL + "?" + httpParams.toString();
    
    // Envia uma requisição GET para a URL da API com os parâmetros de consulta
    return this.http.get<any>(url);
  }

}
