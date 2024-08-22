// Importa o decorador Injectable, que indica que a classe pode ser injetada como uma dependência
import { Injectable } from '@angular/core';
// Importa HttpClient, que permite fazer requisições HTTP, e outros tipos relevantes
import { HttpClient } from '@angular/common/http';

// Importa a classe Cliente, que representa a estrutura de dados de um cliente
import { Cliente } from './clientes/cliente';
// Importa Observable, que é usado para lidar com operações assíncronas
import { Observable } from 'rxjs';
// Importa as configurações de ambiente, como a URL base da API
import { environment } from '../environments/environment'

// Decorador Injectable que permite que o serviço seja injetado em outros componentes ou serviços
@Injectable({
  providedIn: 'root'  // Indica que o serviço será disponibilizado em toda a aplicação
})
export class ClientesService {

  // Define a URL base da API, combinando a URL do ambiente com o endpoint de clientes
  apiURL: string = environment.apiURLBase + '/api/clientes';

  // Construtor que injeta o HttpClient para realizar requisições HTTP
  constructor(private http: HttpClient) {}

  /**
   * Salva um novo cliente no servidor, enviando uma requisição HTTP POST.
   * 
   * @param cliente - Objeto do tipo Cliente que será salvo no servidor.
   * @returns Um Observable que pode ser assinado para receber a resposta do servidor.
   */
  salvar(cliente: Cliente) : Observable<Cliente> {
    // Envia uma requisição POST para a URL da API, enviando o objeto cliente no corpo da requisição
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  /**
   * Atualiza os dados de um cliente existente no servidor, enviando uma requisição HTTP PUT.
   * 
   * @param cliente - Objeto do tipo Cliente que será atualizado no servidor.
   * @returns Um Observable que pode ser assinado para receber a resposta do servidor.
   */
  atualizar(cliente: Cliente) : Observable<any> {
    // Envia uma requisição PUT para a URL da API, incluindo o ID do cliente na URL e o objeto cliente no corpo
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  /**
   * Retorna uma lista de todos os clientes do servidor, enviando uma requisição HTTP GET.
   * 
   * @returns Um Observable que pode ser assinado para receber a lista de clientes do servidor.
   */
  getClientes() : Observable<Cliente[]> {
    // Envia uma requisição GET para a URL da API e espera um array de objetos Cliente como resposta
    return this.http.get<Cliente[]>(this.apiURL);
  }
  
  /**
   * Busca um cliente específico pelo seu ID, enviando uma requisição HTTP GET.
   * 
   * @param id - O ID do cliente que será buscado no servidor.
   * @returns Um Observable que pode ser assinado para receber o cliente correspondente.
   */
  getClienteById(id: number) : Observable<Cliente> {
    // Envia uma requisição GET para a URL da API, incluindo o ID do cliente na URL
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  /**
   * Deleta um cliente específico no servidor, enviando uma requisição HTTP DELETE.
   * 
   * @param cliente - O objeto do tipo Cliente que será deletado.
   * @returns Um Observable que pode ser assinado para receber a resposta do servidor após a exclusão.
   */
  deletar(cliente: Cliente) : Observable<any> {
    // Envia uma requisição DELETE para a URL da API, incluindo o ID do cliente na URL
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
}
