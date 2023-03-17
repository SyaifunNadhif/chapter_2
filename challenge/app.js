const readline = require('readline');

class Nilai {
  constructor() {
    this.arrDataNilai = [];
  }

  nilaiMinMax() {
    const min = Math.min(...this.arrDataNilai);
    const max = Math.max(...this.arrDataNilai);
    console.log(`Nilai Siswa terendah               : ${min}`);
    console.log(`Nilai Siswa tertinggi              : ${max}`);
  }

  maen() {
    const total = this.arrDataNilai.reduce((total, nilai) => total + nilai, 0);
    const rataRata = total / this.arrDataNilai.length;
    console.log(`Rata-rata nilai siswa              : ${rataRata.toFixed(1)}`);
  }

  lulus() {
    const tidakLulus = this.arrDataNilai.filter(nilai => nilai < 60);
    const lulus = this.arrDataNilai.filter(nilai => nilai >= 60);
    console.log(`Jumlah siswa lulus                 : ${lulus.length}`);
    console.log(`Jumlah siswa tidak lulus           : ${tidakLulus.length}`);
  }

  urutkanNilai() {
    const bubbleSort = (arr) => {
        for (let j = 0; j < arr.length - 1; j++) {
          for (let i = 0; i < arr.length - 1; i++) {
            let a = arr[i];
            let b = arr[i + 1];

            if (b < a) {
              let temp = arr[i + 1];
              arr[i + 1] = arr[i];
              arr[i] = temp;
            }
          }
        }
        return arr;
      }

    const sorted = bubbleSort(this.arrDataNilai);
    console.log(`Urutan nilai terendah ke tertinggi : ${sorted.join(', ')}`);
  }

  
  cariNilai(nilaiCari) {
    const siswa = this.arrDataNilai.filter(nilai => nilai === nilaiCari);
    if (siswa.length > 0) {
      console.log(`Siswa dengan nilai ${nilaiCari}              : ${siswa.length}`);
    } else {
      console.log(`Siswa dengan nilai ${nilaiCari}              : Tidak ada`);
    }
  }

  async main() {
    try {
      return await new Promise((resolve, reject) => {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.setPrompt('Inputkan nilai dan ketik "q" jika sudah selesai :\n');
        rl.prompt();

        rl.on('line', (input) => {
          if (input.trim().toLowerCase() === 'q') {
            rl.close();
          } else if (isNaN(input.trim())) {
            console.log('"q" untuk keluar.');
          } else if (input > 100 || input < 0) {
            console.log('Input Nilai 1 - 100');
          } else {
            const nilai = Number(input.trim());
            this.arrDataNilai.push(nilai);
          }
        });

        rl.on('close', () => {
          if (this.arrDataNilai.length === 0) {
            reject('Tidak ada arrDataNilai nilai yang di-inputkan.');
          } else {
            console.log('\nNilai yang diinputkan              : ' + this.arrDataNilai.join(', '));
            this.nilaiMinMax();
            this.maen();
            this.lulus();
            this.urutkanNilai();
            this.cariNilai(90);
            this.cariNilai(100);
            resolve(this.arrDataNilai);
          }
        });

        rl.on('error', (err) => {
          reject('Terjadi error: ' + err);
        });
      });
    } catch (err_1) {
      console.error(err_1);
    }
  }
}

const nilaiSiswa = new Nilai();
nilaiSiswa.main();
