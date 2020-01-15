package com.easyerp.billservice.repositories;

import com.easyerp.billservice.domains.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByClientId(Long clientId);
}
