package com.saloria.repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.saloria.model.User;
import jakarta.persistence.LockModeType;

public interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByEnterpriseIdAndArchivedFalse(Long enterpriseId);

  List<User> findByEnterpriseIdAndRoleAndArchivedFalse(Long enterpriseId, com.saloria.model.Role role);

  Optional<User> findByEmail(String email);

  Optional<User> findByEmailAndArchivedFalse(String email);

  Optional<User> findByIdAndArchivedFalse(Long id);

  Optional<User> findByIdAndEnterpriseIdAndArchivedFalse(Long id, Long enterpriseId);

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("select u from User u where u.id = :id")
  Optional<User> findByIdForUpdate(@Param("id") Long id);
}
