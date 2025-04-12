import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Home Page';
  
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/form']);
    console.log('Navigating to form...');
  }
}