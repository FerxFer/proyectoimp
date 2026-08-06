package com.imp.proyectoimp.controller;

import com.imp.proyectoimp.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/webhook")
public class WebhookController {

    @Autowired
    private PagoService pagoService;

    @PostMapping("/mercadopago")
    public String recibirNotificacion(@RequestBody Map<String, Object> payload) {
        System.out.println("Payload recibido: " + payload);

        String type = (String) payload.get("type");

        if ("payment".equals(type)) {
            Map<String, Object> data = (Map<String, Object>) payload.get("data");
            if (data != null) {
                String paymentId = String.valueOf(data.get("id"));
                try {
                    pagoService.procesarPago(paymentId);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        return "OK";
    }
}