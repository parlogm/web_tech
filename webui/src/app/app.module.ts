import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

//Third Party Modules
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ClarityModule} from '@clr/angular';
import { SimpleNotificationsModule } from 'angular2-notifications';

//Local App Modules
import {AppRoutingModule} from './app-routing.module';

// Directives
import {TrackScrollDirective} from './directives/track_scroll/track_scroll.directive';

// Components
import {BadgeComponent} from './components/badge/badge.component';
import {LegendComponent} from './components/legend/legend.component';
import {LogoComponent} from './components/logo/logo.component';

//Pages  -- Pages too are components, they contain other components
import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {LoginComponent} from './pages/login/login.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {FriendsAddComponent} from "./pages/friends/friends_add/friends_add.component";
import {FriendsComponent} from "./pages/friends/friends.component";
import {FriendsManageComponent} from "./pages/friends/friends_manage/friends_manage.component";
import {FriendsStatsComponent} from "./pages/friends/friends_stats/friends_stats.component";

// Services
import {AppConfig} from './app-config';
import {UserInfoService} from './services/user-info.service';
import {AuthGuard} from './services/auth_guard.service';
import {ApiRequestService} from './services/api/api-request.service';
import {TranslateService} from './services/api/translate.service';
import {LoginService} from './services/api/login.service';
import {FriendsService} from "./services/api/friends.service";

@NgModule({

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

        // Thirdparty Module
        NgxDatatableModule,
        NgxChartsModule,
        ClarityModule.forChild(),

        BrowserAnimationsModule,
        SimpleNotificationsModule.forRoot(),

        // Local App Modules
        AppRoutingModule


    ],

    declarations: [
        // Components
        BadgeComponent,
        LegendComponent,
        LogoComponent,

        //Pages -- Pages too are components, they contain other components
        AppComponent,
        HomeComponent,
        LoginComponent,
        LogoutComponent,
        DashboardComponent,
        FriendsAddComponent,
        FriendsComponent,
        FriendsManageComponent,
        FriendsStatsComponent,


        //Directives
        TrackScrollDirective
    ],

    providers: [
        AuthGuard,
        UserInfoService,
        TranslateService,
        ApiRequestService,
        LoginService,
        AppConfig,
        FriendsService,
    ],

    bootstrap: [AppComponent]
})

export class AppModule {
}
