import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Servicio para manejar localStorage de forma segura durante SSR
 * Automáticamente verifica si está en el navegador antes de acceder a localStorage
 */
@Injectable({
  providedIn: 'root'
})
export class SafeLocalStorageService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Obtiene un elemento de localStorage de forma segura
   * @param key La clave del elemento
   * @returns El valor del elemento o null si no existe o no está en el navegador
   */
  getItem(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn(`Error al leer localStorage[${key}]:`, error);
      return null;
    }
  }

  /**
   * Guarda un elemento en localStorage de forma segura
   * @param key La clave del elemento
   * @param value El valor a guardar
   * @returns true si se guardó exitosamente, false en caso contrario
   */
  setItem(key: string, value: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Error al guardar localStorage[${key}]:`, error);
      return false;
    }
  }

  /**
   * Elimina un elemento de localStorage de forma segura
   * @param key La clave del elemento a eliminar
   * @returns true si se eliminó exitosamente, false en caso contrario
   */
  removeItem(key: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Error al eliminar localStorage[${key}]:`, error);
      return false;
    }
  }

  /**
   * Limpia todo el localStorage de forma segura
   * @returns true si se limpió exitosamente, false en caso contrario
   */
  clear(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Error al limpiar localStorage:', error);
      return false;
    }
  }

  /**
   * Obtiene un objeto JSON de localStorage de forma segura
   * @param key La clave del elemento
   * @returns El objeto parseado o null si no existe, es inválido o no está en el navegador
   */
  getObject<T = any>(key: string): T | null {
    const item = this.getItem(key);
    if (!item) {
      return null;
    }
    
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Error al parsear JSON localStorage[${key}]:`, error);
      return null;
    }
  }

  /**
   * Guarda un objeto en localStorage como JSON de forma segura
   * @param key La clave del elemento
   * @param object El objeto a guardar
   * @returns true si se guardó exitosamente, false en caso contrario
   */
  setObject(key: string, object: any): boolean {
    try {
      const jsonString = JSON.stringify(object);
      return this.setItem(key, jsonString);
    } catch (error) {
      console.warn(`Error al convertir a JSON localStorage[${key}]:`, error);
      return false;
    }
  }

  /**
   * Verifica si localStorage está disponible
   * @returns true si localStorage está disponible, false en caso contrario
   */
  isAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }
} 