package com.shastaworks.ffxiworkshop.repository;

import java.util.Optional;

import com.shastaworks.ffxiworkshop.models.ERole;
import com.shastaworks.ffxiworkshop.models.Role;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}