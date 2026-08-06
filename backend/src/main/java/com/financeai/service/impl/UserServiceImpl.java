package com.financeai.service.impl;

import com.financeai.entity.User;
import com.financeai.repository.UserRepository;
import com.financeai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateProfile(String id, User updatedUser) {

        User user = getUserById(id);

        user.setFullName(updatedUser.getFullName());

        if (updatedUser.getEmail() != null) {
            user.setEmail(updatedUser.getEmail());
        }

        return userRepository.save(user);
    }
}