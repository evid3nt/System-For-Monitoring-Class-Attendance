import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LectureService } from '../../../../services/lecture.service';
import { CourseService } from '../../../../services/course.service';
import { ClassroomService } from '../../../../services/classroom.service';
import { ClassroomDto } from '../../../../models/classroom.model';
import { CourseDto } from '../../../../models/course.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-lecture-dialog',
  templateUrl: './add-lecture-dialog.component.html',
  styleUrls: ['./add-lecture-dialog.component.css'],
  standalone: true,
  providers: [CourseService],
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule]
})
export class AddLectureDialogComponent implements OnInit {
  lectureForm: FormGroup;
  courses: CourseDto[] = []; // Array to hold course options
  classrooms: ClassroomDto[] = []; // Array to hold classroom options

  constructor(
    private fb: FormBuilder,
    private lectureService: LectureService,
    private courseService: CourseService,
    private classroomService: ClassroomService,
    public dialogRef: MatDialogRef<AddLectureDialogComponent>,
    private snackBar: MatSnackBar,
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

      lectureStartDate.setHours(lectureStartDate.getHours());
      const lectureStartTime = formValues.lectureStart;
      const [startHours, startMinutes] = lectureStartTime.split(':').map(Number); // Razdvajamo sate i minute i pretvaramo ih u brojeve
      lectureStartDate.setHours(startHours);
      lectureStartDate.setMinutes(startMinutes);

      // Kreiramo novi Date objekt koristeći datum iz roditeljske komponente i vrijeme iz forme
      const lectureEndDate = new Date(this.data.date);
      lectureEndDate.setHours(lectureEndDate.getHours());
      const lectureEndTime = formValues.lectureEnd;
      const [endHours, endMinutes] = lectureEndTime.split(':').map(Number); // Razdvajamo sate i minute i pretvaramo ih u brojeve
      lectureEndDate.setHours(endHours);
      lectureEndDate.setMinutes(endMinutes);

      this.lectureForm.controls['lectureStart'].patchValue(lectureStartDate.toISOString());
      this.lectureForm.controls['lectureEnd'].patchValue(lectureEndDate.toISOString());

      this.lectureService.addLecture(this.lectureForm.value).subscribe((result:any)=>{
        this.snackBar.open('Lecture successfully created', 'Close', {
          duration: 3000, // trajanje obavijesti u milisekundama
        });
        this.dialogRef.close(result);
      },
      () => {
        this.snackBar.open('Error creating lecture', 'Close', {
          duration: 3000,
        });
      })

    }
  }
}
