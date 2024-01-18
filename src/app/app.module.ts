import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { InscriptionComponent } from './page/inscription/inscription.component';
import { FAQComponent } from './page/faq/faq.component';
import { StatistiqueComponent } from './page/statistique/statistique.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { PortfolioComponent } from './page/portfolio/portfolio.component';
import { WebglComponent } from './page/webgl/webgl.component';
import { QuizzComponent } from './page/quizz/quizz.component';
import { TableauComponent } from './page/tableau/tableau.component';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    InscriptionComponent,
    FAQComponent,
    StatistiqueComponent,
    PageNotFoundComponent,
    PortfolioComponent,
    WebglComponent,
    QuizzComponent,
    TableauComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
