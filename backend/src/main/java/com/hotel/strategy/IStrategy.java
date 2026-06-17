package com.hotel.strategy;

import com.hotel.model.Hospede;

/**
 * Strategy (Padrão Strategy) — cada regra de negócio é uma classe-ação.
 * Retorna null = ok, ou String com mensagem de erro.
 */
public interface IStrategy {
    String processar(Hospede hospede);
}
