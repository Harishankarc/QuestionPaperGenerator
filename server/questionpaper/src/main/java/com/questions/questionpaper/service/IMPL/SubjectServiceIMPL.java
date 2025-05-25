package com.questions.questionpaper.service.IMPL;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.questions.questionpaper.dto.SubjectsDTO;
import com.questions.questionpaper.entity.Subjects;
import com.questions.questionpaper.repo.SubjectRepo;
import com.questions.questionpaper.service.SubjectService;

@Service
public class SubjectServiceIMPL implements SubjectService {

    @Autowired
    private SubjectRepo subjectRepo;

    @Override
    public List<SubjectsDTO> getAllSubject() {
        List<Subjects> subject = subjectRepo.findAll();
        List<SubjectsDTO> subjectDTOList = new ArrayList<>();
        for (Subjects sub : subject) {
            SubjectsDTO subjectDTO = new SubjectsDTO(
                    sub.showId(),
                    sub.showName(),
                    sub.showDescription()
            );
            subjectDTOList.add(subjectDTO);
        }
        return subjectDTOList;
    }

    @Override
    public String addSubject(SubjectsDTO subjectsDTO) {
        Subjects subject = new Subjects(
                subjectsDTO.getName(),
                subjectsDTO.getDescription()
        );
        subjectRepo.save(subject);
        return "Subject added successfully";
    }

}
