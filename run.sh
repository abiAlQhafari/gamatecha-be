#!/bin/sh

# Menjalankan migrasi TypeORM
pnpm run migration:run

# Menjalankan aplikasi
node dist/main.js