# Clientes App
Este projeto é uma aplicação Angular para gerenciamento de clientes. Ele inclui funcionalidades para criar, atualizar, listar e deletar clientes, além de gerenciar serviços prestados. O projeto foi desenvolvido com foco em fornecer uma interface simples e eficiente para operações de CRUD (Create, Read, Update, Delete) de clientes.
## Tecnologias e Ferramentas Utilizadas
- **Angular**: Framework principal utilizado para o desenvolvimento da aplicação front-end. Angular permite a criação de aplicações web dinâmicas e robustas.
- **TypeScript**: Linguagem utilizada para escrever o código do projeto. TypeScript é um superconjunto do JavaScript que adiciona tipagem estática e outros recursos avançados.
- **Bootstrap**: Framework CSS utilizado para estilizar a aplicação e tornar o layout responsivo. Bootstrap oferece uma série de componentes pré-estilizados que facilitam o desenvolvimento de interfaces modernas.
- **Font Awesome**: Biblioteca de ícones utilizada para adicionar ícones aos componentes de navegação e botões.
- **RxJS**: Biblioteca para programação reativa utilizada com Angular para lidar com operações assíncronas, como requisições HTTP.
- **JQuery**: Utilizado em conjunto com Bootstrap para manipular elementos da interface do usuário, como a barra lateral (sidebar) e o estado dos links de navegação.
- **Spring Boot**: Framework utilizado no backend (não incluído neste repositório) para fornecer uma API RESTful que a aplicação Angular consome. O Spring Boot facilita a criação de aplicações Java robustas e escaláveis.
- **OAuth2**: Protocolo de autenticação utilizado para garantir a segurança da aplicação, gerenciando tokens de acesso e autenticação de usuários.
- **Environment Configuration**: O projeto utiliza diferentes configurações de ambiente (desenvolvimento e produção) para garantir que a aplicação funcione corretamente em diferentes cenários.
## Estrutura do Projeto
- **src/app/clientes**: Contém os componentes e serviços relacionados ao gerenciamento de clientes.
- **src/app/template**: Contém componentes de layout, como a barra de navegação (`NavbarComponent`) e a barra lateral (`SidebarComponent`).
- **src/environments**: Contém arquivos de configuração para diferentes ambientes (desenvolvimento e produção).
## Como Executar o Projeto

1. Clone o repositório do GitHub
```
 git clone https://github.com/seu-usuario/clientes-app.git
```

2. Navegue até o diretório do projeto:
```
cd clientes-app
```

3. Instale as dependências do projeto:
```
npm install
```

4. Execute a aplicação:
```
ng serve
```

5. Acesse a aplicação no navegador:
```
http://localhost:4200
```

### Configuração do Backend

Este projeto front-end consome uma API RESTful fornecida por um backend desenvolvido em Spring Boot. Certifique-se de que o backend esteja configurado e em execução para que a aplicação Angular funcione corretamente.

