package br.com.fullstack.cliente.service;

import br.com.fullstack.cliente.model.Usuario;
import br.com.fullstack.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private UsuarioRepository repository;

//    public Usuario salvar(Usuario usuario){
//        boolean exists = repository.existsByUsername(usuario.getUsername());
//        if(exists){
//            throw new UsuarioCadastradoException(usuario.getUsername());
//        }
//        return repository.save(usuario);
//    }

}
