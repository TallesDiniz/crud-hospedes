package com.hotel.fachada;

import com.hotel.dao.IHospedeDAO;
import com.hotel.model.Hospede;
import com.hotel.strategy.IStrategy;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Fachada (Padrão Fachada) — orquestra:
 * 1. Itera List<IStrategy> em ordem
 * 2. Se todas retornam null (ok), chama o DAO
 * 3. O Controller chama SÓ ela
 */
@Service
public class HospedeFachada implements IHospedeFachada {

    private final List<IStrategy> estrategias;
    private final IHospedeDAO dao;

    public HospedeFachada(List<IStrategy> estrategias, IHospedeDAO dao) {
        this.estrategias = estrategias;
        this.dao = dao;
    }

    private void executarStrategies(Hospede h) {
        for (IStrategy strategy : estrategias) {
            String erro = strategy.processar(h);
            if (erro != null) {
                throw new IllegalArgumentException(erro);
            }
        }
    }

    @Override
    public Hospede cadastrar(Hospede hospede) {
        executarStrategies(hospede);
        return dao.salvar(hospede);
    }

    @Override
    public Hospede alterar(Hospede hospede) {
        executarStrategies(hospede);
        return dao.alterar(hospede);
    }

    @Override
    public void inativar(Long id) {
        Hospede h = dao.consultarPorId(id);
        if (h == null) throw new IllegalArgumentException("Hóspede não encontrado.");
        h.setAtivo(false);
        dao.alterar(h);
    }

    @Override
    public List<Hospede> consultar(String filtroNome, String filtroCpf) {
        return dao.consultar(filtroNome, filtroCpf);
    }
}
