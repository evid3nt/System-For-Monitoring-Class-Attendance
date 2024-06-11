START TRANSACTION;

ALTER TABLE "Classrooms" ALTER COLUMN "ClassroomName" SET NOT NULL;
ALTER TABLE "Classrooms" ADD UNIQUE ("ClassroomName");

ALTER TABLE "Courses" ALTER COLUMN "CourseName" SET NOT NULL;
ALTER TABLE "Courses" ADD UNIQUE ("CourseName");

ALTER TABLE "Telemetrys" ALTER COLUMN "ScanTime" SET NOT NULL;
ALTER TABLE "Telemetrys" ALTER COLUMN "UserId" SET NOT NULL;
ALTER TABLE "Telemetrys" ALTER COLUMN "ClassroomId" SET NOT NULL;
ALTER TABLE "Telemetrys" ADD UNIQUE ("ScanTime", "UserId", "ClassroomId");

COMMIT;