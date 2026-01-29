declare module 'mssql' {
  export interface IOptions {
    encrypt?: boolean;
    trustServerCertificate?: boolean;
    enableArithAbort?: boolean;
  }

  export interface config {
    server: string;
    port?: number;
    user: string;
    password: string;
    database: string;
    options?: IOptions;
  }

  export interface IRequest {
    input(name: string, value: string | number | Date | boolean): IRequest;
    query(command: string): Promise<{ recordset: unknown[] }>;
  }

  export interface ConnectionPool {
    request(): IRequest;
    close(): Promise<void>;
  }

  export function connect(config: config): Promise<ConnectionPool>;
}
