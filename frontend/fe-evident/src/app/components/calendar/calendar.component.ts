import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user.model';
import { DataService } from '../../services/data.service';

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
  constructor(private lectureService: LectureService, public dialog: MatDialog, private userService: UserService, private dataService: DataService) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.userData = this.dataService.getUserData();
    console.log(this.userData) // Initialize with today's date
    this.loadEvents();

  }

  loadEvents() {
    this.lectureService.getLecturesForUser(this.userData.id).subscribe((events) => {
      this.events = events;
      console.log(this.events);
    });
  }

  dateSelected(date: Date) {
    this.selectedDate = date;
  }

  getEventsForSelectedDate(): LectureDTO[] {
    return this.events.filter(
      (event) =>
        event.lectureStart?.getDate() === this.selectedDate?.getDate() &&
        event.lectureStart?.getMonth() === this.selectedDate?.getMonth() &&
        event.lectureStart?.getFullYear() === this.selectedDate?.getFullYear()
    );
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
      () => {
        // Uspješno izbrisana lekcija, osvježi događaje
        this.loadEvents();
        console.log('Lekcija uspješno izbrisana.');
      },
      (error) => {
        console.error('Greška pri brisanju lekcije:', error);
      }
    );
  }

}
