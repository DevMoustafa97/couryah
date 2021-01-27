import {Component, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';



export interface Order {
  id: number;
  createdAt: string;
  status: string;
  driver: {
    name:string,
    phone:string,
    photoUrl:string
  };
  customer: {
    name:string,
    phone:string,
    photoUrl:string
  };
}


const ELEMENT_DATA: Order[] = [
  {
    id: 1,
    createdAt: "5 M ago",
    status: "new",
    driver: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/1.jpg'
    },
    customer: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/2.jpg'
    }
  },
  {
    id: 2,
    createdAt: "5 M ago",
    status: "cancelled",
    driver: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/1.jpg'
    },
    customer: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/2.jpg'
    }
  },
  {
    id: 3,
    createdAt: "5 M ago",
    status: "delivered",
    driver: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/1.jpg'
    },
    customer: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/2.jpg'
    }
  },
  {
    id: 4,
    createdAt: "5 M ago",
    status: "new",
    driver: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/1.jpg'
    },
    customer: {
      name:"John Doe",
      phone:"01008990123",
      photoUrl:'https://reactlink.com/static/app-assets/images/user/2.jpg'
    }
  },
];

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['Order ID', 'Created at', 'Status', 'Driver', 'Customer','Action'];
  dataSource = new MatTableDataSource<Order>(ELEMENT_DATA);
  selection = new SelectionModel<Order>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Order): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
