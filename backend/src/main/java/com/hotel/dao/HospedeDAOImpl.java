package com.hotel.dao;

import com.hotel.model.Hospede;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Implementação JPA do DAO. Só persiste — nenhuma lógica de negócio aqui.
 */
@Repository
@Transactional
public class HospedeDAOImpl implements IHospedeDAO {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Hospede salvar(Hospede h) {
        em.persist(h);
        return h;
    }

    @Override
    public Hospede alterar(Hospede h) {
        return em.merge(h);
    }

    @Override
    public Hospede consultarPorId(Long id) {
        return em.find(Hospede.class, id);
    }

    @Override
    public Hospede consultarPorCpf(String cpf) {
        TypedQuery<Hospede> q = em.createQuery(
            "SELECT h FROM Hospede h WHERE h.cpf = :cpf", Hospede.class);
        q.setParameter("cpf", cpf);
        List<Hospede> result = q.getResultList();
        return result.isEmpty() ? null : result.get(0);
    }

    @Override
    public List<Hospede> consultar(String filtroNome, String filtroCpf) {
        StringBuilder jpql = new StringBuilder("SELECT h FROM Hospede h WHERE 1=1");
        if (filtroNome != null && !filtroNome.isBlank())
            jpql.append(" AND LOWER(h.nome) LIKE LOWER(:nome)");
        if (filtroCpf != null && !filtroCpf.isBlank())
            jpql.append(" AND h.cpf LIKE :cpf");
        jpql.append(" ORDER BY h.nome");

        TypedQuery<Hospede> q = em.createQuery(jpql.toString(), Hospede.class);
        if (filtroNome != null && !filtroNome.isBlank())
            q.setParameter("nome", "%" + filtroNome + "%");
        if (filtroCpf != null && !filtroCpf.isBlank())
            q.setParameter("cpf", "%" + filtroCpf + "%");

        return q.getResultList();
    }
}
