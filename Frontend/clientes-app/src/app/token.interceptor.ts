// Importa o decorador Injectable, que indica que a classe pode ser injetada como uma dependência
import { Injectable } from '@angular/core';
// Importa classes e interfaces necessárias para criar um interceptador HTTP
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// Importa Observable, que é usado para lidar com operações assíncronas
import { Observable } from 'rxjs';

// Decorador Injectable que permite que o interceptador seja injetado em outros componentes ou serviços
@Injectable()
// A classe TokenInterceptor implementa a interface HttpInterceptor, o que significa que ela deve definir o método intercept
export class TokenInterceptor implements HttpInterceptor {

  // Construtor padrão, que não necessita de injeção de dependências neste caso
  constructor() {}

  /**
   * Método intercept que é chamado automaticamente em todas as requisições HTTP.
   * Ele permite modificar ou manipular as requisições antes que elas sejam enviadas.
   * 
   * @param request - A requisição HTTP que está sendo feita.
   * @param next - O próximo handler na cadeia de interceptores, que lida com a requisição.
   * @returns Um Observable que emite eventos de progresso ou a resposta final da requisição.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Tenta obter o token de autenticação armazenado no localStorage do navegador
    const tokenString = localStorage.getItem('access_token');

    // Armazena a URL da requisição atual para futuras verificações
    const url = request.url;

    // Se o token existe e a URL não termina com '/oauth/token' (para evitar interferir em requisições de autenticação)
    if (tokenString && !url.endsWith('/oauth/token')) {
      // Converte a string JSON do token para um objeto JavaScript
      const token = JSON.parse(tokenString);
      // Extrai o token de acesso (JWT) do objeto token
      const jwt = token.access_token;
      // Clona a requisição original e adiciona o cabeçalho Authorization com o token JWT
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwt  // Adiciona o token no formato 'Bearer <token>'
        }
      });
    }

    // Passa a requisição (modificada ou não) para o próximo handler na cadeia de interceptores
    return next.handle(request);
  }
}
