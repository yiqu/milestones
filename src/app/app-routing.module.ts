import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { NotFoundComponent } from './404/404.component';
import { NetworkAwarePreloadStrategy } from './shared/preload-strategies/preload-network';
import { PersonalAddComponent } from './personal/add/add.component';
import { PersonalProgressComponent } from './personal/progress/progress.component';
import { PersonalEditComponent } from './personal/edit/edit.component';

const routes: Routes = [
  { path: "", redirectTo: "personal", pathMatch: "full" },
  { path: "personal", component: PersonalComponent, children:
    [
      { path: "", redirectTo: 'progress', pathMatch: 'full' },
      { path: "progress", component: PersonalProgressComponent },
      { path: "add", component: PersonalAddComponent },
      { path: "edit", component: PersonalEditComponent }
    ]
  },
  { path: 'auth',
    loadChildren: () => import('./authentication/auth.module').then(m => m.AuthModule)
  },
  { path: 'my-account',
    loadChildren: () => import('./my-account/my.module').then(m => m.MyAccountModule)
  },
  { path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: NetworkAwarePreloadStrategy,
    }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
