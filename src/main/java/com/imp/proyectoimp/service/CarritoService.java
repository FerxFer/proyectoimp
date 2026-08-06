package com.imp.proyectoimp.service;

import com.imp.proyectoimp.model.Carrito;
import com.imp.proyectoimp.model.ItemCarrito;
import com.imp.proyectoimp.model.Producto;
import com.imp.proyectoimp.repository.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ProductoService productoService;

    public Carrito crearCarrito() {
        return carritoRepository.save(new Carrito());
    }

    public Carrito obtenerCarrito(Long id) {
        return carritoRepository.findById(id).orElse(null);
    }

    public Carrito agregarProducto(Long carritoId, Long productoId, Integer cantidad) {
        Carrito carrito = obtenerCarrito(carritoId);
        Producto producto = productoService.buscarPorId(productoId);

        int cantidadEnCarrito = carrito.getItems().stream()
                .filter(item -> item.getProducto().getId().equals(productoId))
                .mapToInt(ItemCarrito::getCantidad)
                .sum();

        if (cantidadEnCarrito + cantidad > producto.getStock()) {
            throw new RuntimeException("Stock insuficiente. Disponible: " + producto.getStock());
        }

        ItemCarrito item = new ItemCarrito();
        item.setProducto(producto);
        item.setCantidad(cantidad);

        carrito.getItems().add(item);
        return carritoRepository.save(carrito);
    }

    public Carrito eliminarProducto(Long carritoId, Long itemId) {
        Carrito carrito = obtenerCarrito(carritoId);
        carrito.getItems().removeIf(item -> item.getId().equals(itemId));
        return carritoRepository.save(carrito);
    }

    public Carrito actualizarCantidad(Long carritoId, Long itemId, Integer nuevaCantidad) {
        Carrito carrito = obtenerCarrito(carritoId);
        carrito.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .ifPresent(item -> {
                    if (nuevaCantidad > item.getProducto().getStock()) {
                        throw new RuntimeException("Stock insuficiente. Disponible: " + item.getProducto().getStock());
                    }
                    item.setCantidad(nuevaCantidad);
                });
        return carritoRepository.save(carrito);
    }
}