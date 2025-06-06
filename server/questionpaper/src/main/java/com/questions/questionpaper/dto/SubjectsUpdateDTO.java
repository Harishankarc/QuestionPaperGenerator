package com.questions.questionpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class SubjectsUpdateDTO {
    private Long id;

    private String name;

    private String description;
}
