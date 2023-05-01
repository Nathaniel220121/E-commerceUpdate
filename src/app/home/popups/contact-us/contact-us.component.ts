import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/shared/shared-data.service';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactUsComponent implements OnInit {
  
  phonePattern    = "^[0-9]{10}$";
  emailPattern    = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
  contactName     = new FormControl('', [Validators.required]);
  contactPhone    = new FormControl('', [Validators.required,Validators.pattern(this.phonePattern)]);
  contactEmailID  = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]);
  contactComment  = new FormControl('', [Validators.required]);

  public contactUserForm: FormGroup = new FormGroup({
    email:     this.contactEmailID,
    name:     this.contactName,
    phone:    this.contactPhone,
    comment:  this.contactComment
  });

  constructor(public  data:SharedDataService,
              private api :HttpService) { }

  ngOnInit(): void {
  }

  validateFormFields() {
    if (this.contactName.hasError('required')) {
      return 'Mandatory field';
    } 
  }

  emailValidator(){
    if (this.contactEmailID.hasError('required')) {
      return 'Mandatory field';
    } else if(this.contactEmailID.hasError('email'))
        return 'Not a valid email'
      else  if(this.contactEmailID.hasError('pattern'))
        return 'Not a valid email'
  }

  phoneNumberValidator(){
    if (this.contactPhone.hasError('required'))
      return 'Please enter your PhoneNumber';
    else if (this.contactPhone.hasError('pattern')) {
      return 'Please Enter valid PhoneNumber';
    }
  }

  sendQueries() {
    this.data.loadingClass = 'loadBG d-block';
    let cData = {
      name:       this.contactName.value,
      comments:   this.contactComment.value,
      emailId:    this.contactEmailID.value,
      phoneNumber:this.contactPhone.value,
    }
    this.api.post('SET_USER_QUERIES',cData).subscribe(res => {
      this.data.loadingClass = 'loadBG d-none';
      this.data.firePopup(true,'Query sent');
      this.contactEmailID.reset('');
      this.contactName.reset('');
      this.contactComment.reset('');
      this.contactPhone.reset('');
    });
  }
}
