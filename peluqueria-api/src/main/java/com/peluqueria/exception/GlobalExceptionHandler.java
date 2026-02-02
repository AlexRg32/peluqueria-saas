package com.peluqueria.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<Map<String, String>> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException exc) {
    Map<String, String> body = new HashMap<>();
    body.put("message", "El archivo es demasiado grande. El límite es de 5MB.");
    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(body);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleResourceNotFoundException(ResourceNotFoundException exc) {
    Map<String, String> body = new HashMap<>();
    body.put("message", exc.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(body);
  }

  @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
  public ResponseEntity<Map<String, String>> handleDataIntegrityViolationException(
      org.springframework.dao.DataIntegrityViolationException exc) {
    Map<String, String> body = new HashMap<>();
    body.put("message", "No se puede eliminar este recurso porque está siendo utilizado por otros registros.");
    return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, String>> handleGeneralException(Exception exc) {
    Map<String, String> body = new HashMap<>();
    body.put("message", exc.getMessage() != null ? exc.getMessage() : "Ha ocurrido un error inesperado.");
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
  }
}
