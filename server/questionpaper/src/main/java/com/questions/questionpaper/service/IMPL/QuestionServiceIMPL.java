package com.questions.questionpaper.service.IMPL;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.questions.questionpaper.dto.QuestionUpdateDTO;
import com.questions.questionpaper.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.questions.questionpaper.dto.QuestionDTO;
import com.questions.questionpaper.dto.QuestionSaveDTO;
import com.questions.questionpaper.entity.Question;
import com.questions.questionpaper.repo.QuestionRepo;
import com.questions.questionpaper.service.QuestionService;

@Service
public class QuestionServiceIMPL implements QuestionService{

  @Autowired
  private QuestionRepo questionRepository;

  @Override
  public String addQuestion(QuestionSaveDTO questionSaveDTO) {
    Question question = new Question(
      questionSaveDTO.getQuestionText(),
      questionSaveDTO.getSubject(),
      questionSaveDTO.getTopic(),
      questionSaveDTO.getDifficultyLevel(),
      questionSaveDTO.getMarks()
    );
    questionRepository.save(question);
    return "New Question has been added!";
  }

  @Override
  public List<QuestionDTO> getAllQuestions() {
    List<Question> questions = questionRepository.findAll();
    List<QuestionDTO> questionDTOList = new ArrayList<>();
    for(Question question : questions) {
      QuestionDTO questionDTO = new QuestionDTO(
        question.showId(),
        question.showQuestionText(),
        question.showSubject(),
        question.showTopic(),
        question.showDifficultyLevel(),
        question.showMarks()
      );
      questionDTOList.add(questionDTO);
    }
    return questionDTOList;
  }

  @Override
  public String removeQuestion(String id){
    questionRepository.deleteById(Long.valueOf(id));
    return "removed data with id: "+id;
  }

  @Override
  public String updateQuestion(QuestionUpdateDTO questionUpdateDTO) {
    Optional<Question> questionOpt = questionRepository.findById(questionUpdateDTO.getId());
    if(questionOpt.isPresent()){
      Question question = questionOpt.get();

      question.getQuestionText(questionUpdateDTO.getQuestionText());
      question.getSubject(questionUpdateDTO.getSubject());
      question.getTopic(questionUpdateDTO.getTopic());
      question.getDifficultyLevel(questionUpdateDTO.getDifficultyLevel());
      question.getMarks(questionUpdateDTO.getMarks());

      questionRepository.save(question);
      return "Question has been updated";
    }else{
      return "No such record exist!";
    }

  }

}
