package com.hotel.dto;

import com.hotel.model.Endereco;
import com.hotel.model.Hospede;
import java.time.LocalDate;

public class HospedeDTO {
    private Long id;
    private String nome;
    private String cpf;
    private LocalDate dataNascimento;
    private String email;
    private String telefone;
    private boolean ativo;
    // Endereço (flat)
    private String logradouro;
    private String numero;
    private String cep;
    private String bairro;
    private String complemento;
    private String cidade;
    private String estado;

    public HospedeDTO() {}

    public static HospedeDTO fromEntity(Hospede h) {
        HospedeDTO dto = new HospedeDTO();
        dto.id = h.getId();
        dto.nome = h.getNome();
        dto.cpf = h.getCpf();
        dto.dataNascimento = h.getDataNascimento();
        dto.email = h.getEmail();
        dto.telefone = h.getTelefone();
        dto.ativo = h.isAtivo();
        if (h.getEndereco() != null) {
            dto.logradouro = h.getEndereco().getLogradouro();
            dto.numero = h.getEndereco().getNumero();
            dto.cep = h.getEndereco().getCep();
            dto.bairro = h.getEndereco().getBairro();
            dto.complemento = h.getEndereco().getComplemento();
            dto.cidade = h.getEndereco().getCidade();
            dto.estado = h.getEndereco().getEstado();
        }
        return dto;
    }

    /** Cascata Fronteira-Criadora: Endereco -> Hospede */
    public Hospede toEntity() {
        Endereco end = new Endereco(logradouro, numero, cep, bairro, complemento, cidade, estado);
        Hospede h = new Hospede(nome, cpf, dataNascimento, email, telefone, end);
        h.setId(this.id);
        if (this.id != null) {
            h.setAtivo(this.ativo);
        }
        return h;
    }

    // Getters/Setters
    public Long getId() { return id; }
    public void setId(Long v) { this.id = v; }
    public String getNome() { return nome; }
    public void setNome(String v) { this.nome = v; }
    public String getCpf() { return cpf; }
    public void setCpf(String v) { this.cpf = v; }
    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate v) { this.dataNascimento = v; }
    public String getEmail() { return email; }
    public void setEmail(String v) { this.email = v; }
    public String getTelefone() { return telefone; }
    public void setTelefone(String v) { this.telefone = v; }
    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean v) { this.ativo = v; }
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
