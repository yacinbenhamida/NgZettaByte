import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path : 'shop' , component : ShopComponent},
  {path : 'playlist',component : PlaylistComponent},
  {path : '', component : ShopComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
