package com.backend.usersTables.user;

import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String e);

    boolean existsByRole(Role role);
}
