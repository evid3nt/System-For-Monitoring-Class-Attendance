import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AttendanceComponent } from './components/attendance/attendance.component';

export const routes: Routes = [{path: '', redirectTo: '/login', pathMatch: 'full' }, 
{ path: 'login', component: LoginComponent }, 
{ path: 'register', component: RegisterComponent },
{path: 'calendar', component: CalendarComponent},
{path: 'attendance', component: AttendanceComponent}];
