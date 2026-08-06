package com.financeai.controller;

import com.financeai.entity.User;
import com.financeai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(
            @PathVariable String id,
            @RequestBody User user) {

        return ResponseEntity.ok(
                userService.updateProfile(id, user)
        );
    }
}