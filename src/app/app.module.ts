import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './components/customer/customer.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { ProductComponent } from './components/product/product.component';
import { SharedService } from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';
import { MatTableExporterModule } from 'mat-table-exporter';

import { AddEditModalComponent } from './components/add-edit-modal/add-edit-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DataTableComponent } from './components/data-table/data-table.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterDataComponent } from './components/filter-data/filter-data.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    PurchaseComponent,
    ProductComponent,
    AddEditModalComponent,
    DataTableComponent,
    NavbarComponent,
    FilterPipe,
    FilterDataComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableExporterModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
