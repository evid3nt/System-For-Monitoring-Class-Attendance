// src/app/user.model.ts
export class TelemetryDTO {
    courseName?: string;  // Angular koristi string za GUID
    lectureStart?: Date;
    lectureEnd?: Date;
    classroomName?: string;
    attendance?: number;

    constructor(courseName: string, lectureStart: Date, lectureEnd: Date, classroomName?: string, attendance?: number) {
      this.courseName = courseName;
      this.lectureStart = lectureStart;
      this.lectureEnd = lectureEnd;
      this.classroomName = classroomName;
      this.attendance = attendance;
    }
  }
  