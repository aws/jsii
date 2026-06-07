import { TypeSystem } from 'jsii-reflect';

import { RubyGenerator } from '../../../lib/targets/ruby';

// A representative subset of the CDK acronym list — only those exercised by
// the assertions below. Includes the cases that matter beyond a simple match:
// the IP/IPv4 overlap and the 2-letter `CE` surviving among its neighbours.
const CDK_ACRONYMS = [
  'AWS',
  'VPC',
  'ECS',
  'API',
  'DB',
  'CIDR',
  'IP',
  'IPv4',
  'CE',
];

describe('Ruby naming behavior', () => {
  let typeSystem: TypeSystem;
  let rubyTarget: any; // Use any to access private methods for testing

  beforeAll(async () => {
    typeSystem = new TypeSystem();
    const assembly = await typeSystem.load(
      require.resolve('../fixtures/base.jsii.json'),
    );

    // Mock targets to include the acronyms array
    (assembly as any).spec.targets = {
      ruby: {
        acronyms: CDK_ACRONYMS,
        module: 'BaseModule',
      },
    };

    rubyTarget = new RubyGenerator({
      targetName: 'ruby',
      packageDir: '.',
      assembly,
      runtimeTypeChecking: true,
      arguments: {},
      rosetta: {} as any, // not used for this test
    });
    await rubyTarget.load('.', assembly);
  });

  describe('rubyModuleName', () => {
    it('capitalizes acronyms correctly', () => {
      expect(rubyTarget.rubyModuleName('CfnVpc')).toBe('CfnVPC');
      expect(rubyTarget.rubyModuleName('CfnVPCConnection')).toBe(
        'CfnVPCConnection',
      );
      expect(rubyTarget.rubyModuleName('dbTable')).toBe('DBTable');
      expect(rubyTarget.rubyModuleName('IpAddress')).toBe('IPAddress');
      expect(rubyTarget.rubyModuleName('awsIpv4Cidr')).toBe('AWSIPv4CIDR');
      expect(rubyTarget.rubyModuleName('apiGateway')).toBe('APIGateway'); // API is an acronym
      expect(rubyTarget.rubyModuleName('EcsCluster')).toBe('ECSCluster');
    });

    it('produces valid constants for digit- and underscore-leading names', () => {
      // npm allows package names like `3d-tools`; Ruby constants must start
      // with an uppercase letter.  V_ prefix mirrors rubyConstName.
      expect(rubyTarget.rubyModuleName('3d-tools')).toBe('V_3dTools');
      expect(rubyTarget.rubyModuleName('3DSecure')).toBe('V_3DSecure');
      expect(rubyTarget.rubyModuleName('@scope/3d')).toBe('Scope::V_3d');
      expect(rubyTarget.rubyModuleName('_internal')).toBe('V__internal');
      // Ordinary names are untouched.
      expect(rubyTarget.rubyModuleName('jsii-calc')).toBe('JsiiCalc');
    });

    it('treats acronyms as literal text, not regex patterns', () => {
      // A config-supplied acronym containing regex metacharacters must not
      // break generation (previously: "Nothing to repeat" SyntaxError) or
      // inject match behavior.
      expect(() =>
        rubyTarget.rubyModuleName('CppHelper', ['C++']),
      ).not.toThrow();
      expect(rubyTarget.rubyModuleName('CppHelper', ['C++'])).toBe('CppHelper');
      expect(rubyTarget.rubyModuleName('fooBar', ['.*'])).toBe('FooBar');
    });

    it('scopes acronyms to the supplied list (per-assembly, not pooled)', () => {
      // Explicit empty list: nothing rewritten even though the test
      // assembly configures VPC as an acronym.
      expect(rubyTarget.rubyModuleName('CfnVpc', [])).toBe('CfnVpc');
      expect(rubyTarget.rubyModuleName('CfnVpc', ['VPC'])).toBe('CfnVPC');
      // Default (no list passed) uses the generated assembly's own config.
      expect(rubyTarget.rubyModuleName('CfnVpc')).toBe('CfnVPC');
    });

    it('ignores blank acronym entries', () => {
      // An empty-string acronym would match everywhere; assemblyAcronyms
      // filters it out before it reaches the regex.
      expect(
        rubyTarget.assemblyAcronyms({
          targets: { ruby: { acronyms: ['', 'VPC', 42] } },
        }),
      ).toEqual(['VPC']);
    });

    it('does not over-capitalize acronyms embedded inside words', () => {
      // "Special" contains "pec", "ial" etc. "AWS" is an acronym.
      // "AWSpecial" has "AWS" but it is not followed by an uppercase letter or end of string.
      // With word boundaries, it should remain AWSpecial or Awspecial depending on toPascalCase!
      // In JSII, "AWSpecial" starts with 'A' (uppercase).
      // Our fix ensures it does not get replaced incorrectly.
      expect(rubyTarget.rubyModuleName('AWSpecial')).toBe('AWSpecial');
      expect(rubyTarget.rubyModuleName('VpcEndpoint')).toBe('VPCEndpoint');
      expect(rubyTarget.rubyModuleName('awsCertificatemanager')).toBe(
        'AWSCertificatemanager',
      );
      expect(rubyTarget.rubyModuleName('awsCeService')).toBe('AWSCEService');
    });
  });

  describe('rubyName', () => {
    it('passes through ordinary member names', () => {
      expect(rubyTarget.rubyName('fooBar')).toBe('foo_bar');
      expect(rubyTarget.rubyName('hello')).toBe('hello');
    });

    it('prefixes Ruby keywords', () => {
      expect(rubyTarget.rubyName('break')).toBe('_break');
      expect(rubyTarget.rubyName('class')).toBe('_class');
      expect(rubyTarget.rubyName('while')).toBe('_while');
    });

    it('prefixes constructor/allocation hooks so members cannot clobber them', () => {
      // `def initialize` would silently replace the generated constructor;
      // `new`/`allocate` are the class methods used to instantiate proxies.
      expect(rubyTarget.rubyName('initialize')).toBe('_initialize');
      expect(rubyTarget.rubyName('new')).toBe('_new');
      expect(rubyTarget.rubyName('allocate')).toBe('_allocate');
    });

    it('prefixes runtime serialization/dispatch hooks', () => {
      expect(rubyTarget.rubyName('toJsii')).toBe('_to_jsii');
      expect(rubyTarget.rubyName('rubyClass')).toBe('_ruby_class');
      expect(rubyTarget.rubyName('send')).toBe('_send');
    });

    it('prefixes anything landing in the reserved jsii_ namespace', () => {
      expect(rubyTarget.rubyName('jsiiRef')).toBe('_jsii_ref');
      expect(rubyTarget.rubyName('jsiiSerialize')).toBe('_jsii_serialize');
      expect(rubyTarget.rubyName('jsiiSomeFutureApi')).toBe(
        '_jsii_some_future_api',
      );
    });

    it('prefixes names that start with a digit', () => {
      expect(rubyTarget.rubyName('2fa')).toBe('_2fa');
    });
  });

  describe('dedupCrossCategory', () => {
    const byRubyName = (m: any) => rubyTarget.rubyName(m.name);
    const dedup = (props: any[], methods: any[]) =>
      rubyTarget.dedupCrossCategory(
        props,
        methods,
        byRubyName,
        byRubyName,
        'test.Type',
      );

    it('passes through non-colliding members', () => {
      const props = [{ name: 'fooBar' }];
      const methods = [{ name: 'doThing' }];
      expect(dedup(props, methods)).toEqual({ props, methods });
    });

    it('does not treat a static and an instance member as colliding', () => {
      const props = [{ name: 'value', static: true }];
      const methods = [{ name: 'value' }];
      expect(dedup(props, methods)).toEqual({ props, methods });
    });

    it('drops the deprecated side of a property/method collision', () => {
      const prop = { name: 'fooBar', docs: { deprecated: 'use foo_bar()' } };
      const method = { name: 'foo_bar' };
      expect(dedup([prop], [method])).toEqual({
        props: [],
        methods: [method],
      });
    });

    it('throws when a property and a method collide and neither is deprecated', () => {
      expect(() => dedup([{ name: 'fooBar' }], [{ name: 'foo_bar' }])).toThrow(
        /property 'fooBar', method 'foo_bar'/,
      );
    });

    it('throws when every colliding member is deprecated', () => {
      expect(() =>
        dedup(
          [{ name: 'fooBar', docs: { deprecated: 'x' } }],
          [{ name: 'foo_bar', docs: { deprecated: 'y' } }],
        ),
      ).toThrow(/cannot pick a winner/);
    });
  });

  describe('rubyFullTypeName with submodules', () => {
    it('respects explicit submodule targets', () => {
      // Mock an assembly with submodules explicitly configured
      const mockConfig = {
        name: 'aws-cdk-lib',
        targets: { ruby: { module: 'AWSCDK' } },
        submodules: {
          'aws-cdk-lib.aws_dynamodb': {
            targets: { ruby: { module: 'AWSCDK::AWSDynamoDB' } },
          },
          'aws-cdk-lib.aws_dynamodb.nested': {
            targets: { ruby: { module: 'AWSCDK::AWSDynamoDB::Nested' } },
          },
        },
      };

      // Monkey patch this.assembly for the test
      const originalAssembly = rubyTarget.assembly;
      Object.defineProperty(rubyTarget, 'assembly', {
        value: mockConfig,
        configurable: true,
      });

      expect(
        rubyTarget.rubyFullTypeName('aws-cdk-lib.aws_dynamodb.Table'),
      ).toBe('AWSCDK::AWSDynamoDB::Table');

      expect(
        rubyTarget.rubyFullTypeName('aws-cdk-lib.aws_dynamodb.nested.Type'),
      ).toBe('AWSCDK::AWSDynamoDB::Nested::Type');

      // Fallback for unconfigured submodule
      expect(rubyTarget.rubyFullTypeName('aws-cdk-lib.aws_s3.Bucket')).toBe(
        'AWSCDK::AwsS3::Bucket',
      ); // Assuming 'AwsS3' via fallback logic

      Object.defineProperty(rubyTarget, 'assembly', {
        value: originalAssembly,
        configurable: true,
      });
    });

    it('rejects submodule modules that do not extend the assembly module', () => {
      const mockConfig = {
        name: 'aws-cdk-lib',
        targets: { ruby: { module: 'AWSCDK' } },
        submodules: {
          'aws-cdk-lib.rogue': {
            // Replaces the root instead of extending it — relative-namespace
            // slicing would emit types into the wrong module.
            targets: { ruby: { module: 'Flat' } },
          },
        },
      };

      const originalAssembly = rubyTarget.assembly;
      Object.defineProperty(rubyTarget, 'assembly', {
        value: mockConfig,
        configurable: true,
      });

      expect(() =>
        rubyTarget.relativeRubyNamespace('aws-cdk-lib.rogue.Type'),
      ).toThrow(/does not live under its assembly's module 'AWSCDK'/);

      Object.defineProperty(rubyTarget, 'assembly', {
        value: originalAssembly,
        configurable: true,
      });
    });
  });
});
