package com.questions.questionpaper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.questions.questionpaper.dto.LoginDTO;
import com.questions.questionpaper.dto.UserDTO;
import com.questions.questionpaper.dto.UserSaveDTO;
import com.questions.questionpaper.service.UserService;



@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")

public class UserController {

  @Autowired
  private UserService userService;

  //method to save student
  @PostMapping(path="/save")
  public String saveUser(@RequestBody UserSaveDTO userSaveDTO){
    String id = userService.addUser(userSaveDTO);
    return id;
  }


  @GetMapping(path="/getAllUser")
  //method to get the user
  public List<UserDTO> getAllUser(){
    List<UserDTO> allUser = userService.getAllUsers();
    return allUser;
  }

  @PostMapping(path="/login")
  public ResponseEntity<Object> ifUserExist(@RequestBody LoginDTO loginDTO){
    UserDTO user = userService.ifUserExist(loginDTO);
    if (user != null) {
      return ResponseEntity.ok(user);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }
}
