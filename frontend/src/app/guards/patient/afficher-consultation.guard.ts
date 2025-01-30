import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


let accessedFromADashboardPatient = false;

export const afficherConsultationPatientGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
      
        if (accessedFromADashboardPatient) {
          // Allow access to the route
          return true;
        }
      
        // Redirect to /medecin if accessed directly
        router.navigate(['/patient-dashboard']);
        return false;
};

export const setAccessedFromADashboardPatient = (value: boolean) => {
  accessedFromADashboardPatient = value;
};
