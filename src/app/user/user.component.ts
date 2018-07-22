import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  mySubscription: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );
    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next("First package");
        }, 1000);
        setTimeout(() => {
          observer.next("second package");
        }, 2000);
        setTimeout(() => {
          observer.complete();
        }, 4000);
      }
    );

    this.mySubscription = myObservable.subscribe(
      (data: string) => { console.log(data); },
      (error: Error)=> { console.log(error); },
      () => { console.log('Completed'); }
    )
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }

  onActivate() {
    this.usersService.usersActivated.next(this.id);
  }
}
