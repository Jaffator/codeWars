interface BaseSensorEvent {
  id: number;
  timestamp: number;
}

export interface SuspensionBottomOutEvent extends BaseSensorEvent {
  type: "SuspensionBottomOut";
  bottomOut: number;
}
export interface HeartRateSpikeEvent extends BaseSensorEvent {
  type: "HeartRateSpike";
  rateSpike: number;
}

export type SensorEvent = SuspensionBottomOutEvent | HeartRateSpikeEvent;
export type SensorEventType = "SuspensionBottomOut" | "HeartRateSpike";
type EventOf<T extends SensorEventType> = Extract<SensorEvent, { type: T }>;
type Listener<T extends SensorEventType = SensorEventType> = (event: EventOf<T>) => void;

class Dispatcher {
  private listener = new Map<string, Function[]>();

  subscribe<T extends SensorEventType>(type: T, callback: Listener<T>): void {
    if (!this.listener.get(type)) {
      this.listener.set(type, []);
    }
    this.listener.get(type)!.push(callback);
  }

  publish(event: SensorEvent) {
    const callbacks = this.listener.get(event.type);
    if (callbacks) {
      for (const callback of callbacks) {
        callback(event);
      }
    }
  }

  getListener() {
    return this.listener;
  }
}

class RideProcessor {
  private dispatcher: Dispatcher;

  constructor(dispacther: Dispatcher) {
    this.dispatcher = dispacther;
  }
  async processStream(events: SensorEvent[], onComplete: Function): Promise<void> {
    const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
    for (const event of events) {
      await sleep(1000);
      this.dispatcher.publish(event);
    }
    onComplete();
  }
}

async function main(): Promise<void> {
  const events: SensorEvent[] = [
    {
      type: "SuspensionBottomOut",
      bottomOut: 195,
      id: 1,
      timestamp: Date.now(),
    },
    {
      type: "SuspensionBottomOut",
      bottomOut: 205,
      id: 2,
      timestamp: Date.now(),
    },
    {
      type: "HeartRateSpike",
      rateSpike: 85,
      id: 1,
      timestamp: Date.now(),
    },
  ];

  const dispacther = new Dispatcher();
  const rideProcessor = new RideProcessor(dispacther);
  dispacther.subscribe("SuspensionBottomOut", (e) => console.log(e.bottomOut));
  dispacther.subscribe("HeartRateSpike", (e) => console.log(e.rateSpike));
  await rideProcessor.processStream(events, () => console.log("Stream Complete"));
}
main();
