-- CreateTable
CREATE TABLE "Alerts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Alerts_pkey" PRIMARY KEY ("id")
);
