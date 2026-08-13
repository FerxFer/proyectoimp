package com.imp.proyectoimp.controller;

import com.imp.proyectoimp.dto.LoginRequestDTO;
import com.imp.proyectoimp.dto.RegistroRequestDTO;
import com.imp.proyectoimp.dto.UsuarioResponseDTO;
import com.imp.proyectoimp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/registro")
    public UsuarioResponseDTO registrar(@RequestBody RegistroRequestDTO request) {
        return authService.registrar(request);
    }

    @PostMapping("/login")
    public UsuarioResponseDTO login(@RequestBody LoginRequestDTO request) {
        return authService.login(request);
    }
}