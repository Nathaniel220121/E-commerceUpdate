import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedDataService } from 'src/app/shared/shared-data.service';

@Component({
  selector: 'app-refund-cancel',
  templateUrl: './refund-cancel.component.html',
  styleUrls: ['./refund-cancel.component.css']
})
export class RefundCancelComponent implements OnInit {

  getData:any = [];

  constructor(private http:HttpClient, private data:SharedDataService) { }

  ngOnInit(): void {
    this.getData = ` In order to participate in the Competition, You shall be required to pay participation fee in accordance with the Competition Terms (“Participation Fee”). Such Participation Fee shall be payable at the time of submission of Participation Form. You shall not be allowed to participate in Competition unless the Participation Fee is duly paid in full. The Company may waive the Participation Fee, partially or fully, at its sole discretion, for any limited period of time towards promotional activities.
    You agree that the Participation Fee is strictly non-refundable, notwithstanding whether You are granted Participation Approval or not. You are hereby advised to read and peruse these Terms, Privacy Policy, Other Terms, Competition Terms, Participation Guidelines, Art Specifications, and other terms on the Platform very carefully before initiating any payment towards Participation Fee on the Platform.
    You understand and agree that the Company may make use of any third-party payment channels and gateways for payment processing, whether integrated in the Platform or otherwise, You understand and agree that the Company shall not be responsible towards the behavior and working of such third-party payment channels and gateways. You shall review the terms of such third-party payment channels and gateways directly, and accordingly, make decisions with respect to proceeding with any payments on Platform. Any payment shall be subject to payment authentication mechanism as may be applicable from time to time. You agree that such third-party payment channels may charge transaction fee and/or charged for processing payments for which You shall solely be responsible.
    You understand and agree that there are inherent risks involved in online payments, including but not limited to misuse of passwords, internet frauds, mistakes and errors, technological risks, and other, and the Company shall NOT be responsible towards the same in any manner. You may proceed with any payments on the Platform at Your sole discretion.
    Any payments made, and the transactions conducted, through the Platform shall be subject to taxes as may be applicable under applicable laws in force.
    You agree that any payment towards Reward by Company shall be subject to deductions towards applicable taxes, and fee and charges charged by the relevant payment processing channels.
    YOU HEREBY UNDERTAKE AND DECLARE THAT ANY AMOUNT TRANSACTED BY YOU THROUGH THE APPLICATION SHALL BELONG TO YOU AND SHALL BE DERIVED FROM THE LEGITIMATE SOURCES AND SHALL NOT CONTRAVENE IN ANY MANNER, DIRECTLY OR INDIRECTLY, ANY LAW IN FORCE, INCLUDING CONCERNING ANY LAWS GOVERNING FOREIGN EXCHANGE, MONEY LAUNDERING, COUNTER TERRORISM, CUSTOMER IDENTIFICATION CHECK, AND OTHERS, WHETHER IN INDIA OR OTHERWISE.
    
    Refund and Cancellation Policy 
    
    MAFIC reserves the right to refuse/cancel any order. MAFIC at its sole discretion may cancel any order(s): i. If it suspects a fraudulent transaction, or ii. If it suspects a customer has undertaken a transaction which is not in accordance with the Terms of Use or iii. For any reason outside the control of the MAFIC including causes for delivery related logistical difficulties. 
    
    Refund/cancellation policies applicable in the following conditions: 
    
    a) In case, the buyer cancels the order online before the product has been shipped, the entire order amount will be refunded. 
    b) In case the item ordered has been shipped but has not yet been delivered to the buyer, the order can still be cancelled online. Total order amount after deduction of shipment and handling charges will be refunded. The refund will be processed, once Mafic receives the originally ordered item back intact from the courier. 
    c) However, the order once delivered cannot be cancelled in any case. 
    d) In case there is an option for online download of data than cancellation will not be possible e) In case of failed transactions or double realization of account for the same order, the total deducted amount will be refunded. 
    f) In case of cancelled order/failed transactions, the bank/card transaction charges of the buyer, if any, is likely to be forfeited 
    g) MAFIC offers no guarantees whatsoever for the accuracy or timeliness of the refunds in the buyers card/account 
    h) In case of part cancellations, the amount refunded will be corresponding 
    i) If the contest is cancelled by Mafic the amount will be refunded 
    j) The user cannot cancel the once signed up for the contest and no refund will be provided. 
    g) Any subscription taken cannot be cancelled once the subscription has started. 
    `
  }

}
