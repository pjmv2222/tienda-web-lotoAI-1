import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LotteryBall3dNewComponent } from '../lottery-ball-3d-new/lottery-ball-3d-new.component';

@Component({
  selector: 'app-lottery-balls-3d-new-example',
  templateUrl: './lottery-balls-3d-new-example.component.html',
  styleUrls: ['./lottery-balls-3d-new-example.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, LotteryBall3dNewComponent]
})
export class LotteryBalls3dNewExampleComponent {
  // Tamaño de las bolas
  ballSize: number = 80;
  
  // Estado de animación
  animationEnabled: boolean = false;
  
  toggleAnimation(): void {
    this.animationEnabled = !this.animationEnabled;
  }
}
