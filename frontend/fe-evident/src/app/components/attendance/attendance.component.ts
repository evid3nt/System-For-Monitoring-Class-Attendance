import { Component } from '@angular/core';
import { LectureService } from '../../services/lecture.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  constructor(private lectureService: LectureService,
    public dialog: MatDialog,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  redirectToLectureScheduler() {
    this.router.navigate(['calendar']);
  }

  redirectToAttendance() {
    this.router.navigate(['attendance']);
  }
}
