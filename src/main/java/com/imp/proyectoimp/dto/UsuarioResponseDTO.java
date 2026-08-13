package com.imp.proyectoimp.dto;

import com.imp.proyectoimp.model.Rol;
import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String email;
    private Rol rol;
}