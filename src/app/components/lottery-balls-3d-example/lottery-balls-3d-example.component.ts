import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LotteryBall3DComponent } from '../lottery-ball-3d/lottery-ball-3d.component';

@Component({
  selector: 'app-lottery-balls-3d-example',
  templateUrl: './lottery-balls-3d-example.component.html',
  styleUrls: ['./lottery-balls-3d-example.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, LotteryBall3DComponent]
})
export class LotteryBalls3DExampleComponent {
  // Controles para la demostración
  animationEnabled: boolean = false;

  toggleAnimation(): void {
    this.animationEnabled = !this.animationEnabled;
  }
}
