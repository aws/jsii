namespace Amazon.JSII.Runtime.IntegrationTests.FSharp
#nowarn "44" // Usage of Obsolete entity 

open Amazon.JSII.Tests.CalculatorNamespace
open Amazon.JSII.Tests.CalculatorNamespace.LibNamespace
open System
open Xunit

type [<Sealed>] Tests () =

    [<Fact>]
    member this.FSharpDictCanBePassedDown () =
        let allTypes = new AllTypes()
        let number = new Number(1337.0)
        allTypes.MapProperty = dict[("number", number)]
