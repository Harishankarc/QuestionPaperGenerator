package com.questions.questionpaper.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Question {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String questionText;

  @Column(nullable=false)
  private String subject;

  @Column(nullable=false)
  private String topic;

  @Column(nullable=false)
  private String difficultyLevel;

  @Column(nullable=false)
  private int marks;
  public Question() {}
  public Question(String questionText,String subject,String topic,String difficultyLevel, int marks){
    this.questionText = questionText;
    this.subject = subject;
    this.topic = topic;
    this.difficultyLevel = difficultyLevel;
    this.marks = marks;
  }
  public Long showId(){
    return id;
  }
  public void getQuestionText(String question_text){
    this.questionText = question_text;
  }
  public String showQuestionText(){
    return questionText;
  }

  public void getSubject(String subject){
    this.subject = subject;
  }
  public String showSubject(){
    return subject;
  }

  public void getTopic(String topic){
    this.topic = topic;
  }
  public String showTopic(){
    return topic;
  }

  public void getDifficultyLevel(String difficulty_level){
    this.difficultyLevel = difficulty_level;
  }
  public String showDifficultyLevel(){
    return difficultyLevel;
  }

  public void getMarks(int marks){
    this.marks = marks;
  }
  public int showMarks(){
    return marks;
  }
}
