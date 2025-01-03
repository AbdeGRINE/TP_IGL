import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const rolesGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = JSON.parse(localStorage.getItem('authResponse') || '{}');
    const requiredRole = route.data['role'];
    console.log(requiredRole)
    console.log(user);
    if(Object.keys(user).length == 0){
      router.navigate(["/login"]);
      return false;
    }
    if (user && user.user.type.type === requiredRole) {
      return true; // Allow access
    }

    // If the user doesn't have the required role, redirect to his dashboard
    router.navigate([`/${user.user.type.type}-dashboard`]);
    return false;
};
