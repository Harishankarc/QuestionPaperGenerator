package com.questions.questionpaper.service;

import java.util.List;

import com.questions.questionpaper.dto.SubjectsDTO;

public interface SubjectService {

  List<SubjectsDTO> getAllSubject();

  String addSubject(SubjectsDTO subjectsDTO);

}
