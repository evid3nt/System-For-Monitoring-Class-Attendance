import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LectureService } from '../../services/lecture.service';
import { LectureDTO } from '../../models/lecture.model';
import { MatDialog } from '@angular/material/dialog';
import { AddLectureDialogComponent } from './add-lecture/add-lecture-dialog/add-lecture-dialog.component';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.model';
import { DataService } from '../../services/data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  constructor(private lectureService: LectureService, public dialog: MatDialog,
    private userService: UserService, private dataService: DataService, private snackBar: MatSnackBar, private renderer: Renderer2,) { }

  ngOnInit(): void {
    this.selectedDate = new Date(); // Postavljanje trenutnog datuma// Oduzimanje jednog dana
    this.userData = this.dataService.getUserData();
    this.loadEvents();
  }

  loadEvents() {
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

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        console.log('Trenutni korisnik:', this.currentUser);
      },
      error => {
        console.error('Greška pri dohvatu trenutnog korisnika:', error);
      }
    );
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
          duration: 3000, // trajanje obavijesti u milisekundama
        });
      }
    );
  }

}
