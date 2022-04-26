import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SysUser } from 'src/app/models/response/sys-user';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['username', 'mobile', 'email', 'createTime'];
  dataUsers = new MatTableDataSource;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.findAll();
   
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataUsers.filter = filterValue.trim().toLowerCase();
  }
  findAll(){
    this.userService.userFindAll().subscribe(
      (data: any) => {
        this.dataUsers = new MatTableDataSource(data);
        // console.log(this.dataUsers)

      }
    );
  }
  

}