import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Damodara_Assessment';
  public form: FormGroup = this.formBuilder.group({});

private formdata = {

  "firstname": "",

  "lastname": "",

  "institution": "",

  "loanamount": ""

};

public tabledata: any = [{}];
public tablekey:any = Object.keys(this.formdata);
public isedited:boolean = false;
public currentindex: any;


  constructor(private formBuilder: FormBuilder){ }

  ngOnInit() {
  
    this.tabledata =localStorage.getItem('mydata');
    if (this.tabledata == null || this.tabledata == undefined)
      this.tabledata = [{}];
    else{
      this.tabledata = [{}];
       let tempdata:any = localStorage.getItem('mydata');
       this.tabledata = JSON.parse(tempdata);
    }

    this.form = this.formBuilder.group(
      {
  
        firstname: [
          '',
          [
            Validators.required
          ]
        ],
        lastname: [
          '', [
            Validators.required]
        ],
        institution: [
          '', [
            Validators.required]
  
        ],
        loanamount: [
          '', [
            Validators.required]
  
        ]
  
      }
  
    );
  
  }
  
 
onSubmit() {

  if (!this.isedited) {
    this.formdata = {

      "firstname": this.form.get('firstname')?.value,
      "lastname": this.form.get('lastname')?.value,
      "institution": this.form.get('institution')?.value,
      "loanamount": this.form.get('loanamount')?.value
    }

    this.tabledata.push(this.formdata);


  }

  else {

    this.tabledata[this.currentindex].firstname = this.form.get('firstname')?.value;
    this.tabledata[this.currentindex].lastname =this.form.get('lastname')?.value;
    this.tabledata[this.currentindex].institution= this.form.get('institution')?.value;
    this.tabledata[this.currentindex].loanamount= this.form.get('loanamount')?.value;

  }

  this.form.reset();

  localStorage.setItem('mydata', JSON.stringify(this.tabledata));
  this.isedited = false;

}

onedit(id: Event){

  this.isedited = true;

  this.currentindex = Number((id.target as HTMLInputElement).id);

  this.form.controls["firstname"].setValue(this.tabledata[this.currentindex].firstname);
  this.form.controls["lastname"].setValue(this.tabledata[this.currentindex].lastname);
  this.form.controls["institution"].setValue(this.tabledata[this.currentindex].institution);
  this.form.controls["loanamount"].setValue(this.tabledata[this.currentindex].loanamount);
}

  onedelete(id:Event){

    this.currentindex = Number((id.target as HTMLInputElement).id);
    this.tabledata.splice(this.currentindex, 1);
    localStorage.setItem('mydata', JSON.stringify(this.tabledata))
  }

}