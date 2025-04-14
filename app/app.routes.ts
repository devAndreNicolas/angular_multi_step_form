import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormTesteComponent } from './components/forms/form-teste/form-teste.component';
import { CadastroUnicoComponent } from './components/auth/cadastro-unico/cadastro-unico.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/cadastro',
        pathMatch: 'full'
    },
    {
        path: "home",
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: "form",
        component: FormTesteComponent,
        canActivate: [authGuard]
    },
    {
        path: "auth",
        children: [
            {
                path: "cadastro",
                component: CadastroUnicoComponent
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "registro",
                component: RegistroComponent
            }
        ]
    }
];