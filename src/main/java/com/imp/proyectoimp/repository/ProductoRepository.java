package com.imp.proyectoimp.repository;

import com.imp.proyectoimp.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}