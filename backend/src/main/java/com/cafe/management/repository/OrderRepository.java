package com.cafe.management.repository;

import com.cafe.management.model.Order;
import com.cafe.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(Order.OrderStatus status);
    List<Order> findByCustomer(User customer);
    List<Order> findByWaiter(User waiter);
}
