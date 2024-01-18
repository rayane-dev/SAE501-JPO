import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        this.isAuthenticated = true;
    }
  }

  login() {
    this.isAuthenticated = true;
    sessionStorage.setItem('isLoggedIn', 'true');
    // Tu peux également stocker d'autres informations utiles, comme un token
  }
  
  logout() {
      this.isAuthenticated = false;
      sessionStorage.removeItem('isLoggedIn');
      // Assure-toi également de supprimer d'autres informations stockées
  }

    isLoggedIn(): boolean {
        return this.isAuthenticated;
    }
    
}
