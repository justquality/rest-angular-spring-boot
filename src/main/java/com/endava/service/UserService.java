package com.endava.service;

import com.endava.model.User;

import java.util.List;

public interface UserService {
    User save(User user);
    User getOne(Long id);
    void delete(User user);
    void delete(Long id);
    List<User> findAll();
    void deleteAll();
}
