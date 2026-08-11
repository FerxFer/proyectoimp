package com.imp.proyectoimp.controller;

import com.imp.proyectoimp.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Map;

@RestController
@RequestMapping("/api/webhook")
public class WebhookController {

    @Autowired
    private PagoService pagoService;

    @Value("${mercadopago.webhook-secret}")
    private String webhookSecret;

    @PostMapping("/mercadopago")
    public String recibirNotificacion(
            @RequestBody Map<String, Object> payload,
            @RequestHeader(value = "x-signature", required = false) String xSignature,
            @RequestHeader(value = "x-request-id", required = false) String xRequestId,
            @RequestParam(value = "data.id", required = false) String dataIdParam
    ) {
        String type = (String) payload.get("type");

        if ("payment".equals(type)) {
            if (!firmaValida(xSignature, xRequestId, dataIdParam)) {
                System.out.println("⚠️ Firma inválida, notificación rechazada.");
                return "OK";
            }

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

    private boolean firmaValida(String xSignature, String xRequestId, String dataId) {
        System.out.println("DEBUG -> xSignature: [" + xSignature + "] | xRequestId: [" + xRequestId + "] | dataId: [" + dataId + "]");
        if (xSignature == null || xRequestId == null || dataId == null) {
            return false;
        }

        String ts = null;
        String hashRecibido = null;
        for (String parte : xSignature.split(",")) {
            String[] kv = parte.split("=", 2);
            if (kv.length == 2) {
                if (kv[0].trim().equals("ts")) ts = kv[1].trim();
                if (kv[0].trim().equals("v1")) hashRecibido = kv[1].trim();
            }
        }

        if (ts == null || hashRecibido == null) return false;

        String manifest = "id:" + dataId + ";request-id:" + xRequestId + ";ts:" + ts + ";";

        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(webhookSecret.trim().getBytes(), "HmacSHA256"));
            byte[] hashCalculado = mac.doFinal(manifest.getBytes());

            StringBuilder hex = new StringBuilder();
            for (byte b : hashCalculado) {
                hex.append(String.format("%02x", b));
            }
            System.out.println("DEBUG -> manifest: [" + manifest + "] | hashCalculado: " + hex.toString() + " | hashRecibido: " + hashRecibido);

            return hex.toString().equals(hashRecibido);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}