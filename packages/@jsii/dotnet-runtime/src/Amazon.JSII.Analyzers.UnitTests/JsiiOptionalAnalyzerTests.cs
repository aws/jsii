using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Diagnostics;
using Xunit;
using Amazon.JSII.Analyzers.UnitTests.Helpers;
using Amazon.JSII.Analyzers.UnitTests.Verifiers;

namespace Amazon.JSII.Analyzers.UnitTests
{
    public class JsiiOptionalAnalyzerTests : DiagnosticVerifier
    {
        [Fact]
        public async Task TestGivenSomeEmptyCodeThenRoslynDoesNotComplain()
        {
            var test = @"";

            await VerifyCSharpDiagnostic(test);
        }
        
        [Fact]
        public async Task TestGivenSomeCodeWithAMissingRequiredPropertyThenRoslynComplains()
        {
            var test = @"
            using System;
            namespace Amazon.JSII.Analyzers.UnitTests
            {
                public class JsiiByValueAttribute : Attribute
                {
                }

                public class JsiiClassAttribute : Attribute
                {
                }

                public class JsiiOptionalAttribute : Attribute
                {
                }

                [JsiiByValue]
                public class SampleProps
                {
                    [JsiiOptional]
                    public string OptionalProperty1 { get; set; }
                    
                    [JsiiOptional]
                    public string OptionalProperty2 { get; set; }
                    
                    public string RequiredProperty1 { get; set; }

                    public string RequiredProperty2 { get; set; }
                }

                [JsiiClass]
                public class SampleClass
                {
                    public SampleClass(SampleProps props)
                    {
                        props = null;
                    }
                }

                class Test
                {   
                    // This should fail because there is missing required properties and it is a nested instruction
                    var result1 = new SampleClass(new SampleProps());

                    // This should fail because RequiredProperty1 is passed as null
                    var result2 = new SampleClass(new SampleProps()
                    {
                        RequiredProperty1 = null,
                        OptionalProperty2 = ""test"",
                        RequiredProperty2 = ""test""
                    });
                    
                    // This is OK, the properties might be passed later, we don't want to enforce it
                    var result3 = new SampleProps();

                    // This is not OK, if you start passing properties, you should pass all of the required ones
                    var result4 = new SampleProps()
                    {
                        RequiredProperty1 = null,
                        OptionalProperty2 = ""test""
                    };

                    // This is not OK, RequiredProperty1 is null
                    var result5 = new SampleProps()
                    {
                        RequiredProperty1 = null,
                        OptionalProperty2 = ""test"",
                        RequiredProperty2 = ""test""
                    };

                    // This is OK, all required properties are passed and not null.
                    var result6 = new SampleProps()
                    {
                        RequiredProperty1 = ""test"",
                        OptionalProperty2 = ""test"",
                        RequiredProperty2 = ""test""
                    };
                }
            }";
            var expected = new List<DiagnosticResult>()
            {
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty1 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                                new DiagnosticResultLocation("Test0.cs", 43, 51)
                            }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty2 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 43, 51)
                        }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty1 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 46, 51)
                        }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty1 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 57, 35)
                        }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty2 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 57, 35)
                        }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty1 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 64, 35)
                        }
                }
            };

            await VerifyCSharpDiagnostic(test, expected.ToArray());
        }

        protected override DiagnosticAnalyzer GetCSharpDiagnosticAnalyzer()
        {
            return new JsiiOptionalAnalyzer();
        }
    }
}
