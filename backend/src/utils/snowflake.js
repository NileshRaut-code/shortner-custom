// import crypto from 'crypto';

// const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

// export class SnowflakeGenerator {
//   constructor() {
//     this.lastTimestamp = 0;
//     this.sequence = 0;
//   }

//   generate() {
//     const timestamp = Date.now();
    
//     if (timestamp === this.lastTimestamp) {
//       this.sequence = (this.sequence + 1) & 0xFFF;
//       if (this.sequence === 0) {
//         return this.generate();
//       }
//     } else {
//       this.sequence = 0;
//     }
    
//     this.lastTimestamp = timestamp;
    
//     const buffer = Buffer.alloc(8);
//     buffer.writeBigInt64BE(BigInt(timestamp), 0);
    
//     const hash = crypto
//       .createHash('sha256')
//       .update(buffer)
//       .digest();
    
//     let code = '';
//     for (let i = 0; i < 8; i++) {
//       code += ALPHABET[hash[i] % ALPHABET.length];
//     }
    
//     return code;
//   }

//   generateCustom(input) {
//     const hash = crypto
//       .createHash('sha256')
//       .update(input)
//       .digest();
    
//     let code = '';
//     for (let i = 0; i < 8; i++) {
//       code += ALPHABET[hash[i] % ALPHABET.length];
//     }
    
//     return code.substring(0, 8);
//   }
// }

// export const generator = new SnowflakeGenerator();
