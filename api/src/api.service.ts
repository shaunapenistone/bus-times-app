import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

export interface BusTime {
  id: number;
  busId: number;
  destination: string;
  minutesUntilArrival: number;
  nonOperationalDays?: number;
}

const busRoutes = [
  { id: 176, destination: 'Newham Close', nonOperationalDays: [1, 3] },
  { id: 185, destination: 'Train Station', nonOperationalDays: [5, 2] },
  {
    id: 193,
    destination: 'Shopping Centre',
    nonOperationalDays: [1, 5, 4],
  },
];

const today = new Date().getDay();

@Injectable()
export class ApiService {
  getBusTimes() {
    return this.generateRandomBusTimes(5);
  }

  getRunningBus() {
    return this.returnRunningBuses();
  }

  private generateRandomBusTimes(timesToGenerate: number) {
    const data: BusTime[] = [];
    for (let i = 0; i < timesToGenerate; i++) {
      const {
        id: busId,
        destination,
        nonOperationalDays,
      } = this.getRandomBusRoute();
      // check to see if this bus is running today, if so then we should append to the array of data
      if (!nonOperationalDays.includes(today)) {
        data.push({
          id: i,
          busId,
          destination,
          minutesUntilArrival: _.random(1, 15),
        });
      }
    }

    const sortNumerically = (a: BusTime, b: BusTime) => {
      {
        if (a.minutesUntilArrival < b.minutesUntilArrival) {
          return -1;
        }
        if (a.minutesUntilArrival > b.minutesUntilArrival) {
          return 1;
        }
        return 0;
      }
    };

    return data.sort(sortNumerically);
  }

  private returnRunningBuses() {
    return busRoutes.filter((bus) => !bus.nonOperationalDays.includes(today));
  }

  private getRandomBusRoute() {
    return busRoutes[_.random(0, busRoutes.length - 1)];
  }
}
