package com.questions.questionpaper.service.IMPL;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.questions.questionpaper.dto.LoginDTO;
import com.questions.questionpaper.dto.UserDTO;
import com.questions.questionpaper.dto.UserSaveDTO;
import com.questions.questionpaper.entity.User;
import com.questions.questionpaper.repo.UserRepo;
import com.questions.questionpaper.service.UserService;

@Service
public class UserServiceIMPL implements UserService{

  @Autowired
  private UserRepo userRepo;

  @Override
  public String addUser(UserSaveDTO userSaveDTO) {

    User user = new User(
      userSaveDTO.getUsername(),
      userSaveDTO.getPassword(),
      userSaveDTO.getRole()
    );
    userRepo.save(user);
    return user.getUsername();
  }

  @Override
  public List<UserDTO> getAllUsers() {

    List<User> getUsers = userRepo.findAll();
    List<UserDTO> usersDTOList = new ArrayList<>();

    for(User user : getUsers){
      UserDTO userDTO = new UserDTO(
        user.getId(),
        user.getUsername(),
        user.getPassword(),
        user.getRole()
      );
      usersDTOList.add(userDTO);
    }

    return usersDTOList;
  }

  @Override
  public UserDTO ifUserExist(LoginDTO loginDTO) {
    List<User> user = userRepo.findAll();
    for(User u : user){
      if(u.getUsername().equals(loginDTO.getEmail()) && u.getPassword().equals(loginDTO.getPassword())){
        UserDTO userDTO = new UserDTO(
          u.getId(),
          u.getUsername(),
          null,
          u.getRole()
        );
        return userDTO;
      }
    }
    return null;
  }


}
