CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "Classrooms" (
    "Id" uuid NOT NULL,
    "ClassroomName" text NULL,
    CONSTRAINT "PK_Classrooms" PRIMARY KEY ("Id")
);

CREATE TABLE "Courses" (
    "Id" uuid NOT NULL,
    "CourseName" text NULL,
    CONSTRAINT "PK_Courses" PRIMARY KEY ("Id")
);

CREATE TABLE "Lectures" (
    "Id" uuid NOT NULL,
    "LectureStart" timestamp with time zone NULL,
    "LectureEnd" timestamp with time zone NULL,
    "CourseId" uuid NULL,
    "ClassroomId" uuid NULL,
    CONSTRAINT "PK_Lectures" PRIMARY KEY ("Id")
);

CREATE TABLE "Telemetrys" (
    "Id" uuid NOT NULL,
    "ScanTime" timestamp with time zone NULL,
    "UserId" uuid NULL,
    "ClassroomId" uuid NULL,
    CONSTRAINT "PK_Telemetrys" PRIMARY KEY ("Id")
);

CREATE TABLE "Users" (
    "Id" uuid NOT NULL,
    "FirstName" text NULL,
    "LastName" text NULL,
    "Email" text NULL,
    "Password" text NULL,
    "CardId" text NULL,
    "UserRole" integer NULL,
    CONSTRAINT "PK_Users" PRIMARY KEY ("Id")
);

CREATE TABLE "UsersCourses" (
    "Id" uuid NOT NULL,
    "UserId" uuid NULL,
    "CourseId" uuid NULL,
    CONSTRAINT "PK_UsersCourses" PRIMARY KEY ("Id")
);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20240610164014_InitialCreate', '6.0.31');

COMMIT;


