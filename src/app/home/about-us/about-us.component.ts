import { HostListener,Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})

export class AboutUsComponent implements OnInit {

  customOptions: OwlOptions = {
    margin: 10,
        nav: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: true,
        navSpeed: 100,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout:10000,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
  }

  innerWidth    :any = [];
  firstDetails  :any = [];
  secondDetails :any = [];
  thirdDetails  :any = [];
  fourthDetails :any = [];
  fifthDetails  :any = [];
  teamDetails   :any = [];

  constructor(public data:SharedDataService, private api:HttpService) { }

  @HostListener('window:resize', ['$event']) onResize() {
      this.innerWidth = window.innerWidth;
      console.log(this.innerWidth);
      if (this.innerWidth > 1024) {
        this.customOptions.autoplay = false
      } else {
        this.customOptions.autoplay = true
      }
    }

  ngOnInit(): void {

    if (window.innerWidth>1024) {
      this.customOptions.autoplay = false
    } else {
      this.customOptions.autoplay = true
    }

    this.api.get('FETCH_ABOUT_SEC_ONE').subscribe(res => { // Get About us details
      this.firstDetails = res.response[0];
    });

    this.api.get('FETCH_ABOUT_SEC_TWO').subscribe(res => { // Get About us details
      this.secondDetails = res.response[0];
    });

    this.api.get('FETCH_ABOUT_SEC_THREE').subscribe(res => { // Get About us details
      this.thirdDetails = res.response[0];
      if (this.thirdDetails.number1 == '')
        this.thirdDetails.number1 = null;
      if (this.thirdDetails.number2 == '')
        this.thirdDetails.number2 = null;
      if (this.thirdDetails.number3 == '')
        this.thirdDetails.number3 = null;
      if (this.thirdDetails.number4 == '')
        this.thirdDetails.number4 = null;
    });

    this.api.get('FETCH_ABOUT_SEC_FOUR').subscribe(res => { // Get About us details
      this.fourthDetails = res.response[0];
    });

    this.api.get('FETCH_ABOUT_SEC_FIVE').subscribe(res => { // Get About us details
      this.fifthDetails = res.response[0];
      if (this.fifthDetails.point3 == '')
        this.fifthDetails.point3 = null;
      if (this.fifthDetails.point4 == '')
        this.fifthDetails.point4 = null;
      if (this.fifthDetails.point5 == '')
        this.fifthDetails.point5 = null;
      if (this.fifthDetails.point6 == '')
        this.fifthDetails.point6 = null;
      if (this.fifthDetails.point7 == '')
        this.fifthDetails.point7 = null;
    });

    this.api.get('FETCH_ABOUT_SEC_SIX').subscribe(res => { // Get user details
      this.teamDetails = res.response;
    });
  }

}
