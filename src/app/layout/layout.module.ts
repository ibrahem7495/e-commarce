import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserModule } from '../user/user.module';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidbarLayoutComponent } from './components/sidbar-layout/sidbar-layout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    NavBarComponent,
    SidebarComponent,
    SidbarLayoutComponent,


  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    UserModule,
    FormsModule,
  ]
})
export class LayoutModule { }
