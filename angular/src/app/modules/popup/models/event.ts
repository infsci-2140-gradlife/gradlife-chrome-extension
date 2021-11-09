export class Event {
    name: string;
    description?: string;
    location: string;
    date = new Date(Date.now());
}