import * as bcrypt from 'bcrypt';

//Custom harshing
export class Hashing {
  static async harshPassword(content: string): Promise<string> {
    return await bcrypt.hash(content, +process.env.PWD_SALT);
  }
}
