import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CommunicationService } from './service/communication.service';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './service/error.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersListComponent } from './users-list/users-list.component';
import { ClassesListComponent } from './classes-cards/classes-cards.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassWallComponent } from './class-wall/class-wall.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PublicationListComponent } from './publication-list/publication-list.component';

export function TokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    NavComponent,
    NotfoundComponent,
    UsersListComponent,
    ClassesListComponent,
    AddClassComponent,
    ClassWallComponent,
    FileUploadComponent,
    PublicationListComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: TokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: [],
      },
    }),
  ],
  providers: [CommunicationService, ErrorInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
