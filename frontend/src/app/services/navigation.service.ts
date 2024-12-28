import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}
  navigateTo(path: string) {
    //This method changes the route without reloading the page.
    //It keeps the application state intact.
    this.router.navigate([path]);
  }
}