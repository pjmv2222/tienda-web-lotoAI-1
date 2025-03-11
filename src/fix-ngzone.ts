import { NgZone } from '@angular/core';

export function createNgZone(): NgZone {
  return new NgZone({
    enableLongStackTrace: false,
    shouldCoalesceEventChangeDetection: false
  });
}
