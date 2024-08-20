package br.com.fullstack.cliente.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    // Injeta o AuthenticationManager, que é responsável por gerenciar o processo de autenticação.
    @Autowired
    private AuthenticationManager authenticationManager;

    // Injeta a chave de assinatura para o JWT (JSON Web Token) a partir das propriedades da aplicação.
    @Value("${security.jwt.signing-key}")
    private String signingKey;

    // Define um bean para armazenar tokens JWT.
    @Bean
    public TokenStore tokenStore(){

        // Retorna uma instância de JwtTokenStore, que armazena tokens de acesso usando JWT.
        return new JwtTokenStore(accessTokenConverter());
    }

    // Define um bean para converter tokens de acesso em JWT.
    @Bean
    public JwtAccessTokenConverter accessTokenConverter(){

        // Cria uma nova instância de JwtAccessTokenConverter, que é usada para converter tokens OAuth2 em JWT.
        JwtAccessTokenConverter tokenConverter = new JwtAccessTokenConverter();

        // Configura a chave de assinatura para o JWT, garantindo que os tokens gerados sejam assinados digitalmente.
        tokenConverter.setSigningKey(signingKey);

        return tokenConverter;
    }

    // Configura os endpoints do servidor de autorização.
    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
                // Define o armazenamento de tokens como o JwtTokenStore.
                .tokenStore(tokenStore())

                // Define o conversor de tokens para JWT.
                .accessTokenConverter(accessTokenConverter())

                // Configura o AuthenticationManager para gerenciar autenticações nos endpoints do servidor de autorização.
                .authenticationManager(authenticationManager);
    }

    // Configura os detalhes do cliente que solicita tokens do servidor de autorização.
    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients
                // Define que os detalhes do cliente serão armazenados em memória.
                .inMemory()

                // Define o ID do cliente que solicita o token.
                .withClient("my-angular-app")

                // Define o segredo (senha) do cliente.
                .secret("@321")

                // Define os escopos de autorização, ou seja, o que o cliente está autorizado a fazer.
                .scopes("read", "write")

                // Define o tipo de concessão de autorização como "password", permitindo que clientes troquem credenciais de usuário por tokens de acesso.
                .authorizedGrantTypes("password")

                // Define a validade do token de acesso em segundos (1800 segundos = 30 minutos).
                .accessTokenValiditySeconds(1800);
    }
}
