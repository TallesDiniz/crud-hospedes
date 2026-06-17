package com.hotel.strategy;

import com.hotel.dao.IHospedeDAO;
import com.hotel.model.Hospede;
import org.springframework.stereotype.Component;

/**
 * RN0202 — O CPF do hóspede deve ser único no sistema.
 * Consulta o DAO para verificar existência (Strategy com -dao).
 */
@Component
public class ValidarCPFUnico implements IStrategy {

    private final IHospedeDAO dao;

    public ValidarCPFUnico(IHospedeDAO dao) {
        this.dao = dao;
    }

    @Override
    public String processar(Hospede h) {
        Hospede existente = dao.consultarPorCpf(h.getCpf());
        if (existente != null && !existente.getId().equals(h.getId())) {
            return "Já existe hóspede cadastrado com o CPF " + h.getCpf() + ".";
        }
        return null; // ok
    }
}
