import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/services/clients.service';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  datos!:string;
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    documentId: new FormControl(''),
  });
  constructor(private serviceClient: ClientsService,
    private router:Router,
    private formBuilder: FormBuilder) { 
      this.profileForm = this.formBuilder.group({
        name: '',
        last_name: '',
        document_id: ''
      });
    }

  ngOnInit(): void {
  }

  onSubmit(customerData : any) {
    this.datos=`Name=${this.profileForm.value.firstName}
    Mail=${this.profileForm.value.lastName}
    Mensaje=${this.profileForm.value.documentId}
    `;
    console.log(this.datos);
    
    this.serviceClient.CreateUsers(customerData).subscribe(resp => {
      console.log(resp,"Me guarde");
      this.router.navigate(['']);
    }); 
  }

}
