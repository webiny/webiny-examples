import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Apollo
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

// Components
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from "@angular/material/icon";

// import the `provideApollo` that we just created 
import { provideApollo } from '../apolloClient';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent
  ],
  imports: [
    BrowserModule,

    HttpClientModule,
    ApolloModule,
    HttpLinkModule,

    // Material
    NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: provideApollo,
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})

export class AppModule { };