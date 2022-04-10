import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/services/clients.service';

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.scss']
})
export class UpdateUsersComponent implements OnInit {
  profileFormUpdate = new FormGroup({
    name: new FormControl(''),
    document_id: new FormControl(''),
    last_name: new FormControl(''),
  });
  datos!:string;
  constructor(public serviceClient: ClientsService,
    private router: Router) { }
    update:string= "";
  ngOnInit(): void {
  }


  upDateUsers(customerData: any){
    console.log(this.update, "hol");
    
    this.datos=`Name=${this.profileFormUpdate.value.name}
    Mail=${this.profileFormUpdate.value.document_id}
    Mensaje=${this.profileFormUpdate.value.last_name}
    `;
    this.serviceClient.idUpDate = this.update
    this.serviceClient.upDateUser(this.update,customerData).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['']);
    }); 
  
  }

}
