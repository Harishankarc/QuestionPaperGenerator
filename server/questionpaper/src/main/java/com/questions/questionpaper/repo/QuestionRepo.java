package com.questions.questionpaper.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.questions.questionpaper.entity.Question;

public interface QuestionRepo extends JpaRepository<Question, Long>{
  
}
