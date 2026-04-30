package com.urbanoplus.auth.service;

import com.urbanoplus.auth.dto.*;
import com.urbanoplus.auth.model.*;
import com.urbanoplus.auth.repository.UserRepository;
import com.urbanoplus.auth.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repo;
    private final JwtUtil jwt;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void register(UserRequest req) {
        User u = new User();
        u.setName(req.getName());
        u.setEmail(req.getEmail());
        u.setPassword(encoder.encode(req.getPassword()));
        u.setRole(Role.USER);
        repo.save(u);
    }

    public TokenResponse login(LoginRequest req) {
        User u = repo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(req.getPassword(), u.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return new TokenResponse(jwt.generateToken(u.getEmail(), u.getRole().name()));
    }

    public User me(String email) {
        return repo.findByEmail(email).orElseThrow();
    }
}
