export interface Observer {
  notify(): void
}

export interface Observerable {
  subscribe(observer: Observer): void
  unsubscribe(observer: Observer): void

  // Observerable should have this private method
  // notifyAll(): void
}
