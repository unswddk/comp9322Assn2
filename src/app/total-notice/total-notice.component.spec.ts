import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNoticeComponent } from './total-notice.component';

describe('TotalNoticeComponent', () => {
  let component: TotalNoticeComponent;
  let fixture: ComponentFixture<TotalNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
