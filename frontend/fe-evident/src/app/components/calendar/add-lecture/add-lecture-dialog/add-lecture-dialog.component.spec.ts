import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLectureDialogComponent } from './add-lecture-dialog.component';

describe('AddLectureDialogComponent', () => {
  let component: AddLectureDialogComponent;
  let fixture: ComponentFixture<AddLectureDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLectureDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLectureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
