import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent  }       from './home.component';

import { LoginComponent        }   from './pages/login/login.component';
import { LogoutComponent       }   from './pages/logout/logout.component';
import { DashboardComponent    }   from './pages/dashboard/dashboard.component';

import { AuthGuard } from './services/auth_guard.service';
import { PageNotFoundComponent }  from './pages/404/page-not-found.component';
import {FriendsComponent} from "./pages/friends/friends.component";
import {FriendsManageComponent} from "./pages/friends/friends_manage/friends_manage.component";
import {FriendsAddComponent} from "./pages/friends/friends_add/friends_add.component";
import {FriendsStatsComponent} from "./pages/friends/friends_stats/friends_stats.component";

export const routes: Routes = [
  //Important: The sequence of path is important as the router go over then in sequential manner
  { path: '', redirectTo: '/home/dashboard/order', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[AuthGuard],
    children:[  // Children paths are appended to the parent path
        { path: '', redirectTo: '/home/dashboard/friends', pathMatch: 'full', data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}] },  // Default path (if no deep path is specified for home component like webui/home then it will by default show ProductsComponent )
        {
            path     : 'dashboard',
            component: DashboardComponent,
            data     : [{selectedHeaderItemIndex:0, selectedSubNavItemIndex:-1}],
            children :[
                { path: ''        , redirectTo: '/home/dashboard/friends', pathMatch: 'full'},
                { path: 'friends'   , component: FriendsStatsComponent     , data:[{selectedHeaderItemIndex:0, selectedSubNavItemIndex:0}]  }
            ]
        },
        { path: '', redirectTo: '/home/friends/friends', pathMatch: 'full', data:[{selectedHeaderItemIndex:2, selectedSubNavItemIndex:-1}] },
        {
            path     : 'friends',
            component: FriendsComponent,
            data     : [{selectedHeaderItemIndex:1, selectedSubNavItemIndex:-1}],
            children :[
                { path: ''        , redirectTo: '/home/friends/friends_manage', pathMatch: 'full'},
                { path: 'friends_manage'   , component: FriendsManageComponent     , data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:0}]  },
                { path: 'friends_add'   , component: FriendsAddComponent     , data:[{selectedHeaderItemIndex:1, selectedSubNavItemIndex:1}]  }
            ]
        },
    ]
  },
  { path: 'login' , component: LoginComponent       , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },
  { path: 'logout', component: LogoutComponent      , data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] },
  { path: '**'    , component: PageNotFoundComponent, data:[{selectedHeaderItemIndex:-1, selectedSubNavItemIndex:-1}] }

];
@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash:true} )],
  exports: [ RouterModule ],
  declarations:[PageNotFoundComponent]
})
export class AppRoutingModule {}
