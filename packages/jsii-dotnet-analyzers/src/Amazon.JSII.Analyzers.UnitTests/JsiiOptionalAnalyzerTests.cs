using System.Collections.Generic;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Diagnostics;
using Xunit;
using TestHelper;

namespace Amazon.JSII.Analyzers.UnitTests
{
    public class JsiiOptionalAnalyzerTests : DiagnosticVerifier
    {
        [Fact]
        public void TestGivenSomeEmptyCodeThenRoslynDoesNotComplain()
        {
            var test = @"";

            VerifyCSharpDiagnostic(test);
        }
        
        [Fact]
        public void TestGivenSomeCodeWithAMissingRequiredPropertyThenRoslynComplains()
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
                    var result1 = new SampleClass(new SampleProps());
                    var result2 = new SampleClass(new SampleProps()
                    {
                        RequiredProperty1 = null,
                        OptionalProperty2 = ""test""
                        RequiredProperty2 = ""test""
                    );
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
                                new DiagnosticResultLocation("Test0.cs", 42, 35)
                            }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty2 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 42, 35)
                        }
                },
                new DiagnosticResult()
                {
                    Id = "JSII001",
                    Message = "The property RequiredProperty1 is required and cannot be null",
                    Severity = DiagnosticSeverity.Error,
                    Locations =
                        new[] {
                            new DiagnosticResultLocation("Test0.cs", 43, 35)
                        }
                },
            };

            VerifyCSharpDiagnostic(test, expected.ToArray());
        }

        protected override DiagnosticAnalyzer GetCSharpDiagnosticAnalyzer()
        {
            return new JsiiOptionalAnalyzer();
        }
    }
}
