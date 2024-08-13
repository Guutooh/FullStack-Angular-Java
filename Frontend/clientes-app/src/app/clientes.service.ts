import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa o serviço HttpClient para fazer requisições HTTP
import { Cliente } from './clientes/cliente'; // Importa o modelo Cliente
import { Observable } from 'rxjs'; // Importa Observable para trabalhar com operações assíncronas
import { environment } from '../environments/environment'; // Importa o ambiente para acessar variáveis de configuração

@Injectable({
  providedIn: 'root' // O serviço é fornecido na raiz da aplicação, tornando-o disponível globalmente
})
export class ClientesService {

  // Define a URL base da API para operações relacionadas a clientes, utilizando a URL base do ambiente
  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor(private http: HttpClient) {} // Injeta o serviço HttpClient no construtor

  // Método para salvar um novo cliente
  // Envia uma requisição POST para a API e retorna um Observable do cliente criado
  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiURL}`, cliente);
  }

  // Método para atualizar um cliente existente
  // Envia uma requisição PUT para a API com o ID do cliente e os novos dados, e retorna um Observable com a resposta da API
  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  // Método para obter a lista de todos os clientes
  // Envia uma requisição GET para a API e retorna um Observable com um array de clientes
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiURL);
  }

  // Método para obter os dados de um cliente específico pelo ID
  // Envia uma requisição GET para a API com o ID do cliente e retorna um Observable com os dados do cliente
  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }

  // Método para deletar um cliente
  // Envia uma requisição DELETE para a API com o ID do cliente e retorna um Observable com a resposta da API
  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${cliente.id}`);
  }
}
