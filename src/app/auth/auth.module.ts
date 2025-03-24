import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    // Si no es un componente standalone, decláralo aquí
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Si es un componente standalone, impórtalo aquí
    RegisterComponent
  ],
  exports: [
    // Exporta los componentes que necesites usar fuera de este módulo
  ]
})
export class AuthModule { }