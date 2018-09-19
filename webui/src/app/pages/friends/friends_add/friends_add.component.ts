import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Friends} from "../../../model/friends.model";
import {FriendsService} from "../../../services/api/friends.service";
import {NotificationsService} from "angular2-notifications";


@Component({
    selector: 's-friends_add-pg',
    templateUrl: './friends_add.component.html',
    styleUrls: ['./friends_add.scss'],
})
export class FriendsAddComponent {

    friend: Friends = new Friends();

    constructor(private router: Router, private friendsService: FriendsService, private notificationService: NotificationsService) {

    }

    addServer(): void {
        this.friendsService.addFriend(this.friend).subscribe(jsonResp => {
                if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS"){
                    this.notificationService.success('Friend added!', '', {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: false,
                        clickIconToClose: true
                    });
                } else {
                    this.notificationService.error('Friend could not be added!', jsonResp.operationMessage, {
                        timeOut: 3000,
                        showProgressBar: true,
                        pauseOnHover: true,
                        clickToClose: false,
                        clickIconToClose: true
                    });
                }
            },
            err => {
                this.notificationService.error('Friend could not be added!', err.toString(), {
                    timeOut: 3000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: false,
                    clickIconToClose: true
                });
            });
    };

}
