import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendNoticeComponent } from './extend-notice.component';

describe('ExtendNoticeComponent', () => {
  let component: ExtendNoticeComponent;
  let fixture: ComponentFixture<ExtendNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
