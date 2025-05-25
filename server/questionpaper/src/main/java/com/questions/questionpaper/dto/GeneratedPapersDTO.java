package com.questions.questionpaper.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class GeneratedPapersDTO {
  private Long id;

  private String generatedBy;

    private Date generatedDate;

  private int totalMarks;
}
