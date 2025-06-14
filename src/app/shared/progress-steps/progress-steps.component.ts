import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-steps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress" [style.width]="progressWidth"></div>
      </div>
      <div class="steps-container">
        <div *ngFor="let section of sections; let i = index" 
             class="step-item"
             [class.completed]="currentStep > i"
             [class.active]="currentStep === i">
          <div class="step-number">{{ i + 1 }}</div>
          <div class="step-title">{{ section }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      margin: 2rem 0;
      padding: 0 1rem;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: #e9ecef;
      border-radius: 2px;
      margin-bottom: 1rem;
      position: relative;
    }

    .progress {
      position: absolute;
      height: 100%;
      background: #007bff;
      border-radius: 2px;
      transition: width 0.3s ease;
    }

    .steps-container {
      display: flex;
      justify-content: space-between;
    }

    .step-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
    }

    .step-number {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #e9ecef;
      color: #6c757d;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .step-title {
      font-size: 0.875rem;
      color: #6c757d;
      text-align: center;
    }

    .step-item.active .step-number {
      background: #007bff;
      color: white;
    }

    .step-item.active .step-title {
      color: #007bff;
      font-weight: 500;
    }

    .step-item.completed .step-number {
      background: #28a745;
      color: white;
    }

    .step-item.completed .step-title {
      color: #28a745;
    }
  `]
})
export class ProgressStepsComponent {
  @Input() sections: string[] = [
    'Datos de Acceso',
    'Datos Personales',
    'Dirección',
    'Contacto'
  ];
  @Input() currentStep: number = 0;

  get progressWidth(): string {
    const progress = (this.currentStep / (this.sections.length - 1)) * 100;
    return `${progress}%`;
  }
}
