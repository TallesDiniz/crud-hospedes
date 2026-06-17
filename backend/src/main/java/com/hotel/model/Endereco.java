package com.hotel.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Endereco {
    private String logradouro;
    private String numero;
    private String cep;
    private String bairro;
    private String complemento;
    private String cidade;
    private String estado;

    public Endereco() {}

    public Endereco(String logradouro, String numero, String cep,
                    String bairro, String complemento, String cidade, String estado) {
        this.logradouro = logradouro;
        this.numero = numero;
        this.cep = cep;
        this.bairro = bairro;
        this.complemento = complemento;
        this.cidade = cidade;
        this.estado = estado;
    }

    public String getLogradouro() { return logradouro; }
    public void setLogradouro(String v) { this.logradouro = v; }
    public String getNumero() { return numero; }
    public void setNumero(String v) { this.numero = v; }
    public String getCep() { return cep; }
    public void setCep(String v) { this.cep = v; }
    public String getBairro() { return bairro; }
    public void setBairro(String v) { this.bairro = v; }
    public String getComplemento() { return complemento; }
    public void setComplemento(String v) { this.complemento = v; }
    public String getCidade() { return cidade; }
    public void setCidade(String v) { this.cidade = v; }
    public String getEstado() { return estado; }
    public void setEstado(String v) { this.estado = v; }
}
