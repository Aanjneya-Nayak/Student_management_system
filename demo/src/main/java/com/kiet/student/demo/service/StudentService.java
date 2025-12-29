package com.kiet.student.demo.service;

import com.kiet.student.demo.model.Student;
import com.kiet.student.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student updateStudent(Long id, Student student) {
        Student existing = repository.findById(id).orElseThrow();
        existing.setName(student.getName());
        existing.setCourse(student.getCourse());
        return repository.save(existing);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public List<Student> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

}