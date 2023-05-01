import { Component, OnInit , ViewEncapsulation } from '@angular/core';
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
  emailPattern    = "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  contactDetails  :any = [];
  contactfName    = new FormControl('', [Validators.required]);
  contactlName    = new FormControl('', [Validators.required]);
  contactPhone    = new FormControl('', [Validators.required,Validators.pattern(this.phonePattern)]);
  contactEmailID  = new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]);
  contactComment  = new FormControl('', [Validators.required]);

  public contactUserForm: FormGroup = new FormGroup({
    email: this.contactEmailID,
    fname: this.contactfName,
    lname: this.contactlName,
    phone: this.contactPhone,
    comment:this.contactComment
  });

  constructor(public data:SharedDataService,private api:HttpService) { }

  ngOnInit(): void {

    window.scroll(0,0);

    this.api.post('FETCH_CONTACT_US',{}).subscribe(res => { // Get Contact us details
      this.contactDetails = res.response[0];
    });
  }

  requireCheck():boolean{
    if (this.contactlName.hasError('required') ||  this.contactfName.hasError('required') || this.contactEmailID.hasError('required') || this.contactPhone.hasError('required')) {
      return true;
    }
  }

  validateFormFields() {
    if (this.contactfName.hasError('required') || this.contactlName.hasError('required')) {
      return 'Mandatory field';
    } 
  }

  emailValidator(){
    if (this.contactEmailID.hasError('required')) {
      return 'Mandatory field';
    } else if (this.contactEmailID.hasError('email'))
        return 'Not a valid email'
      else  if (this.contactEmailID.hasError('pattern'))
      return 'Not a valid email'
  }

  phoneNumberValidator(){
    if (this.contactPhone.hasError('required'))
    return 'Please enter your PhoneNumber';
    else if (this.contactPhone.hasError('pattern')) {
    return 'Please enter valid PhoneNumber';
    }
  }

  sendQueries() {
    let require = this.requireCheck()
    if (require) {
      this.data.firePopup(false,'Please fill the mandatory fields');
      return;
    }
    if (this.contactUserForm.invalid) {
      this.data.firePopup(false,'Please check the data entered are correct');
      return;
    }

    this.data.loadingClass = 'loadBG d-block';
    let cData = {
      firstName:  this.contactfName.value,
      lastName:   this.contactlName.value,
      comments:   this.contactComment.value,
      emailId:    this.contactEmailID.value,
      phoneNumber:this.contactPhone.value,
    }

    this.api.post('SET_USER_QUERIES',cData).subscribe(res => {
      this.data.loadingClass = 'loadBG d-none';
      if (res.responseCode == 200)
        this.data.firePopup(true,'Query sent');
      else 
        this.data.firePopup(false,res.responseMsg);
      this.contactEmailID.reset('');
      this.contactfName.reset('');
      this.contactlName.reset('');
      this.contactComment.reset('');
      this.contactPhone.reset('');
    });
  }
}
