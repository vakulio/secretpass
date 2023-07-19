import { Route } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'secrets',
    component: ListComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];
