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
      // Si el error es QuotaExceededError, intentar limpiar cache viejo
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn(`[SafeLocalStorage] Quota excedida al guardar ${key}. Limpiando cache...`);
        this.cleanupOldCache();
        
        // Intentar guardar nuevamente después de limpiar
        try {
          localStorage.setItem(key, value);
          console.log(`[SafeLocalStorage] Guardado exitoso después de limpiar cache: ${key}`);
          return true;
        } catch (secondError) {
          console.warn(`[SafeLocalStorage] Error persistente después de limpiar cache para ${key}:`, secondError);
          return false;
        }
      }
      
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

  /**
   * Limpia cache viejo de imágenes de bolas para liberar espacio
   * @private
   */
  private cleanupOldCache(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const keys = Object.keys(localStorage);
      const ballCacheKeys = keys.filter(key => 
        key.startsWith('euromillones_ball_') || 
        key.startsWith('ball-') ||
        key.includes('_ball_')
      );

      // Ordenar por fecha de acceso (los más viejos primero)
      const keysByAge = ballCacheKeys.sort((a, b) => {
        const aTimestamp = this.getCacheTimestamp(a);
        const bTimestamp = this.getCacheTimestamp(b);
        return aTimestamp - bTimestamp;
      });

      // Eliminar hasta el 30% de las entradas más viejas
      const toDelete = Math.ceil(keysByAge.length * 0.3);
      let deleted = 0;

      for (const key of keysByAge) {
        if (deleted >= toDelete) break;
        
        localStorage.removeItem(key);
        deleted++;
      }

      console.log(`[SafeLocalStorage] Cache limpiado: ${deleted} entradas eliminadas de ${ballCacheKeys.length} total`);
    } catch (error) {
      console.warn('[SafeLocalStorage] Error al limpiar cache:', error);
    }
  }

  /**
   * Obtiene el timestamp de cache de una clave (usado para ordenar por antigüedad)
   * @private
   */
  private getCacheTimestamp(key: string): number {
    try {
      const timestampKey = `${key}_timestamp`;
      const timestamp = localStorage.getItem(timestampKey);
      return timestamp ? parseInt(timestamp, 10) : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Actualiza el timestamp de acceso de una clave de cache
   * @private
   */
  private updateCacheTimestamp(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const timestampKey = `${key}_timestamp`;
      localStorage.setItem(timestampKey, Date.now().toString());
    } catch (error) {
      // Ignorar errores de timestamp, no es crítico
    }
  }

  /**
   * Versión mejorada de setItem para cache de imágenes que incluye timestamp
   */
  setImageCache(key: string, value: string): boolean {
    const success = this.setItem(key, value);
    if (success) {
      this.updateCacheTimestamp(key);
    }
    return success;
  }

  /**
   * Versión mejorada de getItem para cache de imágenes que actualiza timestamp
   */
  getImageCache(key: string): string | null {
    const value = this.getItem(key);
    if (value) {
      this.updateCacheTimestamp(key);
    }
    return value;
  }
} 