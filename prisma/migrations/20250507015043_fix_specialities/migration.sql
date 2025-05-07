/*
  Warnings:

  - You are about to drop the `barber_specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "barber_specialties";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "barber_specialities" (
    "barberId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,

    PRIMARY KEY ("barberId", "specialtyId"),
    CONSTRAINT "barber_specialities_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "barber_specialities_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
