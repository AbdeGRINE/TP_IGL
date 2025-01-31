import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

let accessedFromAfficherDPI = false; // Tracks if navigation is allowed

export const afficherConsultationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
    if (accessedFromAfficherDPI) {
      // Allow access to the route
      return true;
    }
  
    // Redirect to /medecin if accessed directly
    router.navigate(['/medecin-dashboard']);
    return false;
};

export const setAccessedFromAfficherDPI = (value: boolean) => {
  accessedFromAfficherDPI = value;
};
