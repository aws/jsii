import {
  EnvironmentMonitor,
  EnvironmentChangeEvent,
} from './environment-monitor';

describe('EnvironmentMonitor', () => {
  let originalEnv: typeof process.env;
  let changeHandler: jest.Mock;
  let monitor: EnvironmentMonitor;

  beforeEach(() => {
    // Save original process.env
    originalEnv = { ...process.env };

    // Clear test environment variables
    delete process.env.TEST_VAR;
    delete process.env.TEST_VAR_2;
    delete process.env.DELETE_TEST;

    // Create mock change handler
    changeHandler = jest.fn();

    // Create monitor instance
    monitor = new EnvironmentMonitor(changeHandler);
  });

  afterEach(() => {
    // Restore original process.env
    process.env = { ...originalEnv };

    // Clear mock
    changeHandler.mockClear();
  });

  describe('constructor', () => {
    test('should create monitor and wrap process.env', () => {
      expect(monitor).toBeDefined();
      expect(typeof changeHandler).toBe('function');
    });

    test('should preserve existing environment variables', () => {
      const existingVar = process.env.PATH;
      expect(existingVar).toBeDefined();

      // Create new monitor
      const newHandler = jest.fn();
      new EnvironmentMonitor(newHandler);

      // Should still have existing variable
      expect(process.env.PATH).toBe(existingVar);
    });
  });

  describe('environment variable setting', () => {
    test('should detect when environment variable is set', () => {
      process.env.TEST_VAR = 'test_value';

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_VAR',
        value: 'test_value',
        oldValue: undefined,
      });
    });

    test('should detect when environment variable is updated', () => {
      // Set initial value
      process.env.TEST_VAR = 'initial';
      changeHandler.mockClear();

      // Update value
      process.env.TEST_VAR = 'updated';

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_VAR',
        value: 'updated',
        oldValue: 'initial',
      });
    });

    test('should handle empty string values', () => {
      process.env.TEST_VAR = '';

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_VAR',
        value: '',
        oldValue: undefined,
      });
    });

    test('should handle unicode values', () => {
      const unicodeValue = 'Hello 世界 🌍 Ñiño';
      process.env.TEST_VAR = unicodeValue;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_VAR',
        value: unicodeValue,
        oldValue: undefined,
      });
    });

    test('should handle large values', () => {
      const largeValue = 'x'.repeat(1024);
      process.env.TEST_VAR = largeValue;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_VAR',
        value: largeValue,
        oldValue: undefined,
      });
    });
  });

  describe('environment variable deletion', () => {
    test('should detect when environment variable is deleted', () => {
      // Set initial value
      process.env.DELETE_TEST = 'to_be_deleted';
      changeHandler.mockClear();

      // Delete variable
      delete process.env.DELETE_TEST;

      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith({
        type: 'delete',
        key: 'DELETE_TEST',
        oldValue: 'to_be_deleted',
      });
    });

    test('should handle deleting non-existent variable', () => {
      delete process.env.NON_EXISTENT_VAR;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'delete',
        key: 'NON_EXISTENT_VAR',
        oldValue: undefined,
      });
    });
  });

  describe('multiple operations', () => {
    test('should track multiple variable changes', () => {
      process.env.VAR1 = 'value1';
      process.env.VAR2 = 'value2';
      process.env.VAR3 = 'value3';

      expect(changeHandler).toHaveBeenCalledTimes(3);

      expect(changeHandler).toHaveBeenNthCalledWith(1, {
        type: 'set',
        key: 'VAR1',
        value: 'value1',
        oldValue: undefined,
      });

      expect(changeHandler).toHaveBeenNthCalledWith(2, {
        type: 'set',
        key: 'VAR2',
        value: 'value2',
        oldValue: undefined,
      });

      expect(changeHandler).toHaveBeenNthCalledWith(3, {
        type: 'set',
        key: 'VAR3',
        value: 'value3',
        oldValue: undefined,
      });
    });

    test('should handle rapid consecutive changes', () => {
      for (let i = 0; i < 5; i++) {
        process.env.RAPID_TEST = `value_${i}`;
      }

      expect(changeHandler).toHaveBeenCalledTimes(5);

      // Check last call
      expect(changeHandler).toHaveBeenLastCalledWith({
        type: 'set',
        key: 'RAPID_TEST',
        value: 'value_4',
        oldValue: 'value_3',
      });
    });
  });

  describe('applyChange method', () => {
    test('should apply set change without triggering handler', () => {
      const event: EnvironmentChangeEvent = {
        type: 'set',
        key: 'EXTERNAL_VAR',
        value: 'external_value',
      };

      monitor.applyChange(event);

      expect(process.env.EXTERNAL_VAR).toBe('external_value');
      expect(changeHandler).not.toHaveBeenCalled();
    });

    test('should apply delete change without triggering handler', () => {
      // Set initial value through normal means
      process.env.TO_DELETE = 'initial';
      changeHandler.mockClear();

      const event: EnvironmentChangeEvent = {
        type: 'delete',
        key: 'TO_DELETE',
      };

      monitor.applyChange(event);

      expect(process.env.TO_DELETE).toBeUndefined();
      expect(changeHandler).not.toHaveBeenCalled();
    });

    test('should handle applying change for non-existent variable', () => {
      const event: EnvironmentChangeEvent = {
        type: 'delete',
        key: 'NON_EXISTENT',
      };

      // Should not throw
      expect(() => monitor.applyChange(event)).not.toThrow();
      expect(changeHandler).not.toHaveBeenCalled();
    });

    test('should apply set with undefined value as no-op', () => {
      const event: EnvironmentChangeEvent = {
        type: 'set',
        key: 'UNDEFINED_VALUE',
        value: undefined,
      };

      monitor.applyChange(event);

      expect(process.env.UNDEFINED_VALUE).toBeUndefined();
      expect(changeHandler).not.toHaveBeenCalled();
    });

    test('should re-enable monitoring after applying change', () => {
      const event: EnvironmentChangeEvent = {
        type: 'set',
        key: 'EXTERNAL_VAR',
        value: 'external_value',
      };

      monitor.applyChange(event);

      // Monitoring should be re-enabled
      process.env.TEST_AFTER_APPLY = 'test';
      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_AFTER_APPLY',
        value: 'test',
        oldValue: undefined,
      });
    });
  });

  describe('monitoring control', () => {
    test('should disable monitoring', () => {
      monitor.disableMonitoring();

      process.env.TEST_VAR = 'test_value';

      expect(process.env.TEST_VAR).toBe('test_value');
      expect(changeHandler).not.toHaveBeenCalled();
    });

    test('should re-enable monitoring', () => {
      monitor.disableMonitoring();
      monitor.enableMonitoring();

      process.env.TEST_VAR = 'test_value';

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'TEST_VAR',
        value: 'test_value',
        oldValue: undefined,
      });
    });
  });

  describe('type conversion', () => {
    test('should convert non-string values to strings', () => {
      (process.env as any).NUMBER_VAR = 123;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'NUMBER_VAR',
        value: '123',
        oldValue: undefined,
      });
    });

    test('should handle boolean values', () => {
      (process.env as any).BOOL_VAR = true;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'BOOL_VAR',
        value: 'true',
        oldValue: undefined,
      });
    });

    test('should handle null values as deletion', () => {
      // Set initial value
      process.env.NULL_TEST = 'initial';
      changeHandler.mockClear();

      // Set to null
      (process.env as any).NULL_TEST = null;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'delete',
        key: 'NULL_TEST',
        oldValue: 'initial',
      });

      expect(process.env.NULL_TEST).toBeUndefined();
    });

    test('should handle undefined values as deletion', () => {
      // Set initial value
      process.env.UNDEFINED_TEST = 'initial';
      changeHandler.mockClear();

      // Set to undefined
      (process.env as any).UNDEFINED_TEST = undefined;

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'delete',
        key: 'UNDEFINED_TEST',
        oldValue: 'initial',
      });

      expect(process.env.UNDEFINED_TEST).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    test('should handle special characters in variable names', () => {
      process.env['VAR_WITH-DASH'] = 'dash_value';

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: 'VAR_WITH-DASH',
        value: 'dash_value',
        oldValue: undefined,
      });
    });

    test('should handle numeric-like variable names', () => {
      process.env['123'] = 'numeric_name';

      expect(changeHandler).toHaveBeenCalledWith({
        type: 'set',
        key: '123',
        value: 'numeric_name',
        oldValue: undefined,
      });
    });

    test('should handle symbol properties gracefully', () => {
      const sym = Symbol('test');

      // Should not throw when setting symbol property
      expect(() => {
        (process.env as any)[sym] = 'symbol_value';
      }).not.toThrow();

      // Should not have called handler for symbol
      expect(changeHandler).not.toHaveBeenCalled();
    });

    test('should maintain process.env behavior for in operator', () => {
      process.env.EXISTENCE_TEST = 'exists';

      expect('EXISTENCE_TEST' in process.env).toBe(true);
      expect('NON_EXISTENT' in process.env).toBe(false);
    });

    test('should maintain process.env behavior for Object.keys', () => {
      const keys = Object.keys(process.env);
      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBeGreaterThan(0);
    });
  });

  describe('concurrent access', () => {
    test('should handle concurrent modifications', async () => {
      const promises = [];

      for (let i = 0; i < 10; i++) {
        promises.push(
          Promise.resolve().then(() => {
            process.env[`CONCURRENT_${i}`] = `value_${i}`;
          }),
        );
      }

      await Promise.all(promises);

      expect(changeHandler).toHaveBeenCalledTimes(10);

      // Verify all variables are set
      for (let i = 0; i < 10; i++) {
        expect(process.env[`CONCURRENT_${i}`]).toBe(`value_${i}`);
      }
    });
  });
});
