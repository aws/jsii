package software.amazon.jsii.tests.kotlin.calculator

/**
 * jsii#298: show default values in sphinx documentation, and respect newlines.
 */
@javax.annotation.Generated("jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
interface LoadBalancedFargateServiceProps : software.amazon.jsii.JsiiSerializable {
    /**
     * The container port of the application load balancer attached to your Fargate service.
     * 
     * Corresponds to container port mapping.
     * 
     * Default: 80
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val containerPort: kotlin.Number?

    /**
     * The number of cpu units used by the task.
     * 
     * Valid values, which determines your range of valid values for the memory parameter:
     * 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
     * 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
     * 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
     * 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
     * 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
     * 
     * This default is set in the underlying FargateTaskDefinition construct.
     * 
     * Default: 256
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val cpu: kotlin.String?

    /**
     * The amount (in MiB) of memory used by the task.
     * 
     * This field is required and you must use one of the following values, which determines your range of valid values
     * for the cpu parameter:
     * 
     * 0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)
     * 
     * 1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)
     * 
     * 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)
     * 
     * Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)
     * 
     * Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)
     * 
     * This default is set in the underlying FargateTaskDefinition construct.
     * 
     * Default: 512
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val memoryMiB: kotlin.String?

    /**
     * Determines whether the Application Load Balancer will be internet-facing.
     * 
     * Default: true
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val publicLoadBalancer: kotlin.Boolean?

    /**
     * Determines whether your Fargate Service will be assigned a public IP address.
     * 
     * Default: false
     */
    @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    val publicTasks: kotlin.Boolean?

    class Builder {
        /**
         * The container port of the application load balancer attached to your Fargate service.
         * 
         * Corresponds to container port mapping.
         * 
         * Default: 80
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var containerPort: kotlin.Number? = null

        /**
         * The number of cpu units used by the task.
         * 
         * Valid values, which determines your range of valid values for the memory parameter:
         * 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
         * 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
         * 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
         * 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
         * 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
         * 
         * This default is set in the underlying FargateTaskDefinition construct.
         * 
         * Default: 256
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var cpu: kotlin.String? = null

        /**
         * The amount (in MiB) of memory used by the task.
         * 
         * This field is required and you must use one of the following values, which determines your range of valid values
         * for the cpu parameter:
         * 
         * 0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)
         * 
         * 1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)
         * 
         * 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)
         * 
         * Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)
         * 
         * Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)
         * 
         * This default is set in the underlying FargateTaskDefinition construct.
         * 
         * Default: 512
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var memoryMiB: kotlin.String? = null

        /**
         * Determines whether the Application Load Balancer will be internet-facing.
         * 
         * Default: true
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var publicLoadBalancer: kotlin.Boolean? = null

        /**
         * Determines whether your Fargate Service will be assigned a public IP address.
         * 
         * Default: false
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        var publicTasks: kotlin.Boolean? = null

        fun build(): software.amazon.jsii.tests.kotlin.calculator.LoadBalancedFargateServiceProps {
            val containerPort = this.containerPort
            val cpu = this.cpu
            val memoryMiB = this.memoryMiB
            val publicLoadBalancer = this.publicLoadBalancer
            val publicTasks = this.publicTasks
            return `Jsii$Proxy`(containerPort, cpu, memoryMiB, publicLoadBalancer, publicTasks)
        }
    }

    class `Jsii$Proxy` : software.amazon.jsii.JsiiObject, software.amazon.jsii.tests.kotlin.calculator.LoadBalancedFargateServiceProps {
        /**
         * The container port of the application load balancer attached to your Fargate service.
         * 
         * Corresponds to container port mapping.
         * 
         * Default: 80
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val containerPort: kotlin.Number?

        /**
         * The number of cpu units used by the task.
         * 
         * Valid values, which determines your range of valid values for the memory parameter:
         * 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
         * 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
         * 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
         * 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
         * 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
         * 
         * This default is set in the underlying FargateTaskDefinition construct.
         * 
         * Default: 256
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val cpu: kotlin.String?

        /**
         * The amount (in MiB) of memory used by the task.
         * 
         * This field is required and you must use one of the following values, which determines your range of valid values
         * for the cpu parameter:
         * 
         * 0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)
         * 
         * 1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)
         * 
         * 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)
         * 
         * Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)
         * 
         * Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)
         * 
         * This default is set in the underlying FargateTaskDefinition construct.
         * 
         * Default: 512
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val memoryMiB: kotlin.String?

        /**
         * Determines whether the Application Load Balancer will be internet-facing.
         * 
         * Default: true
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val publicLoadBalancer: kotlin.Boolean?

        /**
         * Determines whether your Fargate Service will be assigned a public IP address.
         * 
         * Default: false
         */
        @get:software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        override val publicTasks: kotlin.Boolean?

        protected constructor(objRef: software.amazon.jsii.JsiiObjectRef) : super(objRef) {
            this.containerPort = this.jsiiCall("containerPort", kotlin.Number::class.java)
            this.cpu = this.jsiiCall("cpu", kotlin.String::class.java)
            this.memoryMiB = this.jsiiCall("memoryMiB", kotlin.String::class.java)
            this.publicLoadBalancer = this.jsiiCall("publicLoadBalancer", kotlin.Boolean::class.java)
            this.publicTasks = this.jsiiCall("publicTasks", kotlin.Boolean::class.java)
        }

        constructor(containerPort: kotlin.Number?, cpu: kotlin.String?, memoryMiB: kotlin.String?, publicLoadBalancer: kotlin.Boolean?, publicTasks: kotlin.Boolean?) : super(software.amazon.jsii.JsiiObject.InitializationMode.JSII) {
            this.containerPort = containerPort
            this.cpu = cpu
            this.memoryMiB = memoryMiB
            this.publicLoadBalancer = publicLoadBalancer
            this.publicTasks = publicTasks
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) return true
            if (javaClass != other?.javaClass) return false
            other as software.amazon.jsii.tests.kotlin.calculator.LoadBalancedFargateServiceProps
            if (containerPort != other.containerPort) return false
            if (cpu != other.cpu) return false
            if (memoryMiB != other.memoryMiB) return false
            if (publicLoadBalancer != other.publicLoadBalancer) return false
            if (publicTasks != other.publicTasks) return false
            return true
        }

        override fun hashCode(): Int {
            var result = this.containerPort?.hashCode() ?: 0
            result = 31 * result + (this.cpu?.hashCode() ?: 0)
            result = 31 * result + (this.memoryMiB?.hashCode() ?: 0)
            result = 31 * result + (this.publicLoadBalancer?.hashCode() ?: 0)
            result = 31 * result + (this.publicTasks?.hashCode() ?: 0)
            return result
        }

        override fun `$jsii$toJson`(): com.fasterxml.jackson.databind.JsonNode {
            val om = software.amazon.jsii.JsiiObjectMapper.INSTANCE
            val obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode()
            obj.set<com.fasterxml.jackson.databind.JsonNode>("containerPort", om.valueToTree(this.containerPort))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("cpu", om.valueToTree(this.cpu))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("memoryMiB", om.valueToTree(this.memoryMiB))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("publicLoadBalancer", om.valueToTree(this.publicLoadBalancer))
            obj.set<com.fasterxml.jackson.databind.JsonNode>("publicTasks", om.valueToTree(this.publicTasks))
            return obj
        }
    }
}
