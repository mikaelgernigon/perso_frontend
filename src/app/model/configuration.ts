import { User } from "./user";

export type Configuration = {
    production: boolean;
    apiUrl: string;
    keycloakUrl: string;
    localhost: string;
    currentUser: User;
    accessToken: string;
}