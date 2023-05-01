import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service'; 
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {

  getData:any = [];

  constructor(private api :HttpService,
              private data:SharedDataService) { }

  ngOnInit(): void {
    this.api.get('FETCH_PRIVACY_POLICY').subscribe(res => { // Get privacy details
      this.getData = res.response[0];
    });
  }

}
