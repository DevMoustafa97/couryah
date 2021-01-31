import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface OrdersTableItem {
  position:number;
  id: number;
  createdAt: string;
  status: string;
  driver: {avatarUrl:string,name:string,phone:string};
  customer: {avatarUrl:string,name:string,phone:string};
}

// TODO: replace this with real data from your application

const EXAMPLE_DATA: OrdersTableItem[] = [
  // position is mandatory form selection stuff
  {
  position:1,
  id: 1,
  createdAt: '5 M ago',
  status: "new",
  driver:{avatarUrl:"https://reactlink.com/static/app-assets/images/user/1.jpg", name:"John Doe",phone:"01008990123"},
  customer:{avatarUrl:"https://reactlink.com/static/app-assets/images/user/4.jpg", name:"John Doe",phone:"01008990123"},
  },
  {
  position:2,
  id: 2,
  createdAt: '5 M ago',
  status: "cancelled",
  driver:{avatarUrl:"https://reactlink.com/static/app-assets/images/user/1.jpg", name:"John Doe",phone:"01008990123"},
  customer:{avatarUrl:"https://reactlink.com/static/app-assets/images/user/4.jpg", name:"John Doe",phone:"01008990123"},
  },
  {
  position:3,
  id: 3,
  createdAt: '5 M ago',
  status: "delivered",
  driver:{avatarUrl:"https://reactlink.com/static/app-assets/images/user/1.jpg", name:"John Doe",phone:"01008990123"},
  customer:{avatarUrl:"https://reactlink.com/static/app-assets/images/user/4.jpg", name:"John Doe",phone:"01008990123"},
  },
];

/**
 * Data source for the OrdersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class OrdersTableDataSource extends DataSource<OrdersTableItem> {
  data: OrdersTableItem[] = EXAMPLE_DATA;
  paginator: any;
  sort: any;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<OrdersTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: OrdersTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: OrdersTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'createdAt': return compare(a.createdAt, b.createdAt, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
