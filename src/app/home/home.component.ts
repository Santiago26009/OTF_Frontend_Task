import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ClientsService } from 'src/services/clients.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  listFiltered = [];
  datos!:string;
  name: string = "";
  update:string= "";
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public List: any;
  public Name: any;
  dataSource:any;
  showUpdate: boolean= false; 
  idDelete: string ="";
  search:string= "";
  
  constructor(public serviceClient: ClientsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.filterList();
  }

  getUser() {
    this.serviceClient.getUsers().subscribe(data => {
      console.log(data.results);
      this.List = data.results;
      this.Name = data.values;
     this.dataSource = new MatTableDataSource(this.List);
     this.listFiltered = this.List;
    });
  }

  filterList(): void {
    this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
      this.listFiltered = this.List
        .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    });
  }
  
  CreateUser() {
    this.router.navigate(['createUsers']);
  }

  deleteUsers(event : any ) {
    console.log(this.idDelete,"hola");
    const listData = {
      "name": "Carla",
      "last_name": "Duran",
      "document_id": "100042312"
    }
    const id = this.idDelete
    this.serviceClient.DeleteUsers(id).subscribe(res => {
      console.log(res);
      this.getUser();
    })

  }


  searchUsers(event: Event){
    console.log(this.search,"hola");
    const id = this.search; 
    this.serviceClient.searchUser(id).subscribe(res => {
      this.getUser();
      this.dataSource = new MatTableDataSource(this.List);
      console.log(res, "respuesta enviada");
      
    } )
  }


  showUpDateForm(){
    this.serviceClient.idUpDate = this.update;
    this.router.navigate(['updateUsers']);
  }



}

