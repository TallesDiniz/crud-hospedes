package com.hotel.dao;

import com.hotel.model.Hospede;
import java.util.List;

/**
 * DAO (Padrão DAO) — só persistência. Interface para desacoplar implementação.
 */
public interface IHospedeDAO {
    Hospede salvar(Hospede hospede);
    Hospede alterar(Hospede hospede);
    Hospede consultarPorId(Long id);
    Hospede consultarPorCpf(String cpf);
    List<Hospede> consultar(String filtroNome, String filtroCpf);
}
