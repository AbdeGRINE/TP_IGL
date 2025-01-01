import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


let accessedFromAfficherDpi = false;


export const creerConsultationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    
      if (accessedFromAfficherDpi) {
        // Allow access to the route
        return true;
      }
    
      // Redirect to /medecin if accessed directly
      router.navigate(['/medecin-dashboard']);
      return false;
};

export const setAccessedFromAfficherDpi = (value: boolean) => {
  accessedFromAfficherDpi = value;
};
