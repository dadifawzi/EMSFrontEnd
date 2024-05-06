export class Client {
  id: number;
  name: string;
  city: string;
  distance: number;
  [key: string]: any;
  constructor(id: number, name: string, city: string, distance: number) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.distance = distance;
  }
}
