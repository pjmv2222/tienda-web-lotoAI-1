import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LotteryBallSimpleComponent } from '../lottery-ball-simple/lottery-ball-simple.component';

@Component({
  selector: 'app-lottery-balls-simple-example',
  templateUrl: './lottery-balls-simple-example.component.html',
  standalone: true,
  imports: [CommonModule, LotteryBallSimpleComponent]
})
export class LotteryBallsSimpleExampleComponent {
  // Este componente es solo para mostrar ejemplos de las nuevas bolas de lotería
}
