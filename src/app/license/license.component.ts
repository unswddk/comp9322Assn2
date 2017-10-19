import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from "rxjs/Subject";
import {License} from "../models/license-model";
import {ActivatedRoute, Router} from "@angular/router";
import {LicenseService} from "../service/license.service";
import {Observable} from "rxjs/Observable";
import {MatSort} from '@angular/material';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {DataSource} from '@angular/cdk/collections';
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  public licenseList: Array<License>;
  displayedColumns = ['Name', 'Email','Address','Number','ExpiryDate','LicenseClass','Noticed'];
  dataSource: ExampleDataSource | null;
  exampleDatabase:ExampleDatabase;
  @ViewChild('filter') filter: ElementRef;
  public currentPage: number = 1;
  public searchText: string;

  constructor(public router: Router,
              public activeRoute: ActivatedRoute,
              public licenseService: LicenseService) {
  }
  ngOnInit() {
    this.loadData(this.searchText,this.currentPage);
  }
  public loadData(searchText: string, page: number) {
    return this.licenseService.getLicenseList(searchText, page).subscribe(
      res => {
        this.licenseList = res;
        this.exampleDatabase = new ExampleDatabase(this.licenseList);
        this.dataSource = new ExampleDataSource(this.exampleDatabase);
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
          .debounceTime(150)
          .distinctUntilChanged()
          .subscribe(() => {
            if (!this.dataSource) { return; }
            this.dataSource.filter = this.filter.nativeElement.value;
          });
      },
      error => {
        console.log(error)
      },
      () => {
      }
    );
  }

}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<License[]> = new BehaviorSubject<License[]>([]);
  get data(): License[] { return this.dataChange.value; }

  constructor( licenseList:Array<License>) {
    for (let i = 0; i < licenseList.length; i++) {
      this.addLicense(licenseList[i]); }
  }
  /** Adds a new user to the database. */
  addLicense(license:License) {
    const copiedData = this.data.slice();
    copiedData.push(license);
    this.dataChange.next(copiedData);
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private _exampleDatabase: ExampleDatabase) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<License[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._exampleDatabase.data.slice().filter((item: License) => {
        let searchStr = (item.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }
  disconnect() {}
}

//
//   /** Returns a sorted copy of the database data. */
//   getSortedData(): License[] {
//     const data = this._exampleDatabase.data.slice();
//     if (!this._sort.active || this._sort.direction == '') {
//       return data; }
//
//     return data.sort((a, b) => {
//       let propertyA: number|string = '';
//       let propertyB: number|string = '';
//
//       switch (this._sort.active) {
//         case 'userName': [propertyA, propertyB] = [a.name, b.name]; break;
//         case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
//         case 'number': [propertyA, propertyB] = [a.number, b.number]; break;
//         case 'expiryDate': [propertyA, propertyB] = [a.expiryDate, b.expiryDate]; break;
//         case 'address': [propertyA, propertyB] = [a.address, b.address]; break;
//         case 'licenseClass': [propertyA, propertyB] = [a.licenseClass, b.licenseClass]; break;
//       }
//
//       let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       let valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//       console.log(valueA,valueB);
//
//       return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
//     });
//   }
// }

//   public currentPage: number = 1;
//   public searchText: string;
//   public licenseList: Array<License>;
//
//   constructor(public router: Router,
//               public activeRoute: ActivatedRoute,
//               public licenseService: LicenseService) {
//   }
//   ngOnInit() {
//    this.loadData(this.searchText,this.currentPage);
//   }
//   public loadData(searchText: string, page: number) {
//     return this.licenseService.getLicenseList(searchText, page).subscribe(
//       res => {
//         console.log(res+"+========1==================");
//         this.licenseList = res;
//       },
//       error => {
//         console.log(error)
//       },
//       () => {
//       }
//     );
//   }
// }


