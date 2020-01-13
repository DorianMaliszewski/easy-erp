package com.easyerp.quoteservice.repositories;

import com.easyerp.quoteservice.domains.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByClientId(Long id);
}
