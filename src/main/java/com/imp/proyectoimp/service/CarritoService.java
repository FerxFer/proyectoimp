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

        ItemCarrito item = new ItemCarrito();
        item.setProducto(producto);
        item.setCantidad(cantidad);

        carrito.getItems().add(item);
        return carritoRepository.save(carrito);
    }
}