import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css',]
})
export class QuizzComponent {
  pebble_character: string = './assets/images/Pebble character.png'
  robot_character: string = './assets/images/robot character2.png'
  main_character: string = './assets/images/image copie.png';

  toastTransform = 'translateX(400px)';
  private hideTimeout: any;

  formData = {
    prenom: '',
    nom: '',
    email: '',
    formation: '',
    niveauEtudes: '',
    age: null,
    genre: '',
};

constructor(private http: HttpClient) {}

onSubmit() {
    this.http.post('http://localhost/saeapi/quizz.php', this.formData)
        .subscribe(response => {
            console.log('Données envoyées avec succès');
            this.showToast();
        }, error => {
            console.error('Erreur lors de l\'envoi des données', error);
        });
}

showToast() {
  console.log('ShowToast')
  clearTimeout(this.hideTimeout);
  this.toastTransform = 'translateX(0)';

  this.hideTimeout = setTimeout(() => {
    this.toastTransform = 'translateX(400px)';
  }, 4000);
}

closeToast() {
  this.toastTransform = 'translateX(400px)';
}
  
}
