package br.com.fullstack.cliente.exceptions;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public class ApiErrors {

    @Getter
    private List<String> errors;

    // Construtor que aceita uma lista de mensagens de erro
    public ApiErrors(List<String> errors) {
        this.errors = errors;
    }

    // Construtor que aceita uma única mensagem de erro
    public ApiErrors(String message) {
        this.errors = Arrays.asList(message);
    }
}
