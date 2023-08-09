import { SafeUrl } from "@angular/platform-browser";

export interface Image {
    id: string;
    filename: string;
    imageUrl: SafeUrl;
}