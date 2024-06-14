import { Component } from '@angular/core';
import { LectureService } from '../../services/lecture.service';
import { CourseService } from '../../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserDTO } from '../../models/user.model';
import { LectureDTO } from '../../models/lecture.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CourseDto } from '../../models/course.model';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { TelemetryService } from '../../services/telemetry.service';
import { TelemetryDTO } from '../../models/telemetry.model';
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  userData: any;
  events: LectureDTO[] = [];
  courses: CourseDto[] = [];
  students: any[] = [];
  telemetries: TelemetryDTO[] = [];
  present: boolean = false;

  constructor(private lectureService: LectureService,
    private courseService: CourseService,
    private userService: UserService,
    private telemetryService: TelemetryService,
    public dialog: MatDialog,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userData = this.dataService.getUserData()
    if (!this.userData) {
      this.router.navigate(['login']);
    }
    this.loadEvents(this.userData.id, this.userData.userRole);
  }

  loadEvents(id: string, role: number) {
    debugger
    if (role === 2) {
      this.telemetryService.getUserTelemetries(id).subscribe((telemetries) => {
        this.telemetries = telemetries;
      }
    );
    }
    else {
      this.userService.getStudents(id).subscribe((students) => {
        this.students = students;
      });
    }
  }

  redirectToLectureScheduler() {
    this.router.navigate(['calendar']);
  }

  redirectToAttendance() {
    this.router.navigate(['attendance']);
  }

  handleAuthenthication() {
    this.dataService.clearUserData();
    this.router.navigate(['login']);
  }

  handleStudentSelection(event: any): void {
    this.lectureService.getLecturesForUser(event.value).subscribe((events) => {
      this.events = events;
    });
    this.telemetryService.getUserTelemetries(event.value).subscribe((telemetries) => {
      this.telemetries = telemetries;
    })
    // console.log(this.telemetries  )
    // this.telemetries.forEach((telemetry) => {
    //   telemetry.lectureStart ? new Date(telemetry.lectureStart.setHours(telemetry.lectureStart.getHours() + 2)) : undefined;
    //   telemetry.lectureEnd ? telemetry.lectureEnd?.setHours(telemetry.lectureEnd.getHours() + 2) : undefined;
    // })
  }
}
