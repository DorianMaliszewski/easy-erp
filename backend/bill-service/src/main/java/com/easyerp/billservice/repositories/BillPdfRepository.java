package com.easyerp.billservice.repositories;

import com.easyerp.billservice.domains.BillPdf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillPdfRepository extends JpaRepository<BillPdf, Long> {
    Optional<BillPdf> findFirstByBill_IdOrderByIdDesc(Long id);
}
