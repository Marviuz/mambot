import type { ClientEvents } from 'discord.js';

export type Events = keyof ClientEvents;
export type EventListeners<T extends Events> = (
  ...args: ClientEvents[T]
) => void;

export class Event<T extends Events> {
  public event: T;
  public listener: EventListeners<T>;

  constructor(event: T, listener: EventListeners<T>) {
    this.event = event;
    this.listener = listener;
  }
}
