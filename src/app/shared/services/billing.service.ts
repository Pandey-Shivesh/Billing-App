import { OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { BasicDetails } from "../models/basicDetail.model";

export class BillingService{
 basicDetails:any;
 serviceList:services[];
 additionalServiceList:additionalServices[];
 _TotalAmount:number=0;
 _invoiceDetails:any;
 discount:any;

 constructor() {
  this.serviceList=[];
  this.additionalServiceList=[
    {
        id:'1',
        serviceName:'Cupping',
        serviceCost:800
    },
    {
        id:'2',
        serviceName:'Dry Needling',
        serviceCost:800
    },
    {
        id:'3',
        serviceName:'K-taping',
        serviceCost:800
    },
    {
        id:'4',
        serviceName:'Exercie Therapy',
        serviceCost:800
    }
  ]
 }
//Data for TreatmentType control to bind a drop down list
  TreatmentType=[
    {
    'key':'0',
    'value':'Regular',
    'desc':'description'
    },
    {
      'key':'1',
      'value':'Only Consultation',
      'desc':'Consultation'
    },
    {
    'key':'2',
    'value':'7 Days treatment Plan',
    'desc':'7 Days treatment Plan'
    }
  ]



  setBillingDetails(form:NgForm){
    this.discount=form.value.discount;
    let uniqueId = `ID-${Math.floor(Date.now() / 10000)}`;
    this.basicDetails=new BasicDetails(
      uniqueId,
      form.value.name,
      form.value.age,
      form.value.mobile,
      form.value.gender,
      form.value.admissionDate,
      form.value.billingDate,
      form.value.treatmentType,
      form.value.payment,
      form.value.discount,
      form.value.email,
      form.value.cost,
    );
    // this.basicDetails={'name':form.value.name,'age':form.value.age};
  }

  getBillingDetails(){
    return this.basicDetails;
  }

  getServiceList(){
    return this.serviceList;
  }

  getAddtionalServicesList(){
    return this.additionalServiceList.slice();
  }

  addServiceList(service:string,sitting:any,cost:any){
    //splice can be used to push/add a value at a specific index in an js array
    this.serviceList.splice(0,0,{service,sitting,cost});
    //this.serviceList.push({service,sitting,cost});
  }

  removeFromServiceList(index:any){
    //splice can also be used to pop/remove a value at a specific index in an js array
    this.serviceList.splice(index,1);
  }

  GetTotalBillAmount(){
    this._invoiceDetails=this.getServiceList();
    let totalAmtList:[]=this._invoiceDetails.map(x=>x.cost);
    totalAmtList.forEach(element => {
      this._TotalAmount=this._TotalAmount+element;
    });
    let discountedAmount = this.discount * this._TotalAmount/100;
    this._TotalAmount=this._TotalAmount - Math.floor(discountedAmount);
    return [this._TotalAmount,discountedAmount];
  }
}

class services{
  service:string;
  sitting:number;
  cost:number;
}

class additionalServices{
  id:string;
  serviceName:string;
  serviceCost:number;
}