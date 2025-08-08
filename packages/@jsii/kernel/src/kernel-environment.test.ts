import * as api from './api';
import { Kernel } from './kernel';

describe('Kernel Environment Change Integration', () => {
  let originalEnv: typeof process.env;
  let callbackHandler: jest.Mock;
  let kernel: Kernel;

  beforeEach(() => {
    // Save original process.env
    originalEnv = { ...process.env };

    // Clear test environment variables
    delete process.env.JSII_KERNEL_TEST_VAR;
    delete process.env.JSII_KERNEL_DELETE_TEST;
    delete process.env.EXTERNAL_SYNC_TEST;

    // Create mock callback handler
    callbackHandler = jest.fn();

    // Create kernel instance
    kernel = new Kernel(callbackHandler);
  });

  afterEach(() => {
    // Restore original process.env
    process.env = { ...originalEnv };

    // Clear mock
    callbackHandler.mockClear();
  });

  describe('kernel initialization', () => {
    test('should create kernel with environment monitoring enabled', () => {
      expect(kernel).toBeDefined();
      expect(callbackHandler).toBeDefined();
    });

    test('should automatically detect environment changes after kernel creation', () => {
      process.env.JSII_KERNEL_TEST_VAR = 'test_value';

      // Callback handler should be called with environment change notification
      expect(callbackHandler).toHaveBeenCalledTimes(1);

      const call = callbackHandler.mock.calls[0][0];
      expect(call.cookie).toBe('env-sync');
      expect(call.envChange).toEqual({
        type: 'set',
        key: 'JSII_KERNEL_TEST_VAR',
        value: 'test_value',
        oldValue: undefined,
      });
    });
  });

  describe('environment change detection', () => {
    test('should detect environment variable setting', () => {
      process.env.TEST_SET_VAR = 'new_value';

      expect(callbackHandler).toHaveBeenCalledTimes(1);

      const call = callbackHandler.mock.calls[0][0];
      expect(call.cookie).toBe('env-sync');
      expect(call.envChange.type).toBe('set');
      expect(call.envChange.key).toBe('TEST_SET_VAR');
      expect(call.envChange.value).toBe('new_value');
      expect(call.envChange.oldValue).toBeUndefined();
    });

    test('should detect environment variable updating', () => {
      // Set initial value
      process.env.TEST_UPDATE_VAR = 'initial';
      callbackHandler.mockClear();

      // Update value
      process.env.TEST_UPDATE_VAR = 'updated';

      expect(callbackHandler).toHaveBeenCalledTimes(1);

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.type).toBe('set');
      expect(call.envChange.key).toBe('TEST_UPDATE_VAR');
      expect(call.envChange.value).toBe('updated');
      expect(call.envChange.oldValue).toBe('initial');
    });

    test('should detect environment variable deletion', () => {
      // Set initial value
      process.env.JSII_KERNEL_DELETE_TEST = 'to_be_deleted';
      callbackHandler.mockClear();

      // Delete variable
      delete process.env.JSII_KERNEL_DELETE_TEST;

      expect(callbackHandler).toHaveBeenCalledTimes(1);

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.type).toBe('delete');
      expect(call.envChange.key).toBe('JSII_KERNEL_DELETE_TEST');
      expect(call.envChange.oldValue).toBe('to_be_deleted');
    });

    test('should generate unique callback IDs for each change', () => {
      process.env.VAR1 = 'value1';
      process.env.VAR2 = 'value2';

      expect(callbackHandler).toHaveBeenCalledTimes(2);

      const call1 = callbackHandler.mock.calls[0][0];
      const call2 = callbackHandler.mock.calls[1][0];

      expect(call1.cbid).toBeDefined();
      expect(call2.cbid).toBeDefined();
      expect(call1.cbid).not.toBe(call2.cbid);
    });

    test('should handle callback handler errors gracefully', () => {
      // Make callback handler throw
      callbackHandler.mockImplementation(() => {
        throw new Error('Callback error');
      });

      // Should not throw when environment changes
      expect(() => {
        process.env.ERROR_TEST = 'error_value';
      }).not.toThrow();

      // Should still have attempted to call the handler
      expect(callbackHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('env.notifyChange API', () => {
    test('should handle environment change request from external source', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'EXTERNAL_SYNC_TEST',
        value: 'external_value',
        type: 'set',
      };

      const response = kernel['env.notifyChange'](request);

      expect(response.success).toBe(true);
      expect(process.env.EXTERNAL_SYNC_TEST).toBe('external_value');

      // Should not trigger callback since this was an external change
      expect(callbackHandler).not.toHaveBeenCalled();
    });

    test('should handle environment variable deletion from external source', () => {
      // Set initial value
      process.env.EXTERNAL_DELETE_TEST = 'initial';
      callbackHandler.mockClear();

      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'EXTERNAL_DELETE_TEST',
        type: 'delete',
      };

      const response = kernel['env.notifyChange'](request);

      expect(response.success).toBe(true);
      expect(process.env.EXTERNAL_DELETE_TEST).toBeUndefined();
      expect(callbackHandler).not.toHaveBeenCalled();
    });

    test('should handle set request with undefined value', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'UNDEFINED_VALUE_TEST',
        value: undefined,
        type: 'set',
      };

      const response = kernel['env.notifyChange'](request);

      expect(response.success).toBe(true);
      // Should not set the variable if value is undefined
      expect(process.env.UNDEFINED_VALUE_TEST).toBeUndefined();
    });

    test('should track oldValue when applying external changes', () => {
      // Set initial value
      process.env.OLD_VALUE_TEST = 'original';
      callbackHandler.mockClear();

      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'OLD_VALUE_TEST',
        value: 'updated_externally',
        type: 'set',
      };

      const response = kernel['env.notifyChange'](request);

      expect(response.success).toBe(true);
      expect(process.env.OLD_VALUE_TEST).toBe('updated_externally');
    });
  });

  describe('bidirectional synchronization', () => {
    test('should handle environment changes after external sync', () => {
      // Apply external change
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'BIDIRECTIONAL_TEST',
        value: 'from_external',
        type: 'set',
      };

      kernel['env.notifyChange'](request);
      expect(process.env.BIDIRECTIONAL_TEST).toBe('from_external');

      // Now change from Node.js side
      process.env.BIDIRECTIONAL_TEST = 'from_nodejs';

      expect(callbackHandler).toHaveBeenCalledTimes(1);

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.type).toBe('set');
      expect(call.envChange.key).toBe('BIDIRECTIONAL_TEST');
      expect(call.envChange.value).toBe('from_nodejs');
      expect(call.envChange.oldValue).toBe('from_external');
    });

    test('should handle multiple rapid external changes', () => {
      for (let i = 0; i < 5; i++) {
        const request: api.EnvironmentChangeRequest = {
          api: 'env.notifyChange',
          key: 'RAPID_EXTERNAL_TEST',
          value: `external_value_${i}`,
          type: 'set',
        };

        kernel['env.notifyChange'](request);
      }

      expect(process.env.RAPID_EXTERNAL_TEST).toBe('external_value_4');
      expect(callbackHandler).not.toHaveBeenCalled();
    });

    test('should maintain monitoring after external changes', () => {
      // Apply external change
      kernel['env.notifyChange']({
        api: 'env.notifyChange',
        key: 'MONITORING_TEST',
        value: 'external',
        type: 'set',
      });

      // Verify monitoring is still active
      process.env.AFTER_EXTERNAL_TEST = 'test';

      expect(callbackHandler).toHaveBeenCalledTimes(1);
      expect(callbackHandler.mock.calls[0][0].envChange.key).toBe(
        'AFTER_EXTERNAL_TEST',
      );
    });
  });

  describe('special values and edge cases', () => {
    test('should handle empty string values', () => {
      process.env.EMPTY_STRING_TEST = '';

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.value).toBe('');
      expect(call.envChange.type).toBe('set');
    });

    test('should handle unicode values', () => {
      const unicodeValue = 'Hello 世界 🌍 Ñiño';
      process.env.UNICODE_TEST = unicodeValue;

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.value).toBe(unicodeValue);
    });

    test('should handle large values', () => {
      const largeValue = 'x'.repeat(1024);
      process.env.LARGE_VALUE_TEST = largeValue;

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.value).toBe(largeValue);
    });

    test('should handle numeric-like variable names', () => {
      process.env['123'] = 'numeric_name';

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.key).toBe('123');
      expect(call.envChange.value).toBe('numeric_name');
    });

    test('should handle special characters in variable names', () => {
      process.env['VAR_WITH-DASH'] = 'dash_value';

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.key).toBe('VAR_WITH-DASH');
      expect(call.envChange.value).toBe('dash_value');
    });

    test('should convert non-string values to strings', () => {
      (process.env as any).NUMBER_TEST = 123;

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.value).toBe('123');
      expect(typeof call.envChange.value).toBe('string');
    });

    test('should handle null values as deletion', () => {
      // Set initial value
      process.env.NULL_TEST = 'initial';
      callbackHandler.mockClear();

      // Set to null
      (process.env as any).NULL_TEST = null;

      const call = callbackHandler.mock.calls[0][0];
      expect(call.envChange.type).toBe('delete');
      expect(call.envChange.key).toBe('NULL_TEST');
      expect(call.envChange.oldValue).toBe('initial');
      expect(process.env.NULL_TEST).toBeUndefined();
    });
  });

  describe('callback structure validation', () => {
    test('should generate callbacks with correct structure', () => {
      process.env.CALLBACK_STRUCTURE_TEST = 'test_value';

      expect(callbackHandler).toHaveBeenCalledTimes(1);

      const call = callbackHandler.mock.calls[0][0];

      // Validate callback structure
      expect(call).toHaveProperty('cbid');
      expect(call).toHaveProperty('cookie', 'env-sync');
      expect(call).toHaveProperty('envChange');

      // Validate envChange structure
      expect(call.envChange).toHaveProperty('type');
      expect(call.envChange).toHaveProperty('key');
      expect(['set', 'delete']).toContain(call.envChange.type);

      if (call.envChange.type === 'set') {
        expect(call.envChange).toHaveProperty('value');
      }
    });

    test('should not include other callback properties for env changes', () => {
      process.env.CALLBACK_PROPS_TEST = 'test';

      const call = callbackHandler.mock.calls[0][0];

      // Should not have other callback properties
      expect(call.invoke).toBeUndefined();
      expect(call.get).toBeUndefined();
      expect(call.set).toBeUndefined();
    });
  });

  describe('error handling', () => {
    test('should handle malformed environment change requests', () => {
      const malformedRequest = {
        api: 'env.notifyChange',
        // missing required fields
      } as any;

      // Should not throw
      expect(() => {
        kernel['env.notifyChange'](malformedRequest);
      }).not.toThrow();
    });

    test('should return success for valid requests even with missing optional fields', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'MINIMAL_REQUEST_TEST',
        type: 'delete',
        // value is optional for delete
      };

      const response = kernel['env.notifyChange'](request);
      expect(response.success).toBe(true);
    });
  });

  describe('performance and stability', () => {
    test('should handle many consecutive environment changes', () => {
      const numChanges = 100;

      for (let i = 0; i < numChanges; i++) {
        process.env[`PERF_TEST_${i}`] = `value_${i}`;
      }

      expect(callbackHandler).toHaveBeenCalledTimes(numChanges);

      // Verify all changes were captured
      for (let i = 0; i < numChanges; i++) {
        expect(process.env[`PERF_TEST_${i}`]).toBe(`value_${i}`);
      }
    });

    test('should handle alternating set and delete operations', () => {
      for (let i = 0; i < 10; i++) {
        process.env.ALTERNATING_TEST = `value_${i}`;
        delete process.env.ALTERNATING_TEST;
      }

      expect(callbackHandler).toHaveBeenCalledTimes(20); // 10 sets + 10 deletes
      expect(process.env.ALTERNATING_TEST).toBeUndefined();
    });
  });
});
