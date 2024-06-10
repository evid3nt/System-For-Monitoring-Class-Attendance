CREATE TABLE Classrooms (
    Id VARCHAR(36) PRIMARY KEY,
    ClassroomName VARCHAR(255)
);

CREATE TABLE Courses (
    Id VARCHAR(36) PRIMARY KEY,
    CourseName VARCHAR(255)
);

CREATE TABLE Users (
    Id VARCHAR(36) PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255),
    CardId VARCHAR(255),
    UserRole INT
);

CREATE TABLE UsersCourses (
    Id VARCHAR(36) PRIMARY KEY,
    UserId VARCHAR(36),
    CourseId VARCHAR(36),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (CourseId) REFERENCES Course(Id)
);

CREATE TABLE Lectures (
    Id VARCHAR(36) PRIMARY KEY,
    LectureStart TIMESTAMP,
    LectureEnd TIMESTAMP,
    CourseId VARCHAR(36),
    ClassroomId VARCHAR(36),
    FOREIGN KEY (CourseId) REFERENCES Course(Id),
    FOREIGN KEY (ClassroomId) REFERENCES Classroom(Id)
);

CREATE TABLE Telemetrys (
    Id VARCHAR(36) PRIMARY KEY,
    ScanTime TIMESTAMP,
    UserId VARCHAR(36),
    ClassroomId VARCHAR(36),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (ClassroomId) REFERENCES Classroom(Id)
);
	