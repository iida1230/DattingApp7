import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/use';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl
  private hubConnection?:  HubConnection

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User) {

    console.log("-----createHubConnection-------------------")
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline',username => {
      console.log("------------------------")
      this.toastr.info(username + 'has connect')

    })

    this.hubConnection.on('UserIsOffline',username => {

      this.toastr.info(username + 'has logout')

    })
}
stopHubConnection() {
  this.hubConnection?.stop().catch(error => console.log(error));
}
}
