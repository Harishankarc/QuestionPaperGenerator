package com.questions.questionpaper.service;

import java.util.List;

import com.questions.questionpaper.dto.LoginDTO;
import com.questions.questionpaper.dto.UserDTO;
import com.questions.questionpaper.dto.UserSaveDTO;

public interface UserService {
  String addUser(UserSaveDTO userSaveDTO);
  List<UserDTO> getAllUsers();
  UserDTO ifUserExist(LoginDTO loginDTO);
}
