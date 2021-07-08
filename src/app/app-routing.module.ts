import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObjectTypeComponent } from './object-type/object-type.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'object-type', component: ObjectTypeComponent },
    { path: '', redirectTo: 'object-type', pathMatch: 'full' },
    { path: '**', redirectTo: 'object-type', pathMatch: 'full' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
