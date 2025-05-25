package com.questions.questionpaper.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.questions.questionpaper.entity.Subjects;

public interface SubjectRepo extends JpaRepository<Subjects, Long>{

}
