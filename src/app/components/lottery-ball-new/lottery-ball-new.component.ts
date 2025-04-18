import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lottery-ball-new',
  templateUrl: './lottery-ball-new.component.html',
  styleUrls: ['./lottery-ball-new.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LotteryBallNewComponent implements OnInit {
  @Input() number: string | number = '';
  @Input() game: string = 'euromillones';
  @Input() type: string = 'regular'; // regular, star, dream, etc.
  @Input() highlight: boolean = false;

  gameClass: string = '';

  ngOnInit(): void {
    this.setGameClass();
  }

  private setGameClass(): void {
    let classes = [];

    // Clase base del juego
    switch (this.game.toLowerCase()) {
      case 'euromillones':
        classes.push(this.type === 'star' ? 'euromillones-star' : 'euromillones');
        break;
      case 'primitiva':
        classes.push('primitiva');
        break;
      case 'bonoloto':
        classes.push('bonoloto');
        break;
      case 'gordo':
      case 'el gordo':
      case 'el gordo de la primitiva':
        classes.push('gordo');
        break;
      case 'eurodreams':
        classes.push(this.type === 'dream' ? 'eurodreams-dream' : 'eurodreams');
        break;
      case 'lototurf':
        classes.push('lototurf');
        break;
      case 'loteria nacional':
      case 'lotería nacional':
        classes.push('loteria-nacional');
        break;
      default:
        classes.push('euromillones');
    }

    // Añadir clase de resaltado si es necesario
    if (this.highlight) {
      classes.push('highlight');
    }

    this.gameClass = classes.join(' ');
  }
}
