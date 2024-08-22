# Nelfix
Streaming movies apps

## Design pattern
1. Observer
2. Factory
3. Singleton

## Technology stack
1. Nest js
2. Template engine hbs
3. Prisma
4. Supabase

## Endpoint
> GET /
> GET /browse
> GET /dashboard
> GET /detail
> GET /bought
> GET /wishlist
> POST /wishlist
> GET /self
> POST /films
> GET /films
> GET /films/{id}
> PUT /films/{id}
> DELETE /films/{id}
> POST /auth/signup
> POST /login
> POST /auth/cookies
> GET /auth/logout
> POST /users
> GET /users
> GET /users/{id}
> PATCH /users/{id}
> DELETE /users/{id}
> POST /users/{id}/balance
> POST /buy
> GET /buy/{id_user}
> DELETE /buy/{id}
> GET /wishlist/{id_user}
> DELETE /wishlist/{id}
> POST /feedback
> GET /feedback/{id}
> PATCH /feedback/{id}
> DELETE /feedback/{id}

## Bonus
1. Responsive design
2. Fitur tambahan seperti wishlist, feedback (rating, komentar)
2. Dokumentasi api menggunakan swagger

## Cara Menjalankan

1. Clone repository lalu masuk ke dalam directory nya

   ```bash
   git clone https://github.com/rifchzschki/Nelfix

   cd Nelfix
   ```

2. Instalasi dependency

   ```bash
   npm install
   cd backend npm install
   ```

3. Jalankan program dengan command berikut

   ```bash
   npm run start
   ```

4. Program menggunakan supabase sebagai penyimpanan database sehingga file .env nya saya push juga ke repository (walaupun bukan best practice) hal ini juga dikarenakan belum selesainya dockerize program.

## Identitas

| 13522120 | M Rifki Virziadeili Harisman |
