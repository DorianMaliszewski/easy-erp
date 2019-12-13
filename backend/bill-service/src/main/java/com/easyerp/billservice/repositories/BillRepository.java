package com.easyerp.billservice.repositories;

import com.easyerp.billservice.domains.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Long> {
}
