import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  submitSuccess = false;
  fileName = '';
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      tema: ['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', [Validators.required, Validators.maxLength(1000)]],
      privacidad: [false, Validators.requiredTrue]
    });
  }

  // Getter para acceder fácilmente a los controles del formulario
  get f() { return this.contactForm.controls; }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileName = file.name;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Detener si el formulario es inválido
    if (this.contactForm.invalid) {
      return;
    }

    // Aquí iría la lógica para enviar el formulario al servidor
    console.log('Formulario enviado', this.contactForm.value);

    // Simular éxito en el envío
    this.submitSuccess = true;

    // Resetear el formulario después de un tiempo
    setTimeout(() => {
      this.resetForm();
    }, 3000);
  }

  resetForm(): void {
    this.submitted = false;
    this.submitSuccess = false;
    this.fileName = '';
    this.selectedFile = null;
    this.contactForm.reset();
  }
}
