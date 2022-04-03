import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HeaderComponent } from '@common/header/header.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatGridListModule } from '@angular/material/grid-list'

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatToolbarModule, MatGridListModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
