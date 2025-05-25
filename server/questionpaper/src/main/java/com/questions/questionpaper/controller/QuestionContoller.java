package com.questions.questionpaper.controller;

import java.util.List;

import com.questions.questionpaper.dto.QuestionUpdateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.questions.questionpaper.dto.QuestionDTO;
import com.questions.questionpaper.dto.QuestionSaveDTO;
import com.questions.questionpaper.service.QuestionService;

@RestController
@CrossOrigin
@RequestMapping("api/v1/questions")
public class QuestionContoller {

  @Autowired
  private QuestionService questionService;

  @RequestMapping("/save")
  public String saveQuestions(@RequestBody QuestionSaveDTO questionSaveDTO){
    String returnMsg = questionService.addQuestion(questionSaveDTO);
    return returnMsg;
  }

  @RequestMapping("/getAllQuestions")
  public List<QuestionDTO> getAllQuestions(){
    List<QuestionDTO> allQuestions = questionService.getAllQuestions();
    return allQuestions;
  }

  @DeleteMapping("/deleteQuestion/{id}")
  public ResponseEntity<String> removeQuestions(@PathVariable String id){
    String returnMsg = questionService.removeQuestion(id);
    return ResponseEntity.ok(returnMsg);
  }

  @PutMapping("/updateQuestion")
  public ResponseEntity<String> updateQuestions(@RequestBody QuestionUpdateDTO questionUpdateDTO){
    String returnMsg = questionService.updateQuestion(questionUpdateDTO);
    return  ResponseEntity.ok(returnMsg);
  }

}
