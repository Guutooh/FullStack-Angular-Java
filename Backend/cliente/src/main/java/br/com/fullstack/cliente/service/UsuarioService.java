package br.com.fullstack.cliente.service;

import br.com.fullstack.cliente.exceptions.UsuarioCadastradoException;
import br.com.fullstack.cliente.model.Usuario;
import br.com.fullstack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements UserDetailsService {

    // Injeta o repositório de usuários, que é responsável por interagir com o banco de dados para operações relacionadas ao usuário.
    @Autowired
    private UsuarioRepository repository;

    // Método para salvar um novo usuário no banco de dados.
    public Usuario salvar(Usuario usuario){
        // Verifica se já existe um usuário com o nome de usuário fornecido.
        boolean exists = repository.existsByUsername(usuario.getUsername());

        // Se o usuário já existir, lança uma exceção personalizada `UsuarioCadastradoException`.
        if(exists){
            throw new UsuarioCadastradoException(usuario.getUsername());
        }

        // Se o usuário não existir, salva o novo usuário no banco de dados e retorna o objeto salvo.
        return repository.save(usuario);
    }

    // Implementação do método `loadUserByUsername` da interface `UserDetailsService`.
    // Esse método é usado pelo Spring Security para carregar os detalhes de um usuário dado o seu nome de usuário.
    @Override
    public UserDetails loadUserByUsername(String username ) throws UsernameNotFoundException {
        // Tenta encontrar um usuário no banco de dados pelo nome de usuário.
        Usuario usuario = repository
                .findByUsername(username)
                // Se o usuário não for encontrado, lança uma exceção `UsernameNotFoundException` com a mensagem "Login não encontrado."
                .orElseThrow(() -> new UsernameNotFoundException("Login não encontrado.") );

        // Cria uma nova instância de `User.UserBuilder` para construir um objeto `UserDetails`.
        return User
                .builder()
                // Define o nome de usuário do objeto `UserDetails`.
                .username(usuario.getUsername())
                // Define a senha do objeto `UserDetails`.
                .password(usuario.getPassword())
                // Define o papel (role) do usuário como "USER".
                .roles("USER")
                // Constrói e retorna o objeto `UserDetails`.
                .build();
    }
}
