package com.backend.sapatosan.repository;

import com.backend.sapatosan.entity.ShoesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoesRepository extends JpaRepository<ShoesEntity, Long> {
}
