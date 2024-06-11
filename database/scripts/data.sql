START TRANSACTION;

INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "Password", "CardId", "UserRole")
VALUES ('023fc476-db56-4ab7-ad08-323eb43115c5', 'Admin', 'Evident', 'admin.evident@gmail.com', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', NULL, 0);
INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "Password", "CardId", "UserRole")
VALUES ('fc3f5229-46fa-4c95-b54a-82997eb19e45', 'Marko', 'Markić', 'marko.markic@gmail.com', 'e3c4a8e68c23890091f9b9531ef3e0f805ce0a9378d6fb4bbcb6eed403c91342', '10-10-10-10', 1);
INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "Password", "CardId", "UserRole")
VALUES ('e45902c3-7e5b-4e32-9c83-13c38b1aebf2', 'Ana', 'Anić', 'ana.anic@gmail.com', 'e82827b00b2ca8620beb37f879778c082b292a52270390cff35b6fe3157f4e8b', '20-20-20-20', 1);
INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "Password", "CardId", "UserRole")
VALUES ('e8a2ed0b-9e38-4ffe-b6fc-8465e3a61e7a', 'Hrvoje', 'Hrvić', 'hrvoje.hrvic@gmail.com', '5eeafc6e50268caa0aa7a9fa7b2f65364436f17a35f013f020b9746e63f35ce5', '243-2-104-173', 2);
INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "Password", "CardId", "UserRole")
VALUES ('ddb51885-0fef-4ca9-b920-2c96c60ed0ec', 'Milivoj', 'Milkić', 'milivoj.milkic@gmail.com', '0c3503d4cb70339eae192c6ce6c3a654231165c482aa9ebc389251876839349c', '42-58-6-176', 2);
INSERT INTO "Users" ("Id", "FirstName", "LastName", "Email", "Password", "CardId", "UserRole")
VALUES ('f0c5ba29-18e0-4b1d-85b8-75bea9e69136', 'Ivan', 'Ivanović', 'ivan.ivanovic@gmail.com', '6c84b1086e558a0b9dad7623979f6ddf9f337084f281d9b3a07273d04b425344', '100-29-217-181', 2);

INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('9ec05316-74f1-4f7c-a8ba-7963513309de', 'b1');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('247b7755-d218-4599-9f38-33f5cf7f60bb', 'b2');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('da6986f7-d469-4129-84bf-bd8b362f1967', 'b3');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('fe31a667-5e07-4a9f-8094-ff2304c822c3', 'b4');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('6bb0c4e3-043a-47c5-aacf-c40425f16595', 'd1');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('1037ea57-e84c-403a-8c9b-4a3244429ff7', 'd2');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('fd776486-9f9b-435e-bac8-4bdd12a5de89', 'a101');
INSERT INTO "Classrooms" ("Id", "ClassroomName") VALUES ('f31dbbe7-1906-426c-8741-e1fc29ae8519', 'a102');

INSERT INTO "Courses" ("Id", "CourseName") VALUES ('9e8cdbcb-25fe-49a5-8279-ae277d4dd969', 'Internet stvari');
INSERT INTO "Courses" ("Id", "CourseName") VALUES ('50010e01-33be-4082-a295-d74d27a3c7c7', 'Kružna ekonomija');
INSERT INTO "Courses" ("Id", "CourseName") VALUES ('80a4d5e6-cedd-4f42-9523-3a142d332d50', 'Uvod u programiranje');
INSERT INTO "Courses" ("Id", "CourseName") VALUES ('77c35763-619a-43b1-b791-4aa90ba90778', 'Matematička analiza 1');
INSERT INTO "Courses" ("Id", "CourseName") VALUES ('d77bc652-cdc4-4ca2-b384-402754edf7d5', 'Informacijski sustavi');

INSERT INTO "Lectures" ("Id", "LectureStart", "LectureEnd", "CourseId", "ClassroomId")
VALUES ('726a0edc-7cc3-493d-bbde-af5a27d6e0d2', '2024-05-12T18:00:00+02:00', '2024-05-12T20:00:00+02:00', '50010e01-33be-4082-a295-d74d27a3c7c7', '1037ea57-e84c-403a-8c9b-4a3244429ff7');
INSERT INTO "Lectures" ("Id", "LectureStart", "LectureEnd", "CourseId", "ClassroomId")
VALUES ('39f5b756-f01a-4ca6-8bf5-c92a46b1bd79', '2024-05-10T16:00:00+02:00', '2024-05-10T18:00:00+02:00', '9e8cdbcb-25fe-49a5-8279-ae277d4dd969', '247b7755-d218-4599-9f38-33f5cf7f60bb');
INSERT INTO "Lectures" ("Id", "LectureStart", "LectureEnd", "CourseId", "ClassroomId")
VALUES ('14a7491d-9e9a-49d4-820c-e33d90397c57', '2024-05-10T08:00:00+02:00', '2024-05-10T11:00:00+02:00', '80a4d5e6-cedd-4f42-9523-3a142d332d50', '6bb0c4e3-043a-47c5-aacf-c40425f16595');
INSERT INTO "Lectures" ("Id", "LectureStart", "LectureEnd", "CourseId", "ClassroomId")
VALUES ('4998ee79-5936-4e35-a745-c376e365ab1c', '2024-05-14T08:00:00+02:00', '2024-05-14T09:00:00+02:00', '80a4d5e6-cedd-4f42-9523-3a142d332d50', '6bb0c4e3-043a-47c5-aacf-c40425f16595');

-- arrived on time, left on time
INSERT INTO "Telemetrys" ("Id", "ScanTime", "UserId", "ClassroomId")
VALUES ('a46eb22e-d592-4101-8c14-80766a887a81', '2024-05-10T16:10:00+02:00', 'e8a2ed0b-9e38-4ffe-b6fc-8465e3a61e7a', '247b7755-d218-4599-9f38-33f5cf7f60bb');
INSERT INTO "Telemetrys" ("Id", "ScanTime", "UserId", "ClassroomId")
VALUES ('a847dbd0-f204-4130-986e-ef7b201483ff', '2024-05-10T18:02:00+02:00', 'e8a2ed0b-9e38-4ffe-b6fc-8465e3a61e7a', '247b7755-d218-4599-9f38-33f5cf7f60bb');
-- arrived too late case, left on time
INSERT INTO "Telemetrys" ("Id", "ScanTime", "UserId", "ClassroomId")
VALUES ('f46bf335-4905-4e8a-bb53-7cb47d08a701', '2024-05-10T16:23:00+02:00', 'ddb51885-0fef-4ca9-b920-2c96c60ed0ec', '247b7755-d218-4599-9f38-33f5cf7f60bb');
INSERT INTO "Telemetrys" ("Id", "ScanTime", "UserId", "ClassroomId")
VALUES ('4931e5a7-0e1d-4404-910b-2718e6158ab3', '2024-05-10T16:23:00+02:00', 'ddb51885-0fef-4ca9-b920-2c96c60ed0ec', '247b7755-d218-4599-9f38-33f5cf7f60bb');

INSERT INTO "UsersCourses" ("Id", "UserId", "CourseId")
VALUES ('3b81ecb9-64f6-4e6c-8cfd-314d9b68014c', 'e8a2ed0b-9e38-4ffe-b6fc-8465e3a61e7a', '9e8cdbcb-25fe-49a5-8279-ae277d4dd969');
INSERT INTO "UsersCourses" ("Id", "UserId", "CourseId")
VALUES ('69926485-987b-44c2-80c6-066997710ccd', 'ddb51885-0fef-4ca9-b920-2c96c60ed0ec', '9e8cdbcb-25fe-49a5-8279-ae277d4dd969');
INSERT INTO "UsersCourses" ("Id", "UserId", "CourseId")
VALUES ('d704e98e-3994-4656-a444-cc0365a329d4', 'f0c5ba29-18e0-4b1d-85b8-75bea9e69136', '9e8cdbcb-25fe-49a5-8279-ae277d4dd969');

COMMIT;