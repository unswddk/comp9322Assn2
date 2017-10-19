import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeMainComponent } from './notice-main.component';

describe('NoticeMainComponent', () => {
  let component: NoticeMainComponent;
  let fixture: ComponentFixture<NoticeMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
