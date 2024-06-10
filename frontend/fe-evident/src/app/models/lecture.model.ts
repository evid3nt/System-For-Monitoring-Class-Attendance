import { CourseDto } from "./course.model";

export class LectureDTO {
    id?: string;
    lectureStart?: Date;
    lectureEnd?: Date;
    courseId?: string;
    classroomId?: string;
    course: CourseDto | null;

    constructor(
      data: any = {}
    ) {
      this.id = data.id;
      this.lectureStart = data.lectureStart;
      this.lectureEnd = data.lectureEnd;
      this.courseId = data.courseId;
      this.classroomId = data.classroomId;
      this.course = data.course || null;
    }
  }
  