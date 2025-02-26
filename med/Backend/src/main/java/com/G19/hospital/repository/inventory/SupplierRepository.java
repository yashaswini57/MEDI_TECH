package com.G19.hospital.repository.inventory;

import com.G19.hospital.model.inventory.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findById(Long supplierId);
    boolean existsById(Long supplierId);
}
