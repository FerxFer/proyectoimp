package com.imp.proyectoimp.controller;

import com.imp.proyectoimp.model.Carrito;
import com.imp.proyectoimp.service.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carritos")
public class CarritoController {

    @Autowired
    private CarritoService carritoService;

    @PostMapping
    public Carrito crear() {
        return carritoService.crearCarrito();
    }

    @GetMapping("/{id}")
    public Carrito obtener(@PathVariable Long id) {
        return carritoService.obtenerCarrito(id);
    }

    @PostMapping("/{carritoId}/items")
    public Carrito agregarProducto(@PathVariable Long carritoId,
                                   @RequestParam Long productoId,
                                   @RequestParam Integer cantidad) {
        return carritoService.agregarProducto(carritoId, productoId, cantidad);
    }

    @DeleteMapping("/{carritoId}/items/{itemId}")
    public Carrito eliminarProducto(@PathVariable Long carritoId, @PathVariable Long itemId) {
        return carritoService.eliminarProducto(carritoId, itemId);
    }

    @PutMapping("/{carritoId}/items/{itemId}")
    public Carrito actualizarCantidad(@PathVariable Long carritoId,
                                      @PathVariable Long itemId,
                                      @RequestParam Integer cantidad) {
        return carritoService.actualizarCantidad(carritoId, itemId, cantidad);
    }
}