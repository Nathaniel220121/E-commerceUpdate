import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.css']
})
export class TermsConditionComponent implements OnInit {

  getData:any = [];

  constructor(private api :HttpService) { }

  ngOnInit(): void {
    this.api.get('FETCH_TERMS_ND_CONDITION').subscribe(res => { // Get TERMS ND CONDITION details
      this.getData = res.response[0];
    });
  }

}
