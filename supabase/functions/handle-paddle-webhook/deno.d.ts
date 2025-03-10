declare namespace Deno {
    export interface ServeHandlerInfo {
      remoteAddr: {
        hostname: string;
        port: number;
        transport: string;
      };
    }
  
    export interface RequestEvent {
      request: Request;
      respondWith(response: Response | Promise<Response>): Promise<void>;
    }
  
    export function serve(
      handler: (request: Request, info: ServeHandlerInfo) => Response | Promise<Response>
    ): void;

    export const env: {
        get(key: string): string | undefined;
        set(key: string, value: string): void;
        toObject(): { [key: string]: string };
      };
  }