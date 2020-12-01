package com.easyerp.quoteservice.repositories;

import com.easyerp.quoteservice.domains.QuotePdf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QuotePDFRepository extends JpaRepository<QuotePdf, Long> {
    Optional<QuotePdf> findFirstByQuote_IdOrderByIdDesc(Long id);
}
