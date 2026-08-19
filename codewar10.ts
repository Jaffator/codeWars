type VehicleInfoType = [brand: string, model: string, year: number];
type CarInfoType = [...VehicleInfoType, numDoor: number];
type MotorcycleInfoType = [...VehicleInfoType, engineVolume: number];
class Vehicle {
  public brand: string;
  public model: string;
  public year: number;
  constructor(...[brand, model, year]: VehicleInfoType) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }
  getInfo(): string {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}

class Car extends Vehicle {
  private numDoors: number;
  constructor(...[brand, model, year, numDoors]: CarInfoType) {
    super(brand, model, year);
    this.numDoors = numDoors;
  }
  getInfo(): string {
    return `${super.getInfo()}-${this.numDoors} dveří`;
  }
}

class Motorcycle extends Vehicle {
  private engineVolume: number;
  constructor(...[brand, model, year, engineVolume]: MotorcycleInfoType) {
    super(brand, model, year);
    this.engineVolume = engineVolume;
  }

  getInfo(): string {
    return `${super.getInfo()} - ${this.engineVolume}ccm`;
  }
}
class Garage {
  private listVehicles: Vehicle[] = [];
  constructor() {}
  addVehicle(newVehicle: Vehicle) {
    this.listVehicles.push(newVehicle);
  }
  findByBrand(brand: string) {
    const result = this.listVehicles.filter((vehicle) => vehicle.brand === brand);
    return result;
  }
}

const garage = new Garage();
garage.addVehicle(new Car("Skoda", "Ocativa", 2020, 5));
garage.addVehicle(new Car("Skoda", "Shit", 2020, 5));
garage.addVehicle(new Car("BMW", "Scala", 2015, 2));
const res = garage.findByBrand("Skoda");
// console.log(res?.getInfo());
res.forEach((r) => console.log(r.getInfo()));
