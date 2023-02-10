import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/********** RUTAS ***********/
import { AppRoutingModule } from './app-routing.module';

/********** COMPONENTES ***********/
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HombresComponent } from './pages/Catalogo/hombres/hombres.component';
import { MujeresComponent } from './pages/Catalogo/mujeres/mujeres.component';
import { NinosComponent } from './pages/Catalogo/ninos/ninos.component';
import { UltimasNovedadesComponent } from './pages/Catalogo/ultimas-novedades/ultimas-novedades.component';
import { CardComponent } from './components/card/card.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { SeccMarcasComponent } from './components/secc-marcas/secc-marcas.component';
import { FiltroComponent } from './components/shared/filtro/filtro.component';
import { InfoModalsComponent } from './components/info-modals/info-modals.component';

// Componentes de Cartas para mostrar productos//
import { CartHombreComponent } from './components/cartas-catalogo/cart-hombre/cart-hombre.component';
import { CartMujeresComponent } from './components/cartas-catalogo/cart-mujeres/cart-mujeres.component';
import { CartNinosComponent } from './components/cartas-catalogo/cart-ninos/cart-ninos.component';
import { NovedadesComponent } from './components/cartas-catalogo/novedades/novedades.component';
import { FavoritosComponent } from './components/cartas-catalogo/favoritos/favoritos.component';

/********** COMPONENTES DEL ADMINISTRADOR ***********/
import { AdminComponent } from './pages/admin/admin.component';
import { NavbarAdminComponent } from './pages/admin/shared/components/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './pages/admin/shared/components/sidebar-admin/sidebar-admin.component';
// componentes de forms o paginas //
import { FormMarcaComponent } from './pages/admin/forms/form-marca/form-marca.component';
import { FormProductosComponent } from './pages/admin/forms/form-productos/form-productos.component';
import { FormCategoriaComponent } from './pages/admin/forms/form-categoria/form-categoria.component';
import { FormListarproductosComponent } from './pages/admin/forms/form-listarproductos/form-listarproductos.component';
import { FormInicioComponent } from './pages/admin/forms/form-inicio/form-inicio.component';
import { FormUsuariosComponent } from './pages/admin/forms/form-usuarios/form-usuarios.component';
// Componentes tablas //
import { TablaProductoComponent } from './pages/admin/shared/components/tablas-admin/tabla-producto/tabla-producto.component';
import { TablaCategoriaComponent } from './pages/admin/shared/components/tablas-admin/tabla-categoria/tabla-categoria.component';
import { TablaUsuariosComponent } from './pages/admin/shared/components/tablas-admin/tabla-usuarios/tabla-usuarios.component';
import { TablaMarcaComponent } from './pages/admin/shared/components/tablas-admin/tabla-marca/tabla-marca.component';
// Componentes de registro-formularios //
import { RegistrarComponent } from './pages/admin/forms/form-productos/registrar/registrar.component';
import { ModificarComponent } from './pages/admin/forms/form-productos/modificar/modificar.component';
import { RegistrarMarcaComponent } from './pages/admin/forms/form-marca/registrar-marca/registrar-marca.component';
import { ModificarMarcaComponent } from './pages/admin/forms/form-marca/modificar-marca/modificar-marca.component';
import { RegistrarCategoriaComponent } from './pages/admin/forms/form-categoria/registrar-categoria/registrar-categoria.component';
import { ModificarCategoriaComponent } from './pages/admin/forms/form-categoria/modificar-categoria/modificar-categoria.component';

import { SpinnerComponent } from './components/spinner/spinner.component';

/********** SERVICIOS ***********/
import { ConexMarcaService } from './services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService } from './services/conexiones/conex-productos/conex-productos.service';
import { HttpClientModule } from '@angular/common/http';
import { ConexCategoriaService } from './services/conexiones/conex-categoria/conex-categoria.service';
import { ConexUsuariosService } from './services/conexiones/conex-usuarios/conex-usuarios.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

// Guard
import { AuthGuard } from './guards/auth/auth.guard';
import { ContactoModalComponent } from './components/contacto-modal/contacto-modal.component';
import { CardSeccionComponent } from './components/card-seccion/card-seccion.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HombresComponent,
    MujeresComponent,
    NinosComponent,
    CardComponent,
    UltimasNovedadesComponent,
    CarruselComponent,
    AdminComponent,
    SeccMarcasComponent,
    FiltroComponent,
    InfoModalsComponent,
    NovedadesComponent,
    CartHombreComponent,
    CartMujeresComponent,
    CartNinosComponent,
    FormMarcaComponent,
    FormProductosComponent,
    FormCategoriaComponent,
    NavbarAdminComponent,
    SidebarAdminComponent,
    FormListarproductosComponent,
    FormInicioComponent,
    RegistrarComponent,
    ModificarComponent,
    TablaProductoComponent,
    RegistrarMarcaComponent,
    ModificarMarcaComponent,
    TablaMarcaComponent,
    RegistrarCategoriaComponent,
    ModificarCategoriaComponent,
    TablaCategoriaComponent,
    TablaUsuariosComponent,
    FormUsuariosComponent,
    SpinnerComponent,
    LoginComponent,
    RegisterComponent,
    FavoritosComponent,
    ContactoModalComponent,
    CardSeccionComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AutocompleteLibModule,
    AppRoutingModule,
    HttpClientModule,
    FilterPipeModule,
    FormsModule
  ],
  providers: [
    [AuthGuard],
    ConexMarcaService,
    ConexProductosService,
    ConexCategoriaService,
    ConexUsuariosService,
    [CookieService],
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
