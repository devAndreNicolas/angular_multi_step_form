import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormTesteComponent } from './components/form-teste/form-teste.component';

export const routes: Routes = [
    {
        path: '',
        component: FormTesteComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "form",
        component: FormTesteComponent
    }
];