package com.questions.questionpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserUpdateDTO {

    private Long id;
    private String username;
    private String password;
    private String role;
}
