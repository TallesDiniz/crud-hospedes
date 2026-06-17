package com.hotel.fachada;

import com.hotel.model.Hospede;
import java.util.List;

/**
 * Interface da Fachada — o Controller só conhece esta interface.
 */
public interface IHospedeFachada {
    Hospede cadastrar(Hospede hospede);
    Hospede alterar(Hospede hospede);
    void inativar(Long id);
    List<Hospede> consultar(String filtroNome, String filtroCpf);
}
