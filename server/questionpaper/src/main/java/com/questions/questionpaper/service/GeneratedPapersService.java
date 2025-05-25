package com.questions.questionpaper.service;

import java.util.List;

import com.questions.questionpaper.dto.GeneratedPapersDTO;

public interface GeneratedPapersService{

  String addGeneratedPapers(GeneratedPapersDTO generatedPapersDTO);

  List<GeneratedPapersDTO> getGeneratedPapers();

}
