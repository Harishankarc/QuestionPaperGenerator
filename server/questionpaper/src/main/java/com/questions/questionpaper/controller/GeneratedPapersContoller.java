package com.questions.questionpaper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.questions.questionpaper.dto.GeneratedPapersDTO;
import com.questions.questionpaper.service.GeneratedPapersService;


@RestController
@CrossOrigin
@RequestMapping("api/v1/generatedPapers")
public class GeneratedPapersContoller {

  @Autowired
  private GeneratedPapersService generatedPapersService;

    @PostMapping("/save")
  public String addGeneratedPapers(@RequestBody GeneratedPapersDTO generatedPapersDTO) {
    String returnMsg =  generatedPapersService.addGeneratedPapers(generatedPapersDTO);
    return returnMsg;
  }

  @GetMapping("/getAllPapers")
  public List<GeneratedPapersDTO> getGeneratedPapers(){
    List<GeneratedPapersDTO> generatedPapers = generatedPapersService.getGeneratedPapers();
    return generatedPapers;
  }


}
