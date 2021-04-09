import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { titlebar } from './titlebar/titlebar.component';
import { primer } from './components/primer.component';
import { perfil } from './Perfil/perfil.component';


import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/*
Explicacion del codigo:
- Por ahora hay una sola ventana que tendra dos ventanas hijas(o almenos eso es lo que entiendo)
- La ventana sera app.component donde se situara la barra de arriba de la pagina
- Desde la ventana app.component se accedera por defecto a la ventana primer.component en la cual se tendra
    el contenido de su html + el de su padre (El acceso por defecto se define en rutas en el app.module)
- Dando a la foto de perfil se accedera a la segunda pagina hija, perfil.component, que mostrara el contenido
    de su html y el de su padre, eliminando el del anterior hijo.
- Los archivos ts son los que unen html con css, ademas puedes crear variables y mas
*/

const rutas: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'titlebar'
  },
  {
    path: 'titlebar',
    component: titlebar,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'primer'
      },
      {
        path: 'primer',
        component: primer
      },
      {
        path: 'profile',
        component: perfil
      }
    ]
  }
  
]


@NgModule({
  declarations: [
    AppComponent,
    titlebar,
    primer,
    perfil
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas,{
      enableTracing: true,
      paramsInheritanceStrategy: 'always',
      useHash: true
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
