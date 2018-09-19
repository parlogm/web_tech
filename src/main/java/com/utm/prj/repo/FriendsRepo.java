package com.utm.prj.repo;

import com.utm.prj.model.friends.Friends;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface FriendsRepo extends JpaRepository<Friends, Integer> {

    List<Friends> findAll();
    Page<Friends> findAll(Pageable p);
    Boolean existsByName(String name);

}
