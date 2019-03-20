using Amazon.JSII.Runtime.Deputy;

namespace Amazon.JSII.Tests.CalculatorNamespace
{
    /// <summary>jsii#298: show default values in sphinx documentation, and respect newlines.</summary>
    [JsiiTypeProxy(typeof(ILoadBalancedFargateServiceProps), "jsii-calc.LoadBalancedFargateServiceProps")]
    internal sealed class LoadBalancedFargateServicePropsProxy : DeputyBase, ILoadBalancedFargateServiceProps
    {
        private LoadBalancedFargateServicePropsProxy(ByRefValue reference): base(reference)
        {
        }

        /// <summary>The container port of the application load balancer attached to your Fargate service. Corresponds to container port mapping.</summary>
        /// <remarks>default: 80</remarks>
        [JsiiProperty("containerPort", "{\"primitive\":\"number\",\"optional\":true}")]
        public double? ContainerPort
        {
            get => GetInstanceProperty<double? >();
        }

        /// <summary>
        /// The number of cpu units used by the task.
        /// Valid values, which determines your range of valid values for the memory parameter:
        /// 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
        /// 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
        /// 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
        /// 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
        /// 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
        /// 
        /// This default is set in the underlying FargateTaskDefinition construct.
        /// </summary>
        /// <remarks>default: 256</remarks>
        [JsiiProperty("cpu", "{\"primitive\":\"string\",\"optional\":true}")]
        public string Cpu
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary>
        /// The amount (in MiB) of memory used by the task.
        /// 
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
        /// </summary>
        /// <remarks>default: 512</remarks>
        [JsiiProperty("memoryMiB", "{\"primitive\":\"string\",\"optional\":true}")]
        public string MemoryMiB
        {
            get => GetInstanceProperty<string>();
        }

        /// <summary>Determines whether the Application Load Balancer will be internet-facing</summary>
        /// <remarks>default: true</remarks>
        [JsiiProperty("publicLoadBalancer", "{\"primitive\":\"boolean\",\"optional\":true}")]
        public bool? PublicLoadBalancer
        {
            get => GetInstanceProperty<bool? >();
        }

        /// <summary>Determines whether your Fargate Service will be assigned a public IP address.</summary>
        /// <remarks>default: false</remarks>
        [JsiiProperty("publicTasks", "{\"primitive\":\"boolean\",\"optional\":true}")]
        public bool? PublicTasks
        {
            get => GetInstanceProperty<bool? >();
        }
    }
}