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
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatCardModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  userData: any;
  events: LectureDTO[] = [];
  courses: CourseDto[] = [];
  students: any[] = [];
  present: boolean = false;

  constructor(private lectureService: LectureService,
    private courseService: CourseService,
    private userService: UserService,
    public dialog: MatDialog,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit(): void {
    // Provjeri je li korisnik ulogiran, ako nije, posalji ga na login
    this.userData = this.dataService.getUserData()
    if (!this.userData) {
      this.router.navigate(['login']);
    }
    this.loadEvents(this.userData.id, this.userData.userRole);
    // this.checkAttendance(this.userData.id);
  }

  loadEvents(id: string, role: number) {

    // Ako se radi o profesoru: this.lectureService.getLecturesForUser(dropdown_value)...
    if (role === 2) {
      this.lectureService.getLecturesForUser(this.userData.id).subscribe((events) => {
        this.events = events;
      });
    }
    else {
      this.userService.getStudents(id).subscribe((students) => {
        this.students = students;
        console.log("STUDENTS: ", this.students);
      });
    }
    // Ako se radi o profesoru, filtriraj evente tako da se vrate samo predmeti koje predaje
    if (role !== 2) {
      // this.events.filter((event) => {
      //   return event.courseId === this.userData.
      // })
    }
  }

  // checkAttendance(id: string) {
  //   this.events.forEach((event) => {
  //     if (this.userData.)
  //   })
  // }
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
}
