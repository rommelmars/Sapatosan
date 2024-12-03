package com.backend.sapatosan.repository;

import com.backend.sapatosan.entity.ShoesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ShoesRepository extends JpaRepository<ShoesEntity, Long> {

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM cart_shoes WHERE productid = ?1", nativeQuery = true)
    void deleteReferencesInCartShoes(Long productId);
}
