export default function cleanCaption(caption: string): string[] {
  return caption
    .replace(/[#@]\S+/g, '') // Hapus hashtag dan mention
    .replace(/http\S+/g, '') // Hapus URL
    .replace(/[^\w\s.]/g, '') // Hapus karakter khusus kecuali titik
    .split('.') // Pisahkan kalimat
    .map((sentence) => sentence.trim()) // Hapus spasi berlebih
    .filter((sentence) => sentence.length > 0); // Hapus kalimat kosong
}
