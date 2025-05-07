/*
  Warnings:

  - Added the required column `specialtyId` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "canceledAt" DATETIME,
    "specialtyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "barberId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "appointments_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barbers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointments_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "specialties" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("barberId", "canceledAt", "date", "id", "userId") SELECT "barberId", "canceledAt", "date", "id", "userId" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
CREATE INDEX "appointments_userId_idx" ON "appointments"("userId");
CREATE INDEX "appointments_barberId_idx" ON "appointments"("barberId");
CREATE INDEX "appointments_specialtyId_idx" ON "appointments"("specialtyId");
CREATE UNIQUE INDEX "appointments_barberId_date_key" ON "appointments"("barberId", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
