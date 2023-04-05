// part 1
class Vehicle {
    constructor(make,model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return 'beep'
    }

    toString() {
        return 'The vehicle is a ${this.year} ${this.make} ${this.model}'
    }
}

// part2
class Car extends Vehicle {
    constructor(make, model, year) {
      super(make, model, year);
      this.numWheels = 4;
    }
}

// part 3
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
      super(make, model, year);
      this.numWheels = 2;
    }
  
    revEngine() {
      return "VROOM!!!";
    }
}
// part 4
class Garage {
    constructor(capacity) {
      this.vehicles = [];
      this.capacity = capacity;
    }
    add(addedVehicle) {
        if(!addedVehicle instanceof Vehicle) {
            return 'Only vehicles can be added'
        }
        if(addedVehicle.make === 'kia') {
            return 'Not allowed!'
        }
        if(this.vehicles.length > this.capacity) {
            return 'The garage is full'
        }
        else {
            this.vehicles.push(addedVehicle)
        }
    }
}