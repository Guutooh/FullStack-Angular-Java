import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'; // Importações necessárias para navegação e acesso aos parâmetros da rota

import { Cliente } from '../cliente'; // Importa o modelo Cliente, que define a estrutura de dados do cliente
import { ClientesService } from '../../clientes.service'; // Importa o serviço ClientesService, responsável por interagir com a API para operações de CRUD
import { Observable } from 'rxjs'; // Importa Observable para trabalhar com operações assíncronas

@Component({
  selector: 'app-clientes-form', // Seletor utilizado para identificar o componente no template HTML
  templateUrl: './clientes-form.component.html', // Caminho para o template HTML deste componente
  styleUrls: ['./clientes-form.component.css'] // Caminho para o arquivo de estilos CSS deste componente
})
export class ClientesFormComponent implements OnInit {

  // Propriedade que armazena os dados do cliente atualmente sendo editado ou criado. Inicializa como um novo objeto Cliente.
  cliente: Cliente;

  // Propriedade booleana que indica se a operação de salvamento/atualização foi bem-sucedida. Inicialmente, é false.
  success: boolean = false;

  // Array de strings que armazena mensagens de erro retornadas pelo backend. Inicialmente, é indefinido.
  errors: String[];

  // Propriedade que armazena o ID do cliente, caso ele exista (em caso de edição). Inicialmente, é indefinido.
  id: number;

  // O construtor injeta as dependências necessárias: ClientesService para realizar operações de CRUD,
  // Router para navegação programática, e ActivatedRoute para acessar os parâmetros da rota atual.
  constructor(
    private service: ClientesService, // Injeção do serviço que interage com a API para operações de CRUD
    private router: Router, // Injeção do serviço de roteamento para navegação programática
    private activatedRoute: ActivatedRoute // Injeção do serviço ActivatedRoute para acessar parâmetros da rota atual
  ) {
    // Inicializa a propriedade cliente com um novo objeto Cliente.
    // Isso é importante para garantir que a propriedade esteja pronta para ser usada no template, evitando erros de null reference.
    this.cliente = new Cliente();
  }

  // Método do ciclo de vida do Angular que é executado assim que o componente é inicializado.
  // Aqui, ele é usado para capturar o ID do cliente (se houver) e carregar os dados do cliente correspondente.
  ngOnInit(): void {
    // Captura os parâmetros da rota atual, como o ID do cliente, se presente.
    let params: Observable<Params> = this.activatedRoute.params;

    // Inscrição no Observable dos parâmetros da rota para capturar o ID da URL, caso exista.
    params.subscribe(urlParams => {
      // O ID do cliente é extraído dos parâmetros da URL e armazenado na propriedade 'id'.
      this.id = urlParams['id'];

      // Se houver um ID, significa que o formulário está no modo de edição e precisa carregar os dados do cliente.
      if (this.id) {
        // Chama o método 'getClienteById' do serviço para buscar os dados do cliente com o ID especificado.
        this.service
          .getClienteById(this.id)
          .subscribe(
            // Se a chamada for bem-sucedida, os dados do cliente são atribuídos à propriedade 'cliente'.
            response => this.cliente = response,
            // Em caso de erro (por exemplo, se o cliente não for encontrado), um novo objeto Cliente vazio é atribuído à propriedade 'cliente'.
            // Isso evita que o formulário apresente erros por tentar acessar dados inexistentes.
            errorResponse => this.cliente = new Cliente()
          );
      }
    });
  }

  // Método que navega de volta para a lista de clientes.
  // Esse método é chamado, por exemplo, quando o usuário clica em "Voltar" após salvar ou atualizar um cliente.
  voltarParaListagem() {
    // Utiliza o Router para navegar programaticamente de volta para a rota '/clientes/lista', onde a lista de clientes é exibida.
    this.router.navigate(['/clientes/lista']);
  }

  // Método chamado ao submeter o formulário. Ele decide se deve criar um novo cliente ou atualizar um existente,
  // com base na presença do ID. Se o ID existir, significa que o cliente está sendo editado; caso contrário, é um novo cadastro.
  onSubmit() {
    // Verifica se há um ID, o que indica que o formulário está em modo de edição.
    if (this.id) {
      // Chama o método 'atualizar' do serviço para enviar os dados do cliente atualizado para o backend.
      this.service
        .atualizar(this.cliente)
        .subscribe(
          // Se a atualização for bem-sucedida, a variável 'success' é definida como true e as mensagens de erro são limpas.
          response => {
            this.success = true; // Define que a operação foi um sucesso, para exibir a mensagem apropriada no template.
            this.errors = null; // Limpa qualquer mensagem de erro anterior.
          },
          // Em caso de erro durante a atualização, uma mensagem de erro é atribuída à propriedade 'errors'.
          errorResponse => {
            this.errors = ['Erro ao atualizar o cliente.']; // Define a mensagem de erro, que será exibida no template.
          }
        );
    } else {
      // Se não houver ID, isso indica que o formulário está criando um novo cliente.
      // Chama o método 'salvar' do serviço para enviar os dados do novo cliente para o backend.
      this.service
        .salvar(this.cliente)
        .subscribe(
          // Se o salvamento for bem-sucedido, 'success' é definido como true, as mensagens de erro são limpas,
          // e o novo cliente retornado pelo backend é armazenado na propriedade 'cliente'.
          response => {
            this.success = true; // Define que a operação foi um sucesso, para exibir a mensagem apropriada no template.
            this.errors = null; // Limpa qualquer mensagem de erro anterior.
            this.cliente = response; // Atualiza a propriedade 'cliente' com os dados retornados pelo backend, incluindo o novo ID gerado.
          },
          // Em caso de erro durante a criação do cliente, as mensagens de erro retornadas pelo backend são atribuídas à propriedade 'errors'.
          errorResponse => {
            this.success = false; // Define que a operação falhou, para exibir a mensagem apropriada no template.
            this.errors = errorResponse.error.errors; // Define as mensagens de erro que serão exibidas no template.
          }
        );
    }
  }

}
