// Importações necessárias para o funcionamento do componente e de seus serviços
import { Component } from '@angular/core';  // Importa o decorador Component do Angular
import { Router } from '@angular/router';  // Importa o serviço Router para navegação programática
import { AuthService } from '../auth.service';  // Importa o serviço de autenticação personalizado
import { Usuario } from './usuario';  // Importa a classe Usuario que representa um usuário no sistema

@Component({
  selector: 'app-login',  // Define o seletor CSS para instanciar o componente
  templateUrl: './login.component.html',  // Define o caminho para o template HTML deste componente
  styleUrls: ['./login.component.css']  // Define o caminho para os arquivos CSS específicos deste componente
})
export class LoginComponent {

  // Propriedades que armazenam os dados do formulário de login
  username: string;  // Nome de usuário inserido pelo usuário
  password: string;  // Senha inserida pelo usuário

  // Propriedade para controlar se o formulário de cadastro está ativo
  cadastrando: boolean;

  // Propriedade que armazena a mensagem de sucesso após o cadastro
  mensagemSucesso: string;

  // Array que armazena mensagens de erro retornadas pelo backend, caso ocorram falhas na operação
  errors: String[];

  // O construtor injeta as dependências necessárias: Router para navegação e AuthService para autenticação
  constructor(
    private router: Router,  // Injeta o serviço de roteamento para navegação
    private authService: AuthService  // Injeta o serviço de autenticação para lidar com login e cadastro
  ) { }

  // Método chamado ao enviar o formulário de login
  onSubmit(){
    // Chama o serviço de autenticação para tentar logar com os dados do usuário
    this.authService
          .tentarLogar(this.username, this.password)
          .subscribe(response => {
            // Em caso de sucesso, o token de acesso é armazenado no localStorage
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token);
            // Após o login bem-sucedido, redireciona o usuário para a página inicial (home)
            this.router.navigate(['/home']);
          }, errorResponse => {
            // Em caso de erro, armazena uma mensagem de erro para exibir ao usuário
            this.errors = ['Usuário e/ou senha incorreto(s).'];
          });
  }

  // Método para preparar o formulário de cadastro, ativando o modo de cadastro
  preparaCadastrar(event){
    event.preventDefault();  // Previne o comportamento padrão do evento de clique
    this.cadastrando = true;  // Ativa o modo de cadastro
  }

  // Método para cancelar o formulário de cadastro, desativando o modo de cadastro
  cancelaCadastro(){
    this.cadastrando = false;  // Desativa o modo de cadastro
  }

  // Método para cadastrar um novo usuário
  cadastrar(){
    // Cria uma nova instância da classe Usuario e preenche com os dados do formulário
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;

    // Chama o serviço de autenticação para salvar o novo usuário
    this.authService
        .salvar(usuario)
        .subscribe(response => {
            // Em caso de sucesso, exibe uma mensagem de sucesso e limpa os campos do formulário
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
            this.cadastrando = false;  // Desativa o modo de cadastro após a conclusão
            this.username = '';  // Limpa o campo de nome de usuário
            this.password = '';  // Limpa o campo de senha
            this.errors = [];  // Limpa qualquer mensagem de erro anterior
        }, errorResponse => {
            // Em caso de erro, limpa a mensagem de sucesso e armazena as mensagens de erro retornadas
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
        });
  }

}
