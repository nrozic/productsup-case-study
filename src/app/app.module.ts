import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from '@app/app-routing.module'
import { AppComponent } from '@app/app.component'
import { HeaderModule } from '@common/header/header.module'
import { MatGridListModule } from '@angular/material/grid-list'
import { FilterPipe } from '@common/pipes/filter.pipe'

@NgModule({
  declarations: [AppComponent, FilterPipe],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HeaderModule, MatGridListModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
