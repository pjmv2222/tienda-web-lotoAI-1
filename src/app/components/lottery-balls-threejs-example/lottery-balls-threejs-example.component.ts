import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LotteryBallThreejsComponent } from '../lottery-ball-threejs/lottery-ball-threejs.component';

@Component({
  selector: 'app-lottery-balls-threejs-example',
  templateUrl: './lottery-balls-threejs-example.component.html',
  styleUrls: ['./lottery-balls-threejs-example.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, LotteryBallThreejsComponent]
})
export class LotteryBallsThreejsExampleComponent {
  // Tamaño de las bolas
  ballSize: number = 80;
}
