package com.imp.proyectoimp.service;

import com.imp.proyectoimp.model.Carrito;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.*;
import com.mercadopago.resources.preference.Preference;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PagoService {

    @Value("${mercadopago.access-token}")
    private String accessToken;

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

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .build();

        PreferenceClient client = new PreferenceClient();
        Preference preference = client.create(preferenceRequest);

        return preference.getInitPoint();
    }
}