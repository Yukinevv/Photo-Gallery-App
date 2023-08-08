import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedImagePopupComponent } from './selected-image-popup.component';

describe('SelectedImagePopupComponent', () => {
  let component: SelectedImagePopupComponent;
  let fixture: ComponentFixture<SelectedImagePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedImagePopupComponent]
    });
    fixture = TestBed.createComponent(SelectedImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
