/*
  Warnings:

  - You are about to drop the `specialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "specialties_label_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "specialties";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "specialities" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_barber_specialties" (
    "barberId" TEXT NOT NULL,
    "specialtyId" TEXT NOT NULL,

    PRIMARY KEY ("barberId", "specialtyId"),
    CONSTRAINT "barber_specialties_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "barber_specialties_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_barber_specialties" ("barberId", "specialtyId") SELECT "barberId", "specialtyId" FROM "barber_specialties";
DROP TABLE "barber_specialties";
ALTER TABLE "new_barber_specialties" RENAME TO "barber_specialties";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "specialities_label_key" ON "specialities"("label");
