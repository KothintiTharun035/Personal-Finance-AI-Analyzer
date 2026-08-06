package com.financeai.service;

import com.financeai.entity.User;

public interface UserService {

    User getUserById(String id);

    User getUserByEmail(String email);

    User updateProfile(String id, User updatedUser);

}