package software.amazon.jsii.tests.calculator;

/**
 * jsii#298: show default values in sphinx documentation, and respect newlines.
 * 
 * EXPERIMENTAL
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
public interface LoadBalancedFargateServiceProps extends software.amazon.jsii.JsiiSerializable {

    /**
     * The container port of the application load balancer attached to your Fargate service.
     * 
     * Corresponds to container port mapping.
     * 
     * Default: 80
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Number getContainerPort();

    /**
     * The number of cpu units used by the task. Valid values, which determines your range of valid values for the memory parameter: 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments.
     * 
     * This default is set in the underlying FargateTaskDefinition construct.
     * 
     * Default: 256
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getCpu();

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
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.String getMemoryMiB();

    /**
     * Determines whether the Application Load Balancer will be internet-facing.
     * 
     * Default: true
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Boolean getPublicLoadBalancer();

    /**
     * Determines whether your Fargate Service will be assigned a public IP address.
     * 
     * Default: false
     * 
     * EXPERIMENTAL
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    java.lang.Boolean getPublicTasks();

    /**
     * @return a {@link Builder} of {@link LoadBalancedFargateServiceProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link LoadBalancedFargateServiceProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    public static final class Builder {
        private java.lang.Number containerPort;
        private java.lang.String cpu;
        private java.lang.String memoryMiB;
        private java.lang.Boolean publicLoadBalancer;
        private java.lang.Boolean publicTasks;

        /**
         * Sets the value of ContainerPort
         * @param containerPort The container port of the application load balancer attached to your Fargate service.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder containerPort(java.lang.Number containerPort) {
            this.containerPort = containerPort;
            return this;
        }

        /**
         * Sets the value of Cpu
         * @param cpu The number of cpu units used by the task. Valid values, which determines your range of valid values for the memory parameter: 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder cpu(java.lang.String cpu) {
            this.cpu = cpu;
            return this;
        }

        /**
         * Sets the value of MemoryMiB
         * @param memoryMiB The amount (in MiB) of memory used by the task.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder memoryMiB(java.lang.String memoryMiB) {
            this.memoryMiB = memoryMiB;
            return this;
        }

        /**
         * Sets the value of PublicLoadBalancer
         * @param publicLoadBalancer Determines whether the Application Load Balancer will be internet-facing.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder publicLoadBalancer(java.lang.Boolean publicLoadBalancer) {
            this.publicLoadBalancer = publicLoadBalancer;
            return this;
        }

        /**
         * Sets the value of PublicTasks
         * @param publicTasks Determines whether your Fargate Service will be assigned a public IP address.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public Builder publicTasks(java.lang.Boolean publicTasks) {
            this.publicTasks = publicTasks;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link LoadBalancedFargateServiceProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
        public LoadBalancedFargateServiceProps build() {
            return new Jsii$Proxy(containerPort, cpu, memoryMiB, publicLoadBalancer, publicTasks);
        }
    }

    /**
     * An implementation for {@link LoadBalancedFargateServiceProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Experimental)
    final class Jsii$Proxy extends software.amazon.jsii.JsiiObject implements LoadBalancedFargateServiceProps {
        private final java.lang.Number containerPort;
        private final java.lang.String cpu;
        private final java.lang.String memoryMiB;
        private final java.lang.Boolean publicLoadBalancer;
        private final java.lang.Boolean publicTasks;

        /**
         * Constructor that initializes the object based on values retrieved from the JsiiObject.
         * @param objRef Reference to the JSII managed object.
         */
        protected Jsii$Proxy(final software.amazon.jsii.JsiiObjectRef objRef) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.setObjRef(objRef);
            this.containerPort = this.jsiiGet("containerPort", java.lang.Number.class);
            this.cpu = this.jsiiGet("cpu", java.lang.String.class);
            this.memoryMiB = this.jsiiGet("memoryMiB", java.lang.String.class);
            this.publicLoadBalancer = this.jsiiGet("publicLoadBalancer", java.lang.Boolean.class);
            this.publicTasks = this.jsiiGet("publicTasks", java.lang.Boolean.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(java.lang.Number containerPort, java.lang.String cpu, java.lang.String memoryMiB, java.lang.Boolean publicLoadBalancer, java.lang.Boolean publicTasks) {
            super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);
            this.containerPort = containerPort;
            this.cpu = cpu;
            this.memoryMiB = memoryMiB;
            this.publicLoadBalancer = publicLoadBalancer;
            this.publicTasks = publicTasks;
        }

        @Override
        public java.lang.Number getContainerPort() {
            return this.containerPort;
        }

        @Override
        public java.lang.String getCpu() {
            return this.cpu;
        }

        @Override
        public java.lang.String getMemoryMiB() {
            return this.memoryMiB;
        }

        @Override
        public java.lang.Boolean getPublicLoadBalancer() {
            return this.publicLoadBalancer;
        }

        @Override
        public java.lang.Boolean getPublicTasks() {
            return this.publicTasks;
        }

        @Override
        public com.fasterxml.jackson.databind.JsonNode $jsii$toJson() {
            com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            if (this.getContainerPort() != null) {
                obj.set("containerPort", om.valueToTree(this.getContainerPort()));
            }
            if (this.getCpu() != null) {
                obj.set("cpu", om.valueToTree(this.getCpu()));
            }
            if (this.getMemoryMiB() != null) {
                obj.set("memoryMiB", om.valueToTree(this.getMemoryMiB()));
            }
            if (this.getPublicLoadBalancer() != null) {
                obj.set("publicLoadBalancer", om.valueToTree(this.getPublicLoadBalancer()));
            }
            if (this.getPublicTasks() != null) {
                obj.set("publicTasks", om.valueToTree(this.getPublicTasks()));
            }
            return obj;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            LoadBalancedFargateServiceProps.Jsii$Proxy that = (LoadBalancedFargateServiceProps.Jsii$Proxy) o;

            if (this.containerPort != null ? !this.containerPort.equals(that.containerPort) : that.containerPort != null) return false;
            if (this.cpu != null ? !this.cpu.equals(that.cpu) : that.cpu != null) return false;
            if (this.memoryMiB != null ? !this.memoryMiB.equals(that.memoryMiB) : that.memoryMiB != null) return false;
            if (this.publicLoadBalancer != null ? !this.publicLoadBalancer.equals(that.publicLoadBalancer) : that.publicLoadBalancer != null) return false;
            return this.publicTasks != null ? this.publicTasks.equals(that.publicTasks) : that.publicTasks == null;
        }

        @Override
        public int hashCode() {
            int result = this.containerPort != null ? this.containerPort.hashCode() : 0;
            result = 31 * result + (this.cpu != null ? this.cpu.hashCode() : 0);
            result = 31 * result + (this.memoryMiB != null ? this.memoryMiB.hashCode() : 0);
            result = 31 * result + (this.publicLoadBalancer != null ? this.publicLoadBalancer.hashCode() : 0);
            result = 31 * result + (this.publicTasks != null ? this.publicTasks.hashCode() : 0);
            return result;
        }
    }
}
