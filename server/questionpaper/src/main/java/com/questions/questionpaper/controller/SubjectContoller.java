package com.questions.questionpaper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.questions.questionpaper.dto.SubjectsDTO;
import com.questions.questionpaper.service.SubjectService;



@RestController
@CrossOrigin
@RequestMapping("api/v1/subject")
public class SubjectContoller {
  @Autowired
  private SubjectService subjectService;

  @PostMapping("/addSubject")

  public String addSubject(@RequestBody SubjectsDTO subjectsDTO) {
    String returnMsg = subjectService.addSubject(subjectsDTO);
    return returnMsg;
  }

  @GetMapping("/getAllSubject")
  //method to get all subjects
  public List<SubjectsDTO> getAllSubject() {
    List<SubjectsDTO> subjects =  subjectService.getAllSubject();
    return subjects;
  }
}
