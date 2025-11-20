-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "targetPoints" INTEGER NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#000000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
