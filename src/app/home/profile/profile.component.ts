import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { HttpService } from 'src/app/http/http.service';
import { Observable } from 'rxjs';
import { ChangePasswordComponent } from 'src/app/home/popups/change-password/change-password.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

import jsPDF from 'jspdf';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake/build/vfs_fonts');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
var html2canvas = require("html2canvas");
// import * as  from 'html-to-pdfmake';
var htmlToPdfmake = require("html-to-pdfmake");
// const htmlToPdfmake = require('html-to-pdfmake');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  @ViewChild('dwnldForm') dwnldFormEl: any;

  selectedFile          :File;
  file_data             :any;
  file_name             :string = '';
  file_size             :number = 800001;
  acceptableImageArray  = ['image/png','image/jpg','image/jpeg'];
  fileAccept            :boolean= false;
  uploadImageUrl        :any;
  fileInfos             ?: Observable<any>;
  progress              :number;
  message               :string;
  uploader              :boolean = false;
  firstName             = new FormControl('');
  lastName              = new FormControl('');
  interestCat           = new FormControl('');
  exprnc                = new FormControl('');
  hide                  = true;
  currentDate           = new Date();
  filterDatas           :any = [];
  eventTime             :any = [];
  eventsJoinedDetails   :any = [];
  event                 :any = [];
  invoiceDetails        :any = [];
  orderForm             :any = [];
  orderDetails          :any = [];
  payId                 :any = [];
  prodId                :any = [];

  constructor(public  data  :SharedDataService,
              public  dialog:MatDialog,
              public  api   :HttpService,
              public  router: Router) { }

  ngOnInit(): void {

    window.scroll(0,0);

    if (this.data.loginFlag && this.data.autoGenerate == '1') {
      this.openChangePassword();
    }
    if (!this.data.loginFlag) {
      this.router.navigate(['//']);
      return;
    }
    this.firstName.reset(this.data.firstName);
    this.lastName.reset(this.data.lastName);
    this.interestCat.reset(this.data.interestCategory);
    this.exprnc.reset(this.data.experience);
    if (this.firstName == null)
      this.firstName.reset('');
    if (this.lastName == null)
      this.lastName.reset('');
    if (this.interestCat == null)
      this.interestCat.reset('');
    if (this.exprnc == null)
      this.exprnc.reset('');

    this.getEventDetails();

    this.api.post('FETCH_ORDER_DETAILS',{userId:this.data.uID}).subscribe(res => { //Get Category details
      this.orderDetails = res.response;
    });
  }

  downloadInvoice(prodId:any,payId:any) {

    this.payId = payId;
    this.prodId = prodId;
    // this.api.post('FETCH_ORDER_DETAILS_INVOICE',{userId:this.data.uID,productId:prodId, paymentId:payId}).subscribe(res => { //Get Category details
    //   this.orderDetails = res.response;
    // });
    setTimeout(() =>{this.dwnldFormEl.nativeElement.submit();},500);
  }

  onFileChanged(event:any) {
    if (event.target.files.length > 0) {
      this.fileAccept   = false;
      this.selectedFile = event.target.files[0]
      this.file_name    = this.selectedFile.name;
      this.file_size    = this.selectedFile.size;
      let fileType      = this.selectedFile.type;
      if (this.acceptableImageArray.includes(fileType)) {
        if (this.file_size < 6000000) {
          this.fileAccept = true;
          const reader    = new FileReader();
          reader.readAsDataURL(this.selectedFile);
          reader.onload = (_event) => {
              this.uploadImageUrl = reader.result;
          }
        } else {
          this.data.firePopup(false,'Only file size of 5MB is allowed');
          this.fileAccept= false;
        }
      } else {
        this.data.firePopup(false,'Please upload only PNG/JPEG format');
        this.fileAccept= false;
      }
    }
    console.log(this.selectedFile);
  }

  uploadImage(): void {

    this.fileAccept = false;
    this.progress   = 0;
    this.data.upload(this.selectedFile,).subscribe(
      (event: any) => {
        this.uploader = true;
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.data.changeUserData(event.body);
          this.uploader = false;
          this.data.firePopup(true,'Profile picture updated');
        }
        console.log(event);
    },
    (err: any) => {
      console.log(err);
      this.progress = 0;
      this.uploader = false;
      this.data.firePopup(false,'Error  in updating');
    });
  }

  updateProfileData() {

    this.progress = 0;
    this.data.loadingClass = 'loadBG d-block';

    var uploadData;
    uploadData = {
      emailId     :this.data.emailId,
      firstName   :this.firstName.value,
      lastName    :this.lastName.value,
      experience  :this.exprnc.value,
     // interestCat :this.interestCat.value
    }

    this.api.postResponse('SET_PROFILE_DETAILS',uploadData,{
        reportProgress: true,
        responseType: 'json',
        headers: {'url-Name':'ecommerce'}
      }).subscribe(res => {
      this.event = res;
      this.data.loadingClass = 'loadBG d-none';
      this.file_data = res;
      this.data.changeUserData(res);
      this.data.firePopup(true,'Profile updated');
      this.file_name  = '';
      this.fileAccept = false;
      this.file_size  = 800001;
    });
  }

  openChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
      dialogRef.afterClosed().subscribe(result => {
    });
  }

  getEventDetails() {
    this.api.post('FETCH_USER_JOIN',{userId:this.data.uID}).subscribe(res => { //To get the events of user
      this.eventsJoinedDetails = res.response;
      var cValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en-US');
      var filterValue = [];
      for(var i = 0;i < this.eventsJoinedDetails.length;i++) {
        var curDate   = new Date(cValue);
        if (this.eventsJoinedDetails[i].startDate == null || this.eventsJoinedDetails[i].startDate == '') {
          filterValue[i] = "all upComing";
          this.eventTime[i] = 'Upcoming'
          this.eventsJoinedDetails[i].starting = 'Coming Soon';
          this.eventsJoinedDetails[i].dontCalculate = true;
        } else {
          var startDate = new Date(this.eventsJoinedDetails[i].startDate);
          var endDate   = new Date(this.eventsJoinedDetails[i].endDate);
          if (curDate >= startDate && curDate <= endDate) {
            filterValue[i]="all onGoing";
            this.eventTime[i] = 'On-Going'
          } else if (curDate<=startDate) {
            filterValue[i]="all upComing";
            this.eventTime[i] = 'Upcoming'
          }
        }
      }
      this.filterDatas=filterValue;
      console.log(this.eventsJoinedDetails)
    });

    this.api.post('FETCH_INVOICE_DETAILS',{userId:135,eventId:48}).subscribe(res => { //To get the invoice details
      this.invoiceDetails = res.response;
    });
  }

  filterEvents(eName:string) {

    for(var f = 0;f < this.filterDatas.length;f++) {
      this.filterDatas[f] = this.filterDatas[f].replace(" d-none", "");
      this.filterDatas[f] = this.filterDatas[f].replace(" d-block", "");
    }
    for(var f = 0;f < this.filterDatas.length;f++) {
      if (this.filterDatas[f].search(eName)>-1) {
        this.filterDatas[f] = this.filterDatas[f].replace(this.filterDatas[f], ""+ this.filterDatas[f]+" d-block");
      } else {
        this.filterDatas[f] = this.filterDatas[f].replace(this.filterDatas[f], ""+ this.filterDatas[f]+" d-none");
      }
    }

  }
}

