export class Logger {
  static info(message: string): void {
    console.log(`[INFO] [${new Date().toISOString()}] ${message}`);
  }

  static error(message:string):void{
    console.log(`[ERROR] [${new Date().toISOString()}] ${message}`);
  }

}