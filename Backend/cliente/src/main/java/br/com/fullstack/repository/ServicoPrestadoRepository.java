package br.com.fullstack.repository;

import br.com.fullstack.cliente.model.ServicoPrestado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServicoPrestadoRepository extends JpaRepository<ServicoPrestado, Integer> {

    // Consulta personalizada que busca serviços prestados com base no nome parcial do cliente e no mês do serviço
    @Query(" select s from ServicoPrestado s join s.cliente c " +
            " where upper( c.nome ) like upper( :nome ) and MONTH(s.data) = :mes ")
    List<ServicoPrestado> findByNomeClienteAndMes(
            @Param("nome") String nome, @Param("mes") Integer mes);
    // Método que executa a consulta JPQL definida acima, retornando uma lista de serviços prestados que correspondem ao nome do cliente e ao mês fornecidos
    // @Param("nome"): Parte do nome do cliente a ser usada como filtro na busca, independente de maiúsculas/minúsculas
    // @Param("mes"): Número do mês (1-12) utilizado como critério de filtro para a data do serviço
}
