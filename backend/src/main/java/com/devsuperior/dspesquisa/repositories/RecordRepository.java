package com.devsuperior.dspesquisa.repositories;


import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dspesquisa.entities.Record;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

	@Query("SELECT obj FROM Record obj WHERE "
			+ "(coalesce(:min, null) IS NULL OR obj.moment >= :min) AND "
			+ "(coalesce(:max, null) IS NULL OR obj.moment <= :max)")  // JPQL (Linguagem adaptada para o JPA)
	
	// As condições (IS NULL) para retornar todos os dados mesmo quando não for passada nenhuma data
	// Coalesce é para o valor NULL ser aceito no PostgreSQL
	Page<Record> findByMoments(Instant min, Instant max, Pageable pageable);
	// Repository não conhece DTO, ele só conhece entidade
}

