import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LightModeService } from 'src/app/light-mode.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';




@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css',],
})



export class InscriptionComponent implements OnDestroy {
  illustration: string = "../../assets/ressources/illustration.png";
  logo: string = "../../assets/images/IUT GUSTAVE EIFFEL.png";
  
  username: string ='';
  password: string ='';

  


  constructor(private authService: AuthService, private router: Router, private LightModeService: LightModeService, private http: HttpClient) {
  }

  

  onSubmit() {
    interface ApiResponse {
      success?: string;
      error?: string;
    }

    const data = { username: this.username, password: this.password };
    this.http.post<ApiResponse>('http://localhost/saeapi/api.php', data)
    .subscribe(response => {
        console.log('Réponse de l\'API', response);
        if (response.success) {
            console.log('Tentative de navigation vers /inscription/statistique');
            this.authService.login();
            this.router.navigate(['/inscription/statistique']);
        } else if (response.error) {
            console.log('Erreur de connexion', response.error);
        }
    }, error => {
        console.log('Erreur de requête HTTP', error);
    });
  }


  /*Activation du Light Mode*/
  toggleDarkMode() {
    this.LightModeService.toggleDarkMode();
  }

  isDarkMode: boolean = false;
  private subscription: Subscription = new Subscription();


  /*Au chargement de la page vérification  du Light Mode ou DarkMode*/
  ngOnInit() {
    this.subscription = this.LightModeService.getDarkModeStatus().subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/inscription/statistique']); 
  }
    
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  
 


}



