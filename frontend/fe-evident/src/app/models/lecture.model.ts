export class Lecture {
    id?: string;
    lectureStart?: Date;
    lectureEnd?: Date;
    courseId?: string;
    classroomId?: string;
  
    constructor(
      lectureStart: Date,
      lectureEnd: Date,
      courseId?: string,
      classroomId?: string,
      id?: string,
    ) {
      this.id = id;
      this.lectureStart = lectureStart;
      this.lectureEnd = lectureEnd;
      this.courseId = courseId;
      this.classroomId = classroomId;
    }
  }
  