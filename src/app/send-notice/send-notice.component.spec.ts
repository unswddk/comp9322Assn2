import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNoticeComponent } from './send-notice.component';

describe('SendNoticeComponent', () => {
  let component: SendNoticeComponent;
  let fixture: ComponentFixture<SendNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
