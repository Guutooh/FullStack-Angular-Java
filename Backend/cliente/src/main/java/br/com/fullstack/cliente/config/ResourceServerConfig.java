package br.com.fullstack.cliente.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // Configura a segurança HTTP para proteger as APIs do recurso.

        // Inicia a configuração de autorização para as requisições HTTP.
        http
                // Permite acesso irrestrito ao endpoint "/api/usuarios". Qualquer usuário, autenticado ou não, pode acessar essa rota.
                .authorizeRequests()
                .antMatchers("/api/usuarios").permitAll()

                // Exige autenticação para qualquer requisição que comece com "/api/clientes/" ou "/api/servicos-prestados/".
                // Apenas usuários autenticados podem acessar esses endpoints.
                .antMatchers(
                        "/api/clientes/**",
                        "/api/servicos-prestados/**").authenticated()

                // Todas as outras requisições não explicitamente configuradas são negadas.
                // Ou seja, se um endpoint não estiver listado com permissões, ele será inacessível.
                .anyRequest().denyAll();
    }
}
