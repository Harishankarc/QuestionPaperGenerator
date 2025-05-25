package com.questions.questionpaper.service.IMPL;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.questions.questionpaper.dto.GeneratedPapersDTO;
import com.questions.questionpaper.entity.GeneratedPapers;
import com.questions.questionpaper.repo.GeneratedPapersRepo;
import com.questions.questionpaper.service.GeneratedPapersService;

@Service
public class GeneratedPapersServiceIMPL implements GeneratedPapersService {

  @Autowired
  private GeneratedPapersRepo generatedPapersRepo;

  @Override
  public String addGeneratedPapers(GeneratedPapersDTO generatedPapersDTO) {
    GeneratedPapers generatedPapers = new GeneratedPapers(
      generatedPapersDTO.getGeneratedBy(),
      new Date(),
      generatedPapersDTO.getTotalMarks()
    );
    generatedPapersRepo.save(generatedPapers);
    return "details added successfully!";
  }

  @Override
  public List<GeneratedPapersDTO> getGeneratedPapers() {
    List<GeneratedPapers> generatedPapersList = generatedPapersRepo.findAll();
    List<GeneratedPapersDTO> generatedPapersDTOList = new ArrayList<>();
    for(GeneratedPapers generatedPapers : generatedPapersList) {
      GeneratedPapersDTO generatedPapersDTO = new GeneratedPapersDTO(
        generatedPapers.getId(),
        generatedPapers.showGeneratedBy(),
        generatedPapers.showGeneratedDate(),
        generatedPapers.showTotalMarks()
      );
      generatedPapersDTOList.add(generatedPapersDTO);
    }
    return generatedPapersDTOList;
  }

}
