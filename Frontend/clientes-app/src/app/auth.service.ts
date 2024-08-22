// Importa o decorador Injectable, que indica que a classe pode ser injetada como uma dependência
import { Injectable } from '@angular/core';
// Importa o HttpClient e HttpParams para realizar requisições HTTP e manipular parâmetros
import { HttpClient, HttpParams } from '@angular/common/http';
// Importa a interface Usuario, que provavelmente representa a estrutura de dados de um usuário
import { Usuario } from './login/usuario'; 
// Importa Observable, uma classe da biblioteca RxJS usada para trabalhar com operações assíncronas
import { Observable } from 'rxjs';

// Importa as configurações de ambiente, que contêm variáveis como URLs e IDs de cliente
import { environment } from '../environments/environment'

// Importa JwtHelperService, que auxilia na manipulação e decodificação de tokens JWT
import { JwtHelperService } from '@auth0/angular-jwt';  

// Decorador Injectable que permite que o serviço seja injetado em outros componentes ou serviços
@Injectable({
  providedIn: 'root'  // Torna o serviço disponível em toda a aplicação
})
export class AuthService {

  // Define a URL base da API, combinando a URL do ambiente com o endpoint de usuários
  apiURL: string = environment.apiURLBase + "/api/usuarios";
  
  // Define a URL para obter tokens de autenticação
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  
  // ID do cliente OAuth2, usado para autenticação
  clientID: string = environment.clientId;
  
  // Segredo do cliente OAuth2, usado para autenticação
  clientSecret: string = environment.clientSecret;
  
  // Instância do JwtHelperService para manipulação e decodificação de tokens JWT
  jwtHelper: JwtHelperService = new JwtHelperService();

  // Construtor que injeta o HttpClient para fazer requisições HTTP
  constructor(
    private http: HttpClient  // HttpClient é injetado para permitir requisições HTTP
  ) { }

  /**
   * Obtém o token de autenticação armazenado no localStorage do navegador.
   * 
   * @returns O token de autenticação, se existir, ou null.
   */
  obterToken(){
    const tokenString = localStorage.getItem('access_token');  // Recupera o token do localStorage
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;  // Extrai o access_token do objeto JSON
      return token;  // Retorna o token
    }
    return null;  // Retorna null se o token não estiver armazenado
  }

  /**
   * Remove o token de autenticação do localStorage, encerrando a sessão do usuário.
   */
  encerrarSessao(){
    localStorage.removeItem('access_token');  // Remove o token do localStorage para encerrar a sessão
  }

  /**
   * Retorna o nome do usuário autenticado, decodificando o token JWT.
   * 
   * @returns O nome do usuário autenticado, se o token estiver presente e válido, ou null.
   */
  getUsuarioAutenticado(){
    const token = this.obterToken();  // Obtém o token de autenticação
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name;  // Decodifica o token para obter o nome do usuário
      return usuario;  // Retorna o nome do usuário
    }
    return null;  // Retorna null se não houver token ou se o token não puder ser decodificado
  }

  /**
   * Verifica se o usuário está autenticado, verificando a validade do token JWT.
   * 
   * @returns Um booleano indicando se o usuário está autenticado.
   */
  isAuthenticated() : boolean {
    const token = this.obterToken();  // Obtém o token de autenticação
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token);  // Verifica se o token está expirado
      return !expired;  // Retorna true se o token não estiver expirado, caso contrário, false
    }
    return false;  // Retorna false se não houver token
  }

  /**
   * Salva um novo usuário no servidor, enviando uma requisição HTTP POST.
   * 
   * @param usuario - Objeto do tipo Usuario que será salvo no servidor.
   * @returns Um Observable que pode ser assinado para receber a resposta do servidor.
   */
  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);  // Envia uma requisição POST para salvar o usuário
  }

  /**
   * Tenta autenticar o usuário, enviando uma requisição HTTP POST com as credenciais.
   * 
   * @param username - Nome de usuário do usuário que está tentando logar.
   * @param password - Senha do usuário que está tentando logar.
   * @returns Um Observable que pode ser assinado para receber o token de autenticação ou uma mensagem de erro.
   */
  tentarLogar(username: string, password: string) : Observable<any> {
    // Configura os parâmetros da requisição com as credenciais do usuário e o tipo de grant
    const params = new HttpParams()
                        .set('username', username)  // Adiciona o nome de usuário como parâmetro
                        .set('password', password)  // Adiciona a senha como parâmetro
                        .set('grant_type', 'password');  // Define o tipo de grant como "password"

    // Configura os cabeçalhos da requisição, incluindo a autorização básica e o tipo de conteúdo
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),  // Codifica o ID do cliente e o segredo em Base64
      'Content-Type': 'application/x-www-form-urlencoded'  // Define o tipo de conteúdo como form-urlencoded
    };
    
    // Envia uma requisição POST para a URL de obtenção do token, com os parâmetros e cabeçalhos configurados
    return this.http.post(this.tokenURL, params.toString(), { headers });
  }
}
