package com.questions.questionpaper.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Subjects {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String name;

  @Column(nullable=false)
  private String description;

  public Subjects() {}

  public Subjects(String name,String description){
    this.name = name;
    this.description = description;
  }

  public Long showId(){
    return id;
  }

  public void getName(String name){
    this.name = name;
  }
  public String showName(){
    return name;
  }

  public void getDescription(String description){
    this.description = description;
  }
  public String showDescription(){
    return description;
  }
}
