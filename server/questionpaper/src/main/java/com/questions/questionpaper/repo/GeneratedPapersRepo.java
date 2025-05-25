package com.questions.questionpaper.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.questions.questionpaper.entity.GeneratedPapers;

public interface GeneratedPapersRepo extends JpaRepository<GeneratedPapers,Long>{
  
}
