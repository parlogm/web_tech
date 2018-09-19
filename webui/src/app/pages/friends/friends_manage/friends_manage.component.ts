import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FriendsService} from "../../../services/api/friends.service";
import {Router} from '@angular/router';

@Component({
    selector: 's-friends_manage-pg',
    templateUrl: './friends_manage.component.html',
    styleUrls: ['./friends_manage.scss'],
})

export class FriendsManageComponent implements OnInit {

    @ViewChild('actionBtns') actionBtns : TemplateRef<any>;

    //ngx-Datatable Variables
    columns: any[];
    rows: any[];
    completed: boolean;

    constructor(private router: Router, private friendsService: FriendsService) {
    }

    ngOnInit() {
        var me = this;
        me.getPageData();

        this.columns = [
            {prop: "name", name: "Name", width: 100},
            {prop: "lastName", name: "lastName", width: 100},
            {prop: "age", name: "Age", width: 100},
            {prop: "phone", name: "Phone", width: 100},
            {prop: "address", name: "Address", width: 200},
            {prop: "id", name: "Actions", width: 200, cellTemplate: this.actionBtns}
        ];
    }

    getPageData() {
        var me = this;
        this.friendsService.getFriends().subscribe((data) => {
            this.rows = data.items;
        });
    }

    updateUser(row) {
        this.friendsService.updateFriend(row);
    }

    delete(id) {
        this.friendsService.deleteFriend(id).subscribe(jsonResp => {
                if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS"){
                    this.friendsService.getFriends().subscribe((data) => {
                        this.rows = data.items;
                    });
                }
            },
            err => {
                console.error("aaaaaaaaaaaaaaaaaaaaaa ba");
            });
    }

}
