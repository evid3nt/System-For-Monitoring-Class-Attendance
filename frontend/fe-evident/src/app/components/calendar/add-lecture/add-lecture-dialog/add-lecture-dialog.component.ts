import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LectureDTO } from '../../../../models/lecture.model';
import { CommonModule } from '@angular/common';
import { LectureService } from '../../../../services/lecture.service';
import { CourseService } from '../../../../services/course.service';
import { ClassroomService } from '../../../../services/classroom.service';
@Component({
  selector: 'app-add-lecture-dialog',
  templateUrl: './add-lecture-dialog.component.html',
  styleUrls: ['./add-lecture-dialog.component.css'],
  standalone: true,
  providers: [CourseService],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddLectureDialogComponent implements OnInit {
  lectureForm: FormGroup;
  courses: string[] = []; // Array to hold course options
  classrooms: string[] = []; // Array to hold classroom options

  constructor(
    private fb: FormBuilder,
    private lectureService: LectureService,
    private courseService: CourseService,
    private classroomService: ClassroomService,
    public dialogRef: MatDialogRef<AddLectureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { date: Date }
  ) { 
    this.lectureForm = this.fb.group({
      lectureStart: ['', Validators.required],
      lectureEnd: ['', Validators.required],
      courseId: ['', Validators.required],
      classroomId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.populateDropdowns();
  }

  populateDropdowns(): void {

    this.courseService.getCourses().subscribe((result:any)=>{
      this.courses = result
    })
    this.classroomService.getClassrooms().subscribe((result:any)=>{
      this.classrooms = result
    })

  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.lectureForm.valid) {
      const formValues = this.lectureForm.value;

      // Kreiramo novi Date objekt koristeći datum iz roditeljske komponente i vrijeme iz forme
      const lectureStartDate = new Date(this.data.date);
      const lectureStartTime = formValues.lectureStart;
      lectureStartDate.setHours(lectureStartTime.getHours());
      lectureStartDate.setMinutes(lectureStartTime.getMinutes());

      // Kreiramo novi Date objekt koristeći datum iz roditeljske komponente i vrijeme iz forme
      const lectureEndDate = new Date(this.data.date);
      const lectureEndTime = formValues.lectureEnd;
      lectureEndDate.setHours(lectureEndTime.getHours());
      lectureEndDate.setMinutes(lectureEndTime.getMinutes());


      // Kreiramo novi LectureDTO objekt koristeći kombinovani datum i vrijeme
      console.log(lectureStartDate, lectureEndDate)

      this.lectureForm.controls['lectureStart'].patchValue(lectureStartDate);
      this.lectureForm.controls['lectureEnd'].patchValue(lectureEndDate);

      const newLecture = new LectureDTO(this.lectureForm.value);

      this.lectureService.addLecture(newLecture).subscribe((result:any)=>{
        this.dialogRef.close(result);
      })

    }
  }
}
