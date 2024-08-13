package br.com.fullstack.cliente.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterFilterRegistrationBean() {
        // Cria uma lista contendo "*" para permitir todas as origens, cabeçalhos e métodos
        List<String> all = Arrays.asList("*");

        // Cria uma nova configuração de CORS
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        // Permite todas as origens
        corsConfiguration.setAllowedOriginPatterns(all);

        // Permite todos os cabeçalhos
        corsConfiguration.setAllowedHeaders(all);

        // Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
        corsConfiguration.setAllowedMethods(all);

        // Permite o envio de credenciais (cookies, headers de autenticação, etc.)
        corsConfiguration.setAllowCredentials(true);

        // Associa a configuração de CORS a todos os endpoints da aplicação ("**")
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", corsConfiguration);

        // Cria um filtro de CORS com a configuração definida
        CorsFilter corsFilter = new CorsFilter(source);

        // Registra o filtro de CORS no contexto do Spring com a mais alta precedência
        FilterRegistrationBean<CorsFilter> filter = new FilterRegistrationBean<>(corsFilter);
        filter.setOrder(Ordered.HIGHEST_PRECEDENCE);

        // Retorna o filtro registrado
        return filter;
    }
}
