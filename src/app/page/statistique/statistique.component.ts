import { Component, OnInit, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Subscription, count } from 'rxjs';
import { LightModeService } from 'src/app/light-mode.service';

// Chart.register(LinearScale, BarElement, CategoryScale);







@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css',],
})


export class StatistiqueComponent implements OnInit { 
  main_character: string = './assets/images/image copie.png';

  constructor(private http: HttpClient, private LightModeService: LightModeService) {}
  totalParticipants: number = 0;


  toggleDarkMode() {
    this.LightModeService.toggleDarkMode();
  }

  isDarkMode: boolean = false;
  private subscription: Subscription = new Subscription();


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    //Initialisation des graphiques
    this.loadChartData();
    this.loadChartDataNiveauEtudes();
    this.loadChartDataGenre();
    this.loadChartDataAge();

    //Initialisation de la CARD-UI
    this.loadParticipantData();




    this.subscription = this.LightModeService.getDarkModeStatus().subscribe(isDark => {
      this.isDarkMode = isDark;
    });

    

    // this.Graphic2();
    // this.Graphic3();
    // this.Graphic4();

    
  }

  loadParticipantData() {
    this.http.get<any>('http://localhost/saeapi/get_statistics.php').subscribe(data => {
        this.totalParticipants = data.totalParticipants;
    });
}

  loadChartData() {
    this.http.get<any>('http://localhost/saeapi/get_statistics.php').subscribe(data => {
      const labelsFormation = data.formation.map((item: any) => item.formation);
      const countsFormation = data.formation.map((item: any) => item.count);
      this.Graphic2(labelsFormation, countsFormation);
    });  
  }

  loadChartDataNiveauEtudes() {
    this.http.get<any>('http://localhost/saeapi/get_statistics.php').subscribe(data => {
        const labelsNiveauEtudes = data.niveauEtudes.map((item: any) => item.niveauEtudes);
        const countsNiveauEtudes = data.niveauEtudes.map((item: any) => item.count);
        this.Graphic3(labelsNiveauEtudes, countsNiveauEtudes);
    });
  }

  loadChartDataGenre() {
    this.http.get<any>('http://localhost/saeapi/get_statistics.php').subscribe(data => {
      const filteredDataGenre = data.genre.filter((item: any) => item.genre === 'homme' || item.genre === 'femme');
      const labelsGenre = filteredDataGenre.map((item: any) => item.genre);
      const countsGenre = filteredDataGenre.map((item: any) => item.count);
        this.Graphic4(labelsGenre, countsGenre);
    });
  }

  loadChartDataAge() {
    this.http.get<any>('http://localhost/saeapi/get_statistics.php').subscribe(data => {
      const labelsAge = data.age.map((item: any) => item.age);
      const countsAge = data.age.map((item: any) => item.count);
      this.Graphic5(labelsAge, countsAge);
  });
  }

  //AFFICHAGE DES GRAPHIQUES
  //GRAPHIQUE 2 [Formation souhaiter]
  Graphic2(labels: string[], counts: number[]) {
    

    const ctx = document.getElementById('graphic2') as HTMLCanvasElement;
    const monGraphique = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Nombre d\'étudiants',
              data: counts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  // Autres couleurs pour les autres formations
              ],
              borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)',
                  // Autres couleurs pour les autres formations
              ],
              borderWidth: 1
          }]
      },
      options: {
          // options du graphique...
      }
  });
  }

  //GRAPHIQUE 3 [DIPLOME]
  Graphic3(labels: string[], counts: number[]) {
    

    const ctx = document.getElementById('graphic3') as HTMLCanvasElement;
    const monGraphique = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Nombre d\'étudiants',
              data: counts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  // Autres couleurs pour les autres formations
              ],
              borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 206, 86)',
                  // Autres couleurs pour les autres formations
              ],
              borderWidth: 1
          }]
      },
      options: {
          // options du graphique...
      }
  });
  }


  //GRAPHIQUE 4 [GENRE]
  Graphic4(labels: string[], counts: number[]) {
    

    const ctx = document.getElementById('graphic4') as HTMLCanvasElement;
    const monGraphique = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              label: 'Nombre d\'étudiants',
              data: counts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  
                  // Autres couleurs pour les autres formations
              ],
              borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  // Autres couleurs pour les autres formations
              ],
              borderWidth: 1
          }]
      },
      options: {
          // options du graphique...
      }
  });
  }


  Graphic5(labels: string[], counts: number[]) {
    

    const ctx = document.getElementById('graphic5') as HTMLCanvasElement;
    const monGraphique = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Nombre d\'étudiants',
              data: counts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  '#FF8F8F',
                  'rgba(255, 206, 86, 0.6)',
                  '#508D69',
                  
                  // Autres couleurs pour les autres formations
              ],
              borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  '#FF8F8F',
                  'rgb(255, 206, 86)',
                  '#508D69',
                  
                  // Autres couleurs pour les autres formations
              ],
              borderWidth: 1
          }]
      },
      options: {
          // options du graphique...
      }
  });
  }



  

}
