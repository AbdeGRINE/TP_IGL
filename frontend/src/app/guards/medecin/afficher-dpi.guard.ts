import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

let accessedFromMedecin = false; // Tracks if navigation is allowed


export const afficherDpiGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (accessedFromMedecin) {
    // Allow access to the route
    return true;
  }

  // Redirect to /medecin if accessed directly
  router.navigate(['/medecin-dashboard']);
  return false;
};

export const setAccessedFromMedecin = (value: boolean) => {
  accessedFromMedecin = value;
};
