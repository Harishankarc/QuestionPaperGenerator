package com.questions.questionpaper.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserSaveDTO {
    private String username;
    private String password;
    private String role;
}
