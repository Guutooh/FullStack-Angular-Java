package br.com.fullstack.repository;

import br.com.fullstack.cliente.model.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoPrestadoRepository extends JpaRepository<Servico, Integer> {
}
