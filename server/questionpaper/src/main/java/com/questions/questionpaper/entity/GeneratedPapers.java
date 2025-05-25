package com.questions.questionpaper.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class GeneratedPapers {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY) 
  private Long id;

  @Column()
  private String generatedBy;

  @Column()
  private Date generatedDate;

  @Column()
  private int totalMarks;
  public GeneratedPapers(){}
  public GeneratedPapers(String generatedBy, Date generatedDate,int totalMarks){
    this.generatedBy = generatedBy;
    this.generatedDate = generatedDate;
    this.totalMarks = totalMarks;
  }

  public Long getId(){
    return id;
  }

  public void getGeneratedDate(Date generated_date){
    this.generatedDate = generatedDate;
  }
  public Date showGeneratedDate(){
    return generatedDate;
  }

  public void getGeneratedBy(String generated_by){
    this.generatedBy = generatedBy;
  }
  public String showGeneratedBy(){
    return generatedBy;
  }

  public void getTotalMarks(int total_marks){
    this.totalMarks = totalMarks;
  }
  public int showTotalMarks(){
    return totalMarks;
  }

}
