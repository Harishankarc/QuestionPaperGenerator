package com.questions.questionpaper.service;

import java.util.List;

import com.questions.questionpaper.dto.QuestionDTO;
import com.questions.questionpaper.dto.QuestionSaveDTO;
import com.questions.questionpaper.dto.QuestionUpdateDTO;
import org.springframework.stereotype.Service;

@Service
public interface QuestionService {

  String addQuestion(QuestionSaveDTO questionSaveDTO);

  List<QuestionDTO> getAllQuestions();

    String removeQuestion(String id);

  String updateQuestion(QuestionUpdateDTO questionUpdateDTO);
}
