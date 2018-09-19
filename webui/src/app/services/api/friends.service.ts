import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { HttpParams} from "@angular/common/http";

@Injectable()
export class FriendsService {
    constructor(
        private apiRequest: ApiRequestService
    ) {}

    completed: boolean;

    getFriends(page?:number, size?:number): Observable<any> {
        //Create Request URL params
        let me = this;
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");

        return this.apiRequest.get('api/friends',params);
    }

    addFriend(server?:Object) {
        return this.apiRequest.post('api/friends/create', server);
    }

    updateFriend(server?:Object) {
        this.apiRequest.post('api/friends/update', server).subscribe(jsonResp => {
                if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === "SUCCESS"){
                    console.log("success ba");
                }
            },
            err => {
                console.error("error ba");
            });
    }

    deleteFriend(id?:string) {
        return this.apiRequest.delete('api/friends/' + id);
    }

    getFriendsStas(field:string): Observable<any> {
        return this.apiRequest.get('api/friends-stats/' + field );
    }

}
