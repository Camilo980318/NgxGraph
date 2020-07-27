import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modules
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { HttpClientModule } from '@angular/common/http';


// Component
import { NgxGraphOrgTreeComponent } from './components/ngx-graph-org-tree/ngx-graph-org-tree.component';

// Service
import { DataTicketService } from './services/data-ticket/data-ticket.service';


@NgModule({
  declarations: [
    AppComponent,
    NgxGraphOrgTreeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    NgxGraphModule,
    HttpClientModule,

  ],
  providers: [DataTicketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
