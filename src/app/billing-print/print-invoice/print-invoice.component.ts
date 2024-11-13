import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BillingService } from 'src/app/shared/services/billing.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css']
})
export class PrintInvoiceComponent implements OnInit {
formvalues:any;
_treatmentType:string;
today = new Date();
_amount:any;
_TotalAmount:number=0;
_discountedAmount:number=0;
_invoiceDetails:any;
  constructor(private dataService:BillingService) { }

  ngOnInit(): void {
    this.formvalues=this.dataService.getBillingDetails();
    console.log('print-invoice_component');
    console.log(this.formvalues);
    this.today=this.formvalues.DOB;
    const cost = parseInt(this.formvalues.cost);
    if(this.formvalues.treatmentType==='0'){
      this.dataService.addServiceList('Consultation',1,cost);
    }else 
    if(this.formvalues.treatmentType==='1'){
      this.dataService.addServiceList('Consultation',1,cost);
    }else 
    if(this.formvalues.treatmentType==='2')
    {
      this.dataService.addServiceList('7 Days treatment plan includes Cupping, Dry Needling, K-Taping, Exercise Therapy, Electro Therapy',1,cost);
    }
    this._invoiceDetails=this.dataService.getServiceList();
    console.log('check final service list');
    console.log(this._invoiceDetails);
    
    // this._TotalAmount=this.dataService.GetTotalBillAmount();
    this._amount=this.dataService.GetTotalBillAmount();
    this._TotalAmount = this._amount[0];
    this._discountedAmount = this._amount[1];
  
    //console.log('OnPrintInvoiceComponent_ExecutedService_GetTotalBillAmount');
  }
}
