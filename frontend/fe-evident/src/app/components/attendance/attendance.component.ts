import { Component } from '@angular/core';
import { LectureService } from '../../services/lecture.service';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserDTO } from '../../models/user.model';
import { LectureDTO } from '../../models/lecture.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  userData: any;
  events: LectureDTO[] = [];
  present: boolean = false;

  constructor(private lectureService: LectureService,
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
    this.loadEvents(this.userData.id, this.userData.role);
    // this.checkAttendance(this.userData.id);
  }

  loadEvents(id:string, role:number) {
    this.lectureService.getLecturesForUser(this.userData.id).subscribe((events) => {
      this.events=events
    });

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
}
