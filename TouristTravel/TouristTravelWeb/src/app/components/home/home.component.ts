import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
private text: string;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.test().subscribe(
      (test) => {
        alert(test);
      }, (err) => {
        alert(err);
      }
    );
  }

}
