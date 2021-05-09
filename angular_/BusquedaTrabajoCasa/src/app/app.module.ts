import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { titlebar } from './titlebar/titlebar.component';
import { primer } from './components/primer.component';
import { perfil } from './Perfil/perfil.component';
import { MostrarInformacionComponent } from './mostrar-informacion/mostrar-informacion.component';
import { MostrarTrabajoComponent } from './mostrar-trabajo/mostrar-trabajo.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { login } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { password } from './password/password.component';
import { favoritos } from './favoritos/favoritos.component';
import { sendEmail } from './login/login.component';

import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




/*
Explicacion del codigo:
- La ventana sera titlebar.component donde se situara la barra de arriba de la pagina
- Desde la ventana app.component se accedera por defecto a la ventana titlebar.component y desde ella
    primer.component en la cual se tendra el contenido de su html + el de su padre (El acceso por
    defecto se define en rutas en el app.module)
- Dando a la foto de perfil se accedera a la segunda pagina hija, perfil.component, que mostrara
    el contenido de su html y el de su padre, eliminando el del anterior hijo.
- Los archivos ts son los que unen html con css, ademas puedes crear variables y mas
- A la hora de crear nuevas paginas para poder acceder a ellas hay que ponerlas en Routes.
- Siempre que se importa algo hay que ponerlo en el NgModule en el apartado de imports.
- En la carpeta de globalUse estan definidas las variables globales, las que vamos a poder acceder
    desde cualquier pagina, para usarlas primero hay que hacer un import del ts al ts de la pagina
    en la que se quiere usar.
- Los tipos de variables (usuario, casa), estan localizados en components, al igual que para las
    variables globales se debera importar el ts para usarlo.
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
      },
      {
        path: 'favoritos',
        component: favoritos
      },
      {
        path: 'MostrarInformacionComponent/:id',
        component: MostrarInformacionComponent
      },
      {
        path: 'MostrarTrabajoComponent/:id',
        component: MostrarTrabajoComponent
      },
      {
        path: 'NotificacionesComponent',
        component: NotificacionesComponent
      }
    ]
  },
  {
    path: 'login',
    component: login
  },
  {
    path: 'RegisterComponent',
    component: RegisterComponent
  },
  {
    path: 'password',
    component: password
  }
  
]


@NgModule({
  declarations: [
    AppComponent,
    titlebar,
    primer,
    perfil,
    MostrarInformacionComponent,
    login,
    password,
    favoritos,
    MostrarTrabajoComponent,
    RegisterComponent,
    NotificacionesComponent,
    sendEmail
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas,{
      enableTracing: true,
      paramsInheritanceStrategy: 'always',
      useHash: true
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
