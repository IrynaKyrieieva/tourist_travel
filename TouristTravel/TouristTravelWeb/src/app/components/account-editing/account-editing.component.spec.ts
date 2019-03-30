import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditingComponent } from './account-editing.component';

describe('AccountEditingComponent', () => {
  let component: AccountEditingComponent;
  let fixture: ComponentFixture<AccountEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
