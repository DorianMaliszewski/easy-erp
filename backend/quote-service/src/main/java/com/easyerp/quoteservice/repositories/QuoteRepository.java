package com.easyerp.quoteservice.repositories;

import com.easyerp.quoteservice.domains.Quote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
}
