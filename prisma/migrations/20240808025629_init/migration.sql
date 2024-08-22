-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "namaDepan" TEXT NOT NULL,
    "namaBelakang" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "genre" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "video" TEXT NOT NULL,
    "cover_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beli" (
    "id_user" INTEGER NOT NULL,
    "id_film" INTEGER NOT NULL,

    CONSTRAINT "Beli_pkey" PRIMARY KEY ("id_user","id_film")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id_user" INTEGER NOT NULL,
    "id_film" INTEGER NOT NULL,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id_user","id_film")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id_user" INTEGER NOT NULL,
    "id_film" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id_user","id_film")
);

-- AddForeignKey
ALTER TABLE "Beli" ADD CONSTRAINT "Beli_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beli" ADD CONSTRAINT "Beli_id_film_fkey" FOREIGN KEY ("id_film") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_id_film_fkey" FOREIGN KEY ("id_film") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_id_film_fkey" FOREIGN KEY ("id_film") REFERENCES "Movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
