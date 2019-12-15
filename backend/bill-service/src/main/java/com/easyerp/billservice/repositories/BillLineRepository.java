package com.easyerp.billservice.repositories;

import com.easyerp.billservice.domains.BillLine;
import com.easyerp.billservice.domains.BillLineCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillLineRepository extends JpaRepository<BillLine, BillLineCompositeKey> {
}
