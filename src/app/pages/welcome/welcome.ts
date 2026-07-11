import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  constructor(private readonly router: Router) {}

  enterSoc(): void {
    //De momento cuando se cliquee se irá al Dashboard
    //Lo crearé en la segunda pantalla el Dashboard
    this.router.navigate(['/dashboard']);
  }
}
