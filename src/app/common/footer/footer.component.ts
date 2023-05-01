import { Component, OnInit } from '@angular/core';
import {MatDialog,} from '@angular/material/dialog';

import { TermsConditionComponent } from 'src/app/home/popups/terms-condition/terms-condition.component';
import { PrivacyComponent } from 'src/app/home/popups/privacy/privacy.component';
import { ContactUsComponent } from 'src/app/home/popups/contact-us/contact-us.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { formatDate } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RefundCancelComponent } from 'src/app/home/popups/refund-cancel/refund-cancel.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  subscribeMail:string = '';
  emailEntered:boolean = false;
  response:any  = [];
  newsDetails:any = [];
  footerDetails:any = [];
  emailPattern = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  emailID = new FormControl('', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]);

  public subscribeForm: FormGroup = new FormGroup({
    email: this.emailID
  });

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    public data:SharedDataService,
    public route:ActivatedRoute) { }

  ngOnInit(): void {

    /*
    this.http.post(''+this.data.apiDomainPathDash+'getHomePageSubscribe',{}) // Get News letter details
    .subscribe(data => {
      console.log(data);
      this.newsDetails = data;
      this.newsDetails = this.newsDetails.response[0];
    },
    err => {
      // Swal.fire(err);
    });  */

    this.http.post(''+this.data.apiDomainPathDash+'getFooterContent',{ headers: {'url-Name':'ecommerce'} }) // Get Footer letter details
    .subscribe(data => {
      //console.log(data);

      this.footerDetails = data;
      this.footerDetails = this.footerDetails.response[0];
    },
    err => {
      // Swal.fire(err);
    });
  }

  openTerms() {
    const dialogRef = this.dialog.open(TermsConditionComponent,{
      disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openRefund() {
    const dialogRef = this.dialog.open(RefundCancelComponent,{
      disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openPrivacy() {
    const dialogRef = this.dialog.open(PrivacyComponent,{
      disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openContactUs() {
    const dialogRef = this.dialog.open(ContactUsComponent,{
      disableClose: true});
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  emailValidator(){
    if (this.emailID.hasError('required')) {
      return 'Mandatory field';
    } else if (this.emailID.hasError('email'))
        return 'Not a valid email'
      else  if (this.emailID.hasError('pattern'))
      return 'Not a valid email'
  }

  subscribe(){

    if (this.emailID.invalid) {
      this.data.firePopup(false,'Please enter a valid E-mail ID');
      return;
    }

    this.data.loadingClass = 'loadBG d-block';
    this.http.post(''+this.data.apiDomainPath+'newsSubscribe',{emailId:this.emailID.value},{ headers: {'url-Name':'ecommerce'} })
    .subscribe(data => {
      this.data.loadingClass = 'loadBG d-none';
      this.response = data;
      //console.log(data);
      this.data.firePopup(true,this.response.responseMsg);

      if (this.response.responseCode == 200) {
        this.data.firePopup(true,'Subscribed to Newsletter');
      } else if (this.response.responseCode == 806) {
        this.data.firePopup(false,'Already subscribed to Newsletter');
      }
    },
    err => {
      this.data.loadingClass = 'loadBG d-none';
      this.data.firePopup(false,err.msg);
    });
  }

  emailValidate() {
    if (this.emailID.hasError('required') ) {
      this.emailEntered = false;
    } else if (this.emailID.hasError('email') ) {
      this.emailEntered = false;
    } else {
      this.emailEntered = true;
    }
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

}
