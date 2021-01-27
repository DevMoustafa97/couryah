import {AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
// Date Picker
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
// pagination
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

interface Order {
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

const ORDERS: Order[] = [
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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})


export class TableComponent implements OnInit {


  selectedCar: number[] = [1,2,3];

  cars = [
      { id: 1, name: 'new' },
      { id: 2, name: 'cancelled' },
      { id: 3, name: 'delivered' },
  ];

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

   }

  ngOnInit(): void {
  }
  // active tab
  active = 1;

  // Date Time Picker
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null = null;
  toDate: NgbDate | null = null;

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  getClass(order:string){
    switch (order) {
      case "new":
        return "order new-order"
        break;

      case "cancelled":
        return "order cancelled-order"
        break;

      case "delivered":
        return "order delivered-order"
        break;

      default:
        return 'order new-order'
        break;
    }
   
  }

  // Table stuff
  orders = ORDERS;
  
  // Table pagination
  
  
  
  
  

}
