# Gunakan image Node.js terbaru
FROM node:latest

# Tetapkan zona waktu
ENV TZ="Asia/Jakarta"

# Atur opsi Node.js untuk penggunaan memori
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Instal pnpm secara global
RUN npm install -g pnpm

# Tentukan direktori kerja
WORKDIR /app

# Salin file package.json dan pnpm-lock.yaml
COPY package*.json pnpm-lock.yaml ./

# Instal dependensi menggunakan pnpm
RUN pnpm install --frozen-lockfile

# Salin seluruh kode aplikasi
COPY . .

# Bangun aplikasi
RUN pnpm run build

# Tambahkan izin eksekusi untuk file run.sh
RUN chmod +x ./run.sh

# Buka port 3001
EXPOSE 3001

# Jalankan aplikasi
CMD ["./run.sh"]
