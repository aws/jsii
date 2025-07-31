/**
 * Utility class for testing environment variable synchronization
 */
export class EnvironmentUtils {
  /**
   * Set an environment variable in Node.js process.env
   */
  public setEnvironmentVariable(key: string, value: string): void {
    process.env[key] = value;
  }

  /**
   * Get an environment variable from Node.js process.env
   */
  public getEnvironmentVariable(key: string): string | undefined {
    return process.env[key];
  }

  /**
   * Delete an environment variable from Node.js process.env
   */
  public deleteEnvironmentVariable(key: string): void {
    delete process.env[key];
  }

  /**
   * Load environment variables from a simple key=value format
   * Simulates dotenv functionality for testing
   */
  public loadEnvironmentFromString(envString: string): void {
    const lines = envString.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=');
          process.env[key.trim()] = value.trim();
        }
      }
    }
  }

  /**
   * Get all environment variables as a plain object
   */
  public listAllEnvironmentVariables(): Record<string, string> {
    // Filter out undefined values since JSII doesn't support optional types in return values
    const env: Record<string, string> = {};
    for (const [key, value] of Object.entries(process.env)) {
      if (value !== undefined) {
        env[key] = value;
      }
    }
    return env;
  }

  /**
   * Check if an environment variable exists
   */
  public hasEnvironmentVariable(key: string): boolean {
    return key in process.env;
  }
}
