package com.hotel.strategy;

import com.hotel.model.Hospede;
import org.springframework.stereotype.Component;
import java.util.regex.Pattern;

/**
 * RN0211 — O e-mail informado deve estar em formato válido.
 */
@Component
public class ValidarEmailFormato implements IStrategy {

    private static final Pattern EMAIL_REGEX =
        Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");

    @Override
    public String processar(Hospede h) {
        if (h.getEmail() != null && !EMAIL_REGEX.matcher(h.getEmail()).matches()) {
            return "E-mail em formato inválido: " + h.getEmail();
        }
        return null; // ok
    }
}
