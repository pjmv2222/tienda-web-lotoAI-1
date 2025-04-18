import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LotteryBallNewComponent } from '../lottery-ball-new/lottery-ball-new.component';

@Component({
  selector: 'app-lottery-balls-new-example',
  templateUrl: './lottery-balls-new-example.component.html',
  styleUrls: ['./lottery-balls-new-example.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, LotteryBallNewComponent]
})
export class LotteryBallsNewExampleComponent {
  // Números más frecuentes
  frequentNumbers: string[] = ['17', '23', '44', '19', '4'];

  // Estrellas más frecuentes
  frequentStars: string[] = ['222', '333', '888'];

  // Números menos frecuentes
  lessFrequentNumbers: string[] = ['333', '626', '484', '101', '222'];
}
