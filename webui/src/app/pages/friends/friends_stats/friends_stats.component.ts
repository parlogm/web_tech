import { Component, OnInit } from '@angular/core';
import {FriendsService} from "../../../services/api/friends.service";
import { Router } from '@angular/router';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import 'rxjs/add/operator/mergeMap';


@Component({
    selector: 's-friends_stats-pg',
    templateUrl: './friends_stats.component.html',
    styleUrls: [ './friends_stats.scss'],
})

export class FriendsStatsComponent implements OnInit {
    view: any[] = [460, 180];
    friendsByAgeData : any[] = [];
    friendsByAddressData: any[] = [];
    colorScheme = {
        domain: ['#007cbb', '#61c673', '#ff8e28', '#ef2e2e']
    };
    barColorScheme = {
        domain: ['#007cbb']
    }

    constructor(private router: Router, private friendsService: FriendsService) { }

    ngOnInit() {
        var me = this;
        this.getPageData()
    }

    getPageData() {
        var me = this;

        /**
         * This is an Example of sequencing RxJS observable using mergeMap
         * (We are sequencing the API calls as the H2 DB used by the backend is failing to serve multiple request at once)
         */
        me.friendsService.getFriendsStas("age")
            .mergeMap(function(ageData) {
                me.friendsByAgeData = ageData.items;
                console.log("Received Friends By Age");
                return me.friendsService.getFriendsStas("address");
            }).subscribe(function(addressData){
            me.friendsByAddressData = addressData.items;
            console.log("Received Friends By Address");
        });
    }


}
