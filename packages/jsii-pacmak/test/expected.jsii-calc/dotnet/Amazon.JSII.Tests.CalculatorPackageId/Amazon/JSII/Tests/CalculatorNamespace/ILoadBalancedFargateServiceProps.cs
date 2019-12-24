using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#298: show default values in sphinx documentation, and respect newlines.</summary>
    /// <remarks>
    /// <strong>Stability</strong>: Experimental
    /// </remarks>
    [JsiiInterface(nativeType: typeof(ILoadBalancedFargateServiceProps), fullyQualifiedName: "jsii-calc.LoadBalancedFargateServiceProps")]
    public interface ILoadBalancedFargateServiceProps
    {
        /// <summary>The container port of the application load balancer attached to your Fargate service.</summary>
        /// <remarks>
        /// Corresponds to container port mapping.
        /// 
        /// <strong>Default</strong>: 80
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "containerPort", typeJson: "{\"primitive\":\"number\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        double? ContainerPort
        {
            get
            {
                return null;
            }
        }

        /// <summary>The number of cpu units used by the task.</summary>
        /// <remarks>
        /// Valid values, which determines your range of valid values for the memory parameter:
        /// 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
        /// 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
        /// 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
        /// 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
        /// 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
        /// 
        /// This default is set in the underlying FargateTaskDefinition construct.
        /// 
        /// <strong>Default</strong>: 256
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "cpu", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string Cpu
        {
            get
            {
                return null;
            }
        }

        /// <summary>The amount (in MiB) of memory used by the task.</summary>
        /// <remarks>
        /// This field is required and you must use one of the following values, which determines your range of valid values
        /// for the cpu parameter:
        /// 
        /// 0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)
        /// 
        /// 1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)
        /// 
        /// 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)
        /// 
        /// Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)
        /// 
        /// Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)
        /// 
        /// This default is set in the underlying FargateTaskDefinition construct.
        /// 
        /// <strong>Default</strong>: 512
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "memoryMiB", typeJson: "{\"primitive\":\"string\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        string MemoryMiB
        {
            get
            {
                return null;
            }
        }

        /// <summary>Determines whether the Application Load Balancer will be internet-facing.</summary>
        /// <remarks>
        /// <strong>Default</strong>: true
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "publicLoadBalancer", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        bool? PublicLoadBalancer
        {
            get
            {
                return null;
            }
        }

        /// <summary>Determines whether your Fargate Service will be assigned a public IP address.</summary>
        /// <remarks>
        /// <strong>Default</strong>: false
        /// 
        /// <strong>Stability</strong>: Experimental
        /// </remarks>
        [JsiiProperty(name: "publicTasks", typeJson: "{\"primitive\":\"boolean\"}", isOptional: true)]
        [Amazon.JSII.Runtime.Deputy.JsiiOptional]
        bool? PublicTasks
        {
            get
            {
                return null;
            }
        }
    }
}
