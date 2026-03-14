package com.cafe.management.repository;

import com.cafe.management.model.CafeTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends JpaRepository<CafeTable, Long> {
    Optional<CafeTable> findByTableNumber(String tableNumber);
    List<CafeTable> findByStatus(CafeTable.TableStatus status);
}
