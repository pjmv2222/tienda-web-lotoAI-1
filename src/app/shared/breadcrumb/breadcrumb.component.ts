import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  label: string;
  status: 'pending' | 'active' | 'completed';
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="breadcrumb-container">
      <div class="steps">
        <div *ngFor="let step of steps; let i = index" 
             class="step" 
             [class.active]="step.status === 'active'"
             [class.completed]="step.status === 'completed'">
          <div class="step-number">{{ i + 1 }}</div>
          <div class="step-label">{{ step.label }}</div>
          <div class="step-connector" *ngIf="i < steps.length - 1"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .breadcrumb-container {
      width: 100%;
      padding: 20px 0;
      background: #f8f9fa;
      margin-bottom: 2rem;
    }

    .steps {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .step {
      display: flex;
      align-items: center;
      position: relative;
      flex: 1;
    }

    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #e9ecef;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #6c757d;
      margin-right: 10px;
    }

    .step-label {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .step-connector {
      flex: 1;
      height: 2px;
      background: #e9ecef;
      margin: 0 15px;
    }

    .step.active .step-number {
      background: #007bff;
      color: white;
    }

    .step.active .step-label {
      color: #007bff;
      font-weight: bold;
    }

    .step.completed .step-number {
      background: #28a745;
      color: white;
    }

    .step.completed .step-connector {
      background: #28a745;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() steps: Step[] = [
    { label: 'Registro', status: 'active' },
    { label: 'Verificación', status: 'pending' }
  ];
}
