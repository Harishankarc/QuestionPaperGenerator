package com.questions.questionpaper.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.questions.questionpaper.entity.User;

public interface UserRepo extends JpaRepository<User, Long>{
  
}
