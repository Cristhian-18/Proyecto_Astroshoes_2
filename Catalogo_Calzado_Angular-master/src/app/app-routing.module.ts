import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes de paginas del cliente//
import { HomeComponent } from './pages/home/home.component';
import { UltimasNovedadesComponent } from './pages/Catalogo/ultimas-novedades/ultimas-novedades.component';
import { HombresComponent } from './pages/Catalogo/hombres/hombres.component';
import { MujeresComponent } from './pages/Catalogo/mujeres/mujeres.component';
import { NinosComponent } from './pages/Catalogo/ninos/ninos.component';
import { FavoritosComponent } from './components/cartas-catalogo/favoritos/favoritos.component';

//componentes de formularios de Administrador//
import { AdminComponent } from './pages/admin/admin.component';
import { FormCategoriaComponent } from './pages/admin/forms/form-categoria/form-categoria.component';
import { FormListarproductosComponent } from './pages/admin/forms/form-listarproductos/form-listarproductos.component';
import { FormMarcaComponent } from './pages/admin/forms/form-marca/form-marca.component';
import { FormProductosComponent } from './pages/admin/forms/form-productos/form-productos.component';
import { FormInicioComponent } from './pages/admin/forms/form-inicio/form-inicio.component';

/////// LOGIN - REGISTER formularios /////
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

// Importe del Guard
import { AuthGuard } from './guards/auth/auth.guard';





const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'ultimas_novedades', component:UltimasNovedadesComponent},
  {path:'hombres', component:HombresComponent},
  {path:'mujeres', component:MujeresComponent},
  {path:'ninos', component:NinosComponent},
  {path:'favoritos', component:FavoritosComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  

  //Administrador//
  {path:'admin', component:AdminComponent, canActivate: [AuthGuard]},
  {path:'admin/form-inicio', component:FormInicioComponent, canActivate: [AuthGuard]},
  {path:'admin/form-categoria', component:FormCategoriaComponent, canActivate: [AuthGuard]},
  {path:'admin/form-listarproductos', component:FormListarproductosComponent, canActivate: [AuthGuard]},
  {path:'admin/form-marca', component:FormMarcaComponent, canActivate: [AuthGuard]},
  {path:'admin/form-productos', component:FormProductosComponent, canActivate: [AuthGuard]},

  {path:'**',pathMatch:'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

