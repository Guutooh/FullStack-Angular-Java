package br.com.fullstack.cliente.config;

import br.com.fullstack.cliente.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Injeta o serviço de usuário personalizado que implementa a interface UserDetailsService,
    // responsável por carregar os detalhes do usuário para autenticação.
    @Autowired
    private UsuarioService usuarioService;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Configura o AuthenticationManagerBuilder para utilizar o serviço de usuário personalizado
        // e o codificador de senhas definido.
        auth.userDetailsService(usuarioService)
                // Define o serviço de usuário para carregar os detalhes do usuário durante a autenticação.
                .passwordEncoder(passwordEncoder());
        // Define o codificador de senhas para validar as credenciais do usuário.
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        // Declara o bean do AuthenticationManager para gerenciar o processo de autenticação.
        return super.authenticationManager();
        // Retorna a instância do AuthenticationManager configurada pela classe pai (WebSecurityConfigurerAdapter).
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        // Configura as regras de segurança HTTP para a aplicação.
        http.csrf().disable()
                // Desativa a proteção contra CSRF (Cross-Site Request Forgery),
                // pois a aplicação pode usar tokens JWT ou outra estratégia de segurança.
                .cors()
                // Habilita o CORS (Cross-Origin Resource Sharing) para permitir requisições de outras origens.
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Define a política de criação de sessões como STATELESS, indicando que a aplicação não deve criar sessões HTTP.
        // Isso é comum em APIs RESTful que utilizam tokens JWT, onde o estado do usuário não é mantido no servidor.
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Declara o bean do PasswordEncoder.
        return NoOpPasswordEncoder.getInstance();
        // Utiliza um codificador de senhas que não aplica nenhuma codificação (NoOpPasswordEncoder).
        // Esse codificador é inseguro para ambientes de produção e só deve ser usado para fins de teste.
    }
}
