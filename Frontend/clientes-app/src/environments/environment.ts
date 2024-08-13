// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  production: false, // Indica se o ambiente é de produção (false para ambiente de desenvolvimento)
  apiURLBase: 'http://localhost:8080', // URL base da API para o backend, utilizado para construir os endpoints das requisições
  clientId: 'my-angular-app', // ID do cliente para autenticação OAuth2, utilizado para identificar a aplicação cliente
  clientSecret: '@321', // Segredo do cliente para autenticação OAuth2, utilizado em conjunto com o clientId para autenticação segura
  obterTokenUrl: '/oauth/token', // Endpoint para obtenção de tokens de autenticação, usado no fluxo de login OAuth2
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
