package com.questions.questionpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class QuestionDTO {
  private Long id;

  private String questionText;

  private String subject;

  private String topic;

  private String difficultyLevel;

  private int marks;
}
