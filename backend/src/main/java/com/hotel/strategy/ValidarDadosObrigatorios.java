package com.hotel.strategy;

import com.hotel.model.Hospede;
import com.hotel.model.Endereco;
import org.springframework.stereotype.Component;

/**
 * RN0201 — Dados obrigatórios do hóspede:
 * nome, CPF, data nascimento, telefone, e-mail, endereço completo.
 */
@Component
public class ValidarDadosObrigatorios implements IStrategy {

    @Override
    public String processar(Hospede h) {
        if (h.getNome() == null || h.getNome().isBlank())
            return "Nome é obrigatório.";
        if (h.getCpf() == null || h.getCpf().isBlank())
            return "CPF é obrigatório.";
        if (h.getDataNascimento() == null)
            return "Data de nascimento é obrigatória.";
        if (h.getEmail() == null || h.getEmail().isBlank())
            return "E-mail é obrigatório.";
        if (h.getTelefone() == null || h.getTelefone().isBlank())
            return "Telefone é obrigatório.";

        Endereco end = h.getEndereco();
        if (end == null)
            return "Endereço é obrigatório.";
        if (end.getLogradouro() == null || end.getLogradouro().isBlank())
            return "Logradouro é obrigatório.";
        if (end.getNumero() == null || end.getNumero().isBlank())
            return "Número do endereço é obrigatório.";
        if (end.getCep() == null || end.getCep().isBlank())
            return "CEP é obrigatório.";
        if (end.getBairro() == null || end.getBairro().isBlank())
            return "Bairro é obrigatório.";
        if (end.getCidade() == null || end.getCidade().isBlank())
            return "Cidade é obrigatória.";
        if (end.getEstado() == null || end.getEstado().isBlank())
            return "Estado é obrigatório.";

        return null; // ok
    }
}
