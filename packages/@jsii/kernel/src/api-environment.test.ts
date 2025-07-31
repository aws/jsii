import * as api from './api';

describe('Environment Change API Types', () => {
  describe('EnvironmentChangeRequest', () => {
    test('should have correct structure for set operation', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'TEST_VAR',
        value: 'test_value',
        type: 'set',
      };

      expect(request.api).toBe('env.notifyChange');
      expect(request.key).toBe('TEST_VAR');
      expect(request.value).toBe('test_value');
      expect(request.type).toBe('set');
    });

    test('should have correct structure for delete operation', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'TEST_VAR',
        type: 'delete',
      };

      expect(request.api).toBe('env.notifyChange');
      expect(request.key).toBe('TEST_VAR');
      expect(request.value).toBeUndefined();
      expect(request.type).toBe('delete');
    });

    test('should allow undefined value for delete operations', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'DELETE_VAR',
        type: 'delete',
        value: undefined,
      };

      expect(request.value).toBeUndefined();
      expect(request.type).toBe('delete');
    });

    test('should serialize correctly as JSON', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'JSON_TEST',
        value: 'json_value',
        type: 'set',
      };

      const jsonString = JSON.stringify(request);
      const parsed = JSON.parse(jsonString);

      expect(parsed.api).toBe('env.notifyChange');
      expect(parsed.key).toBe('JSON_TEST');
      expect(parsed.value).toBe('json_value');
      expect(parsed.type).toBe('set');
    });

    test('should handle special characters in key and value', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'VAR_WITH-SPECIAL$CHARS',
        value: 'value with spaces and "quotes"',
        type: 'set',
      };

      const jsonString = JSON.stringify(request);
      const parsed = JSON.parse(jsonString);

      expect(parsed.key).toBe('VAR_WITH-SPECIAL$CHARS');
      expect(parsed.value).toBe('value with spaces and "quotes"');
    });

    test('should handle unicode values', () => {
      const unicodeValue = 'Hello 世界 🌍 Ñiño';
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'UNICODE_VAR',
        value: unicodeValue,
        type: 'set',
      };

      const jsonString = JSON.stringify(request);
      const parsed = JSON.parse(jsonString);

      expect(parsed.value).toBe(unicodeValue);
    });
  });

  describe('EnvironmentChangeResponse', () => {
    test('should have success field', () => {
      const response: api.EnvironmentChangeResponse = {
        success: true,
      };

      expect(response.success).toBe(true);
    });

    test('should support both success and failure states', () => {
      const successResponse: api.EnvironmentChangeResponse = {
        success: true,
      };

      const failureResponse: api.EnvironmentChangeResponse = {
        success: false,
      };

      expect(successResponse.success).toBe(true);
      expect(failureResponse.success).toBe(false);
    });

    test('should serialize correctly as JSON', () => {
      const response: api.EnvironmentChangeResponse = {
        success: true,
      };

      const jsonString = JSON.stringify(response);
      const parsed = JSON.parse(jsonString);

      expect(parsed.success).toBe(true);
    });
  });

  describe('Callback interface extension', () => {
    test('should support envChange field in callback', () => {
      const callback: api.Callback = {
        cbid: 'test-callback-id',
        cookie: 'env-sync',
        envChange: {
          type: 'set',
          key: 'CALLBACK_TEST_VAR',
          value: 'callback_value',
          oldValue: undefined,
        },
      };

      expect(callback.cbid).toBe('test-callback-id');
      expect(callback.cookie).toBe('env-sync');
      expect(callback.envChange).toBeDefined();
      expect(callback.envChange!.type).toBe('set');
      expect(callback.envChange!.key).toBe('CALLBACK_TEST_VAR');
      expect(callback.envChange!.value).toBe('callback_value');
    });

    test('should support envChange with delete operation', () => {
      const callback: api.Callback = {
        cbid: 'delete-callback-id',
        cookie: 'env-sync',
        envChange: {
          type: 'delete',
          key: 'DELETED_VAR',
          oldValue: 'previous_value',
        },
      };

      expect(callback.envChange!.type).toBe('delete');
      expect(callback.envChange!.key).toBe('DELETED_VAR');
      expect(callback.envChange!.value).toBeUndefined();
      expect(callback.envChange!.oldValue).toBe('previous_value');
    });

    test('should allow callback without envChange for backwards compatibility', () => {
      const callback: api.Callback = {
        cbid: 'regular-callback-id',
        cookie: 'other',
        invoke: {
          objref: { [api.TOKEN_REF]: 'test-obj' },
          method: 'testMethod',
          args: [],
        },
      };

      expect(callback.envChange).toBeUndefined();
      expect(callback.invoke).toBeDefined();
    });

    test('should serialize callback with envChange correctly', () => {
      const callback: api.Callback = {
        cbid: 'serialize-test',
        cookie: 'env-sync',
        envChange: {
          type: 'set',
          key: 'SERIALIZE_VAR',
          value: 'serialize_value',
          oldValue: 'old_serialize_value',
        },
      };

      const jsonString = JSON.stringify(callback);
      const parsed = JSON.parse(jsonString);

      expect(parsed.cbid).toBe('serialize-test');
      expect(parsed.cookie).toBe('env-sync');
      expect(parsed.envChange.type).toBe('set');
      expect(parsed.envChange.key).toBe('SERIALIZE_VAR');
      expect(parsed.envChange.value).toBe('serialize_value');
      expect(parsed.envChange.oldValue).toBe('old_serialize_value');
    });
  });

  describe('KernelRequest union type', () => {
    test('should include EnvironmentChangeRequest in union', () => {
      const envChangeRequest: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'UNION_TEST',
        value: 'union_value',
        type: 'set',
      };

      // Should be assignable to KernelRequest union
      const kernelRequest: api.KernelRequest = envChangeRequest;
      expect((kernelRequest as api.EnvironmentChangeRequest).api).toBe(
        'env.notifyChange',
      );
    });

    test('should handle EnvironmentChangeRequest alongside other request types', () => {
      const createRequest: api.CreateRequest = {
        fqn: 'test.Class',
        args: [],
      };

      const envChangeRequest: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'MIXED_TEST',
        value: 'mixed_value',
        type: 'set',
      };

      const requests: api.KernelRequest[] = [createRequest, envChangeRequest];

      expect(requests).toHaveLength(2);

      // Check that environment change request is properly typed
      const envRequest = requests[1] as api.EnvironmentChangeRequest;
      expect(envRequest.api).toBe('env.notifyChange');
      expect(envRequest.key).toBe('MIXED_TEST');
    });
  });

  describe('KernelResponse union type', () => {
    test('should include EnvironmentChangeResponse in union', () => {
      const envChangeResponse: api.EnvironmentChangeResponse = {
        success: true,
      };

      // Should be assignable to KernelResponse union
      const kernelResponse: api.KernelResponse = envChangeResponse;
      expect((kernelResponse as api.EnvironmentChangeResponse).success).toBe(
        true,
      );
    });

    test('should handle EnvironmentChangeResponse alongside other response types', () => {
      const loadResponse: api.LoadResponse = {
        assembly: 'test-assembly',
        types: 5,
      };

      const envChangeResponse: api.EnvironmentChangeResponse = {
        success: true,
      };

      const responses: api.KernelResponse[] = [loadResponse, envChangeResponse];

      expect(responses).toHaveLength(2);

      // Check that environment change response is properly typed
      const envResponse = responses[1] as api.EnvironmentChangeResponse;
      expect(envResponse.success).toBe(true);
    });
  });

  describe('Type validation', () => {
    test('should enforce required fields in EnvironmentChangeRequest', () => {
      // This test ensures the TypeScript compiler catches missing required fields

      // Valid request should compile
      const validRequest: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'VALID_TEST',
        type: 'set',
        value: 'valid_value',
      };

      expect(validRequest.api).toBe('env.notifyChange');
      expect(validRequest.key).toBe('VALID_TEST');
      expect(validRequest.type).toBe('set');

      // Missing required fields would cause TypeScript compilation errors
      // These are commented out as they would prevent compilation:

      // const invalidRequest1: api.EnvironmentChangeRequest = {
      //   // missing 'api' field
      //   key: 'TEST',
      //   type: 'set',
      // };

      // const invalidRequest2: api.EnvironmentChangeRequest = {
      //   api: 'env.notifyChange',
      //   // missing 'key' field
      //   type: 'set',
      // };

      // const invalidRequest3: api.EnvironmentChangeRequest = {
      //   api: 'env.notifyChange',
      //   key: 'TEST',
      //   // missing 'type' field
      // };
    });

    test('should allow only valid type values', () => {
      // Valid types should work
      const setRequest: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'SET_TEST',
        type: 'set',
        value: 'set_value',
      };

      const deleteRequest: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'DELETE_TEST',
        type: 'delete',
      };

      expect(setRequest.type).toBe('set');
      expect(deleteRequest.type).toBe('delete');

      // Invalid type values would cause TypeScript compilation errors:
      // const invalidTypeRequest: api.EnvironmentChangeRequest = {
      //   api: 'env.notifyChange',
      //   key: 'INVALID_TEST',
      //   type: 'invalid', // This would cause a compilation error
      // };
    });

    test('should enforce boolean type for success field', () => {
      const successResponse: api.EnvironmentChangeResponse = {
        success: true,
      };

      const failureResponse: api.EnvironmentChangeResponse = {
        success: false,
      };

      expect(typeof successResponse.success).toBe('boolean');
      expect(typeof failureResponse.success).toBe('boolean');

      // Non-boolean values would cause TypeScript compilation errors:
      // const invalidResponse: api.EnvironmentChangeResponse = {
      //   success: 'true', // This would cause a compilation error
      // };
    });
  });

  describe('Edge cases and data integrity', () => {
    test('should handle empty string values', () => {
      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'EMPTY_STRING_TEST',
        value: '',
        type: 'set',
      };

      expect(request.value).toBe('');
      expect(request.value).not.toBeUndefined();
    });

    test('should handle very long variable names and values', () => {
      const longKey = 'A'.repeat(1000);
      const longValue = 'B'.repeat(10000);

      const request: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: longKey,
        value: longValue,
        type: 'set',
      };

      expect(request.key).toBe(longKey);
      expect(request.value).toBe(longValue);
      expect(request.key.length).toBe(1000);
      expect(request.value!.length).toBe(10000);
    });

    test('should maintain data integrity through JSON serialization round trip', () => {
      const originalRequest: api.EnvironmentChangeRequest = {
        api: 'env.notifyChange',
        key: 'ROUND_TRIP_TEST',
        value: 'Special chars: \n\t\r"\'\\',
        type: 'set',
      };

      const jsonString = JSON.stringify(originalRequest);
      const parsedRequest = JSON.parse(
        jsonString,
      ) as api.EnvironmentChangeRequest;

      expect(parsedRequest.api).toBe(originalRequest.api);
      expect(parsedRequest.key).toBe(originalRequest.key);
      expect(parsedRequest.value).toBe(originalRequest.value);
      expect(parsedRequest.type).toBe(originalRequest.type);
    });

    test('should handle callback with both envChange and other fields', () => {
      // Although this might not occur in normal operation,
      // the type system should allow it for flexibility
      const hybridCallback: api.Callback = {
        cbid: 'hybrid-callback',
        cookie: 'env-sync',
        envChange: {
          type: 'set',
          key: 'HYBRID_VAR',
          value: 'hybrid_value',
        },
        // Other fields should still be allowed
        invoke: {
          objref: { [api.TOKEN_REF]: 'test-obj' },
          method: 'testMethod',
          args: [],
        },
      };

      expect(hybridCallback.envChange).toBeDefined();
      expect(hybridCallback.invoke).toBeDefined();
      expect(hybridCallback.cbid).toBe('hybrid-callback');
    });
  });
});
