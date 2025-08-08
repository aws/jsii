export interface EnvironmentChangeEvent {
  readonly type: 'set' | 'delete';
  readonly key: string;
  readonly value?: string;
  readonly oldValue?: string;
}

export type EnvironmentChangeHandler = (event: EnvironmentChangeEvent) => void;

/**
 * Monitors Node.js process.env for changes and provides automatic synchronization
 * with external processes through callback notifications.
 */
export class EnvironmentMonitor {
  private readonly originalEnv: typeof process.env;
  private readonly changeHandler: EnvironmentChangeHandler;
  private monitoringEnabled = true;

  public constructor(changeHandler: EnvironmentChangeHandler) {
    this.changeHandler = changeHandler;
    this.originalEnv = process.env;
    this.wrapProcessEnv();
  }

  /**
   * Wraps process.env with a Proxy to intercept all property operations
   */
  private wrapProcessEnv(): void {
    // Create a proxy that intercepts all process.env operations
    process.env = new Proxy(this.originalEnv, {
      set: (target: any, prop: string | symbol, value: any): boolean => {
        if (typeof prop === 'string' && this.monitoringEnabled) {
          const oldValue = target[prop];
          const newValue = value != null ? String(value) : undefined;

          // Set the value first
          if (newValue !== undefined) {
            target[prop] = newValue;
          } else {
            delete target[prop];
          }

          // Immediately notify of change (synchronous)
          this.changeHandler({
            type: newValue !== undefined ? 'set' : 'delete',
            key: prop,
            value: newValue,
            oldValue,
          });
        } else {
          // Direct assignment without monitoring
          if (value != null) {
            target[prop as string] = String(value);
          } else {
            delete target[prop as string];
          }
        }
        return true;
      },

      deleteProperty: (target: any, prop: string | symbol): boolean => {
        if (typeof prop === 'string' && this.monitoringEnabled) {
          const oldValue = target[prop];
          delete target[prop];

          // Immediately notify of deletion (synchronous)
          this.changeHandler({
            type: 'delete',
            key: prop,
            oldValue,
          });
        } else {
          // Direct deletion without monitoring
          delete target[prop as string];
        }
        return true;
      },
    });
  }

  /**
   * Apply changes from external source (Python) without triggering monitoring
   */
  public applyChange(event: EnvironmentChangeEvent): void {
    // Temporarily disable monitoring to avoid infinite loop
    this.monitoringEnabled = false;

    try {
      if (event.type === 'set' && event.value !== undefined) {
        this.originalEnv[event.key] = event.value;
      } else if (event.type === 'delete') {
        delete this.originalEnv[event.key];
      }
    } finally {
      // Re-enable monitoring
      this.monitoringEnabled = true;
    }
  }

  /**
   * Disable monitoring temporarily
   */
  public disableMonitoring(): void {
    this.monitoringEnabled = false;
  }

  /**
   * Re-enable monitoring
   */
  public enableMonitoring(): void {
    this.monitoringEnabled = true;
  }
}
