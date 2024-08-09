package br.com.fullstack.cliente.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ApplicationControllerAdvice {

    // Lida com exceções de validação de argumentos de método inválidos
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // Retorna um status HTTP 400 (Bad Request)
    public ApiErrors handleValidationErrors(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();  // Obtém o resultado da validação
        List<String> messages = bindingResult.getAllErrors()  // Obtém todos os erros de validação
                .stream()  // Cria um fluxo (stream) dos erros
                .map(objectError -> objectError.getDefaultMessage())  // Mapeia cada erro para sua mensagem padrão
                .collect(Collectors.toList());  // Coleta todas as mensagens em uma lista de strings
        return new ApiErrors(messages);  // Retorna um objeto ApiErrors contendo as mensagens de erro
    }

    // Lida com exceções de resposta do tipo ResponseStatusException
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity handleResponseStatusException(ResponseStatusException ex) {
        String mensagemErro = ex.getReason();  // Obtém a razão da exceção
        HttpStatus codigoStatus = ex.getStatus();  // Obtém o código de status da exceção
        ApiErrors apiErrors = new ApiErrors(mensagemErro);  // Cria um objeto ApiErrors com a mensagem de erro
        return new ResponseEntity(apiErrors, codigoStatus);  // Retorna uma ResponseEntity com os erros e o código de status
    }
}
