# # Gunakan image Node.js terbaru
# FROM node:latest

# # Tetapkan zona waktu
# ENV TZ="Asia/Jakarta"

# # Atur opsi Node.js untuk penggunaan memori
# ENV NODE_OPTIONS="--max-old-space-size=4096"

# # Instal pnpm secara global
# RUN npm install -g pnpm

# # Tentukan direktori kerja
# WORKDIR /app

# # Salin file package.json dan pnpm-lock.yaml
# COPY package*.json pnpm-lock.yaml ./

# # Instal dependensi menggunakan pnpm
# RUN pnpm install --frozen-lockfile

# # Salin seluruh kode aplikasi
# COPY . .

# # Bangun aplikasi
# RUN pnpm run build

# # Tambahkan izin eksekusi untuk file run.sh
# RUN chmod +x ./run.sh

# # Buka port 3001
# EXPOSE 3001

# # Jalankan aplikasi
# CMD ["./run.sh"]

FROM node:latest

ENV TZ="Asia/Jakarta"
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Salin file package.json dan pnpm-lock.yaml
COPY package*.json ./

# Instal pnpm secara global
RUN npm install -g pnpm

# Instal dependensi menggunakan pnpm
RUN pnpm install

# Salin semua file aplikasi
COPY . .

# Build aplikasi
RUN pnpm run build
RUN chmod +x ./run.sh

EXPOSE 3001

CMD ["./run.sh"]