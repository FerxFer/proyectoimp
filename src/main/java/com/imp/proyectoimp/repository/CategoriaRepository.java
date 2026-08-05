package com.imp.proyectoimp.repository;

import com.imp.proyectoimp.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}