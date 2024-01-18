import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { FAQComponent } from './page/faq/faq.component';
import { StatistiqueComponent} from './page/statistique/statistique.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { PortfolioComponent } from './page/portfolio/portfolio.component';
import { WebglComponent } from './page/webgl/webgl.component';
import { QuizzComponent } from './page/quizz/quizz.component';
import { TableauComponent } from './page/tableau/tableau.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'inscription/statistique/tableau', pathMatch: 'full', component: TableauComponent, canActivate:[AuthGuard] },
  { path: 'inscription/statistique',  pathMatch: 'full', component: StatistiqueComponent, canActivate:[AuthGuard]},
  { path: 'inscription', pathMatch: 'full', component: InscriptionComponent },
  { path: 'quizz',  pathMatch: 'full', component: QuizzComponent },
  { path: 'game',  pathMatch: 'full', component: WebglComponent },
  { path: 'portfolio', pathMatch: 'full', component: PortfolioComponent},
  { path: 'FAQ',  pathMatch: 'full', component: FAQComponent },
  { path: 'home',  pathMatch: 'full', component: HomeComponent },
  { path: '',  redirectTo:  'home', pathMatch: 'full' },
  { path: '**', pathMatch: 'full',  component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

  
 }
