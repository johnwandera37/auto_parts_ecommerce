//The following gets rid of typescript error when globalThis.io is used
import type { Server as IOServer } from "socket.io";

declare global {
  // Websoket type
  var io: IOServer | undefined;

  type UserRole = "USER" | "ADMIN";

  interface User {
    id: string;
    name: string;
    role: UserRole;
    email?: string;
  }
}
