package com.imp.proyectoimp.controller;

import com.imp.proyectoimp.model.Carrito;
import com.imp.proyectoimp.service.CarritoService;
import com.imp.proyectoimp.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @Autowired
    private CarritoService carritoService;

    @PostMapping("/{carritoId}")
    public Map<String, String> iniciarPago(@PathVariable Long carritoId) throws Exception {
        Carrito carrito = carritoService.obtenerCarrito(carritoId);
        String linkPago = pagoService.crearPreferencia(carrito);
        return Map.of("linkPago", linkPago);
    }
}