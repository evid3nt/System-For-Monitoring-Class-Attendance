export class CourseDto {
    id?: string;
    courseName?: string;
  
    constructor(id?: string, courseName?: string) {
      this.id = id;
      this.courseName = courseName;
    }
  }
  