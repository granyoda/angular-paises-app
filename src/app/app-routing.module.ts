import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes =[
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    // Para conectar los route child es necesario hace el siguiente llamado
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )
  },
  {
    // Cualquier otra path que no este en esta lista se redireccionara al home
    path: '**',
    redirectTo: 'countries'
  },
]

@NgModule({
  imports:[
    // si este es el archivo principal de rutas entonces se coloca 'for...', en caso contrario sera forChild'
    RouterModule.forRoot(routes),
  ],
  exports:[
    RouterModule,
  ]
})
export class AppRoutingModule { }
