package com.imp.proyectoimp.service;

import com.imp.proyectoimp.model.Carrito;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.mercadopago.client.payment.PaymentClient;
import com.mercadopago.resources.payment.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import com.imp.proyectoimp.model.ItemCarrito;
import com.imp.proyectoimp.model.Producto;

import java.util.ArrayList;
import java.util.List;

@Service
public class PagoService {

    @Value("${mercadopago.access-token}")
    private String accessToken;

    @Autowired
    private CarritoService carritoService;

    @Autowired
    private ProductoService productoService;

    public String crearPreferencia(Carrito carrito) throws Exception {
        MercadoPagoConfig.setAccessToken(accessToken);

        List<PreferenceItemRequest> items = new ArrayList<>();

        carrito.getItems().forEach(item -> {
            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(item.getProducto().getNombre())
                    .quantity(item.getCantidad())
                    .unitPrice(java.math.BigDecimal.valueOf(item.getProducto().getPrecio()))
                    .build();
            items.add(itemRequest);
        });

        PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                .success("http://localhost:5173/pago-exitoso")
                .failure("http://localhost:5173/pago-fallido")
                .pending("http://localhost:5173/pago-pendiente")
                .build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .backUrls(backUrls)
                .notificationUrl("https://napkin-likeness-primp.ngrok-free.dev/api/webhook/mercadopago")
                .externalReference(String.valueOf(carrito.getId()))
                //.autoReturn("approved")
                .build();

        PreferenceClient client = new PreferenceClient();
        Preference preference = client.create(preferenceRequest);

        return preference.getInitPoint();
    }

    public boolean procesarPago(String paymentId) throws Exception {
        MercadoPagoConfig.setAccessToken(accessToken);

        PaymentClient client = new PaymentClient();
        Payment payment = client.get(Long.parseLong(paymentId));

        String status = payment.getStatus();
        String carritoIdStr = payment.getExternalReference();
        System.out.println("Estado del pago " + paymentId + ": " + status + " - Carrito: " + carritoIdStr);

        if ("approved".equals(status) && carritoIdStr != null) {
            Long carritoId = Long.parseLong(carritoIdStr);
            Carrito carrito = carritoService.obtenerCarrito(carritoId);

            if (carrito != null) {
                for (ItemCarrito item : carrito.getItems()) {
                    Producto producto = item.getProducto();
                    producto.setStock(producto.getStock() - item.getCantidad());
                    productoService.actualizar(producto.getId(), producto);
                }
            }

            return true;
        }

        return false;
    }
}