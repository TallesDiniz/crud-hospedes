package com.hotel.controller;

import com.hotel.dto.HospedeDTO;
import com.hotel.fachada.IHospedeFachada;
import com.hotel.model.Hospede;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * Controller (Padrão MVC) — recebe requisição HTTP e DELEGA à Fachada.
 * Não tem lógica de negócio.
 */
@RestController
@RequestMapping("/api/hospedes")
@CrossOrigin(origins = "*")
public class HospedeController {

    private final IHospedeFachada fachada;

    public HospedeController(IHospedeFachada fachada) {
        this.fachada = fachada;
    }

    /** RF0101 — Cadastrar hóspede */
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody HospedeDTO dto) {
        try {
            Hospede hospede = dto.toEntity(); // Cascata: Endereco -> Hospede
            Hospede salvo = fachada.cadastrar(hospede);
            return ResponseEntity.status(HttpStatus.CREATED).body(HospedeDTO.fromEntity(salvo));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /** RF0102 — Alterar cadastro de hóspede */
    @PutMapping("/{id}")
    public ResponseEntity<?> alterar(@PathVariable Long id, @RequestBody HospedeDTO dto) {
        try {
            dto.setId(id);
            Hospede hospede = dto.toEntity();
            Hospede atualizado = fachada.alterar(hospede);
            return ResponseEntity.ok(HospedeDTO.fromEntity(atualizado));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /** RF0103 — Inativar hóspede */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> inativar(@PathVariable Long id) {
        try {
            fachada.inativar(id);
            return ResponseEntity.ok(Map.of("mensagem", "Hóspede inativado com sucesso."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /** RF0104 — Consultar hóspedes */
    @GetMapping
    public ResponseEntity<?> consultar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String cpf) {
        List<Hospede> lista = fachada.consultar(nome, cpf);
        List<HospedeDTO> dtos = lista.stream().map(HospedeDTO::fromEntity).toList();
        return ResponseEntity.ok(dtos);
    }
}
