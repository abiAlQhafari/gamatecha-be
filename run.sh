#!/bin/sh

# Menjalankan migrasi TypeORM
npm run migration:run

# Menjalankan aplikasi
node dist/main.js