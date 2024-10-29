import readline from 'node:readline';
import { cikkbeolvasas, getAllPosts } from './cikk.controllers.js';

export const olvas = async () =>{
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  {
    rl.on(`line`, name => {
      cikkbeolvasas(name)
      getAllPosts()
      return rl
    });
  }
}
