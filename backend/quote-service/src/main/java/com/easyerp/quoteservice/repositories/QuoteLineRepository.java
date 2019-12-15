package com.easyerp.quoteservice.repositories;

import com.easyerp.quoteservice.domains.QuoteLine;
import com.easyerp.quoteservice.domains.QuoteLineCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuoteLineRepository extends JpaRepository<QuoteLine, QuoteLineCompositeKey> {
}
