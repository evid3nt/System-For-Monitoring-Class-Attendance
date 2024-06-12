import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LectureService } from '../../services/lecture.service';
import { LectureDTO } from '../../models/lecture.model';
import { MatDialog } from '@angular/material/dialog';
import { AddLectureDialogComponent } from './add-lecture/add-lecture-dialog/add-lecture-dialog.component';
import { UserDTO } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  selectedDate: Date | undefined;
  events: LectureDTO[] = [];
  currentUser: UserDTO | undefined;
  userData: any;
  constructor(private lectureService: LectureService, public dialog: MatDialog, private dataService: DataService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.selectedDate = new Date(); // Postavljanje trenutnog datuma
    this.userData = this.dataService.getUserData();
    if (!this.userData) {
      this.router.navigate(['login']);
    }
    this.loadEvents();
    
  }

  loadEvents() {
    this.lectureService.getLecturesForUser(this.userData.id).subscribe((events) => {
      this.events=events
      
    });
  }

  dateSelected(date: Date) {
    date.setHours(date.getHours() + 2)
    this.selectedDate = date;
  }

  openAddLectureDialog(): void {
    const dialogRef = this.dialog.open(AddLectureDialogComponent, {
      data: { date: this.selectedDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new lecture to the events array and reload events
        this.events.push(result);
        this.loadEvents();
      }
    });
  }

  redirectToLectureScheduler() {
    this.router.navigate(['calendar']);
  }

  redirectToAttendance() {
    this.router.navigate(['attendance']);
  }


  deleteLecture(lectureId: string): void {
    this.lectureService.deleteLecture(lectureId).subscribe(
      (result: any) => {
        this.snackBar.open('Lecture successfully deleted', 'Close', {
          duration: 3000, // trajanje obavijesti u milisekundama
        });
        this.lectureService.getLecturesForUser(this.userData.id).subscribe((events) => {
          this.events = events.sort((a, b) => {
            // Pretpostavimo da je lectureStartTime u formatu "HH:mm"
            const [hoursA, minutesA] = a.lectureStart.toString().split(':').map(Number);
            const [hoursB, minutesB] = b.lectureStart.toString().split(':').map(Number);
    
            // Pretvorite u minute od početka dana za usporedbu
            const timeA = hoursA * 60 + minutesA;
            const timeB = hoursB * 60 + minutesB;
    
    
            // Vrati rezultat usporedbe
            return timeA - timeB;
          });
          const index = events.indexOf(result);
          if (index !== -1) {
            events.splice(index, 1);
          }
        });
     
      },
      (error) => {
        this.snackBar.open('Error while deleting lecture ', 'Close', {
          duration: 3000, 
        });
      }
    );
  }

}
