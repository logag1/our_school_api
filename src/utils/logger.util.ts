import fs from 'fs';
import path from 'path';

enum LogType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  AUTH = 'AUTH',
  DEBUG = 'DEBUG',
  WARN = 'WARN'
}

interface LogEntry {
  type: LogType;
  message: string;
  color: string;
  timestamp: string;
}

export default class Logger {
  private _projectName: string;
  private _logPath: string;

  constructor(projectName: string) {
    this._projectName = projectName;
    this._logPath = path.join(__dirname, '..', '..', 'logs');
  }

  private getLogFileName(date: Date): string {
    return `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}.log`;
  }

  private formatTimestamp(date: Date): string {
    const yearData = date.toISOString().split('T')[0] + 'T';
    const seconds = date.getSeconds();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    const timeData = `${date.getHours()}:${date.getMinutes()}:${formattedSeconds}`;
    return yearData + timeData;
  }

  private async writeLog(logEntry: LogEntry) {
    const logFileName = this.getLogFileName(new Date());
    let logText = `\x1b[36m${logEntry.timestamp}\x1b[0m ${logEntry.color}[${logEntry.type} #${this._projectName}]:\x1b[0m ${logEntry.message}`;

    console.log(logText);

    try {
      logText = logText.replace(/\x1b\[\d+m/g, '');
      await fs.promises.appendFile(path.join(this._logPath, logFileName), logText + '\n');
    } catch (error) {
      throw new Error(`Error writing to log file: ${error}`);
    }
  }

  private log(type: LogType, message: string, color: string) {
    const timestamp = this.formatTimestamp(new Date());
    const logEntry: LogEntry = { type, message, color, timestamp };
    this.writeLog(logEntry);
  }

  info(message: string) {
    this.log(LogType.INFO, message, '\x1b[32m');
  }

  error(message: string) {
    this.log(LogType.ERROR, message, '\x1b[31m');
  }

  auth(message: string) {
    this.log(LogType.AUTH, message, '\x1b[31m\x1b[93m');
  }

  debug(message: string) {
    this.log(LogType.DEBUG, message, '\x1b[34m');
  }

  warn(message: string) {
    this.log(LogType.WARN, message, '\x1b[31m');
  }
}
