package br.com.fullstack.cliente.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.Locale;

@Configuration
public class InternacionalizacaoConfig {

    // Define um bean para gerenciar as mensagens de internacionalização
    @Bean
    public MessageSource messageSource() {
        // Cria uma instância de ReloadableResourceBundleMessageSource
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

        // Define o local dos arquivos de mensagens, no caso, "classpath:messages"
        messageSource.setBasename("classpath:messages");

        // Define a codificação padrão para as mensagens como ISO-8859-1
        messageSource.setDefaultEncoding("ISO-8859-1");

        // Define o locale padrão do sistema
        messageSource.setDefaultLocale(Locale.getDefault());

        return messageSource;  // Retorna a instância configurada de MessageSource
    }

    // Define um bean para a fábrica de validação que utiliza as mensagens configuradas
    @Bean
    public LocalValidatorFactoryBean validatorFactoryBean() {
        // Cria uma instância de LocalValidatorFactoryBean
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();

        // Configura o MessageSource para ser utilizado na validação
        bean.setValidationMessageSource(messageSource());

        return bean;  // Retorna a instância configurada de LocalValidatorFactoryBean
    }
}
