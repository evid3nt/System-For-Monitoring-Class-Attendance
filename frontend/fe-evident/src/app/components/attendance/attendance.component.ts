import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LectureDTO } from '../../models/lecture.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CourseDto } from '../../models/course.model';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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

  constructor(
    private userService: UserService,
    private telemetryService: TelemetryService,
    public dialog: MatDialog,
    private dataService: DataService,
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
    if (role === 2) {
      this.telemetryService.getUserTelemetries(id).subscribe((telemetries) => {
        this.telemetries = telemetries.map((event: any) => {
          let updatedEvent = { ...event };
          updatedEvent.lectureStart = this.addHours(updatedEvent.lectureStart, 2);
          updatedEvent.lectureEnd = this.addHours(updatedEvent.lectureEnd, 2);
          return updatedEvent;
        });
      });
    }
    else {
      this.userService.getStudents(id).subscribe((students) => {
        this.students = students;
      });
    }
  }

  addHours(dateString: Date, hours: number) {
    let date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date;
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
    this.telemetryService.getUserTelemetries(event.value).subscribe((telemetries) => {
      this.telemetries = telemetries.map((event: any) => {
        let updatedEvent = { ...event };
        updatedEvent.lectureStart = this.addHours(updatedEvent.lectureStart, 2);
        updatedEvent.lectureEnd = this.addHours(updatedEvent.lectureEnd, 2);
        return updatedEvent;
      });
    })
  }
}
