package software.amazon.jsii.tests.calculator;

/**
 * jsii#298: show default values in sphinx documentation, and respect newlines.
 */
@javax.annotation.Generated(value = "jsii-pacmak")
@software.amazon.jsii.Jsii(module = software.amazon.jsii.tests.calculator.$Module.class, fqn = "jsii-calc.LoadBalancedFargateServiceProps")
@software.amazon.jsii.Jsii.Proxy(LoadBalancedFargateServiceProps.Jsii$Proxy.class)
@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
public interface LoadBalancedFargateServiceProps extends software.amazon.jsii.JsiiSerializable {

    /**
     * The container port of the application load balancer attached to your Fargate service.
     * <p>
     * Corresponds to container port mapping.
     * <p>
     * Default: 80
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.Number getContainerPort() {
        return null;
    }

    /**
     * The number of cpu units used by the task.
     * <p>
     * Valid values, which determines your range of valid values for the memory parameter:
     * 256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
     * 512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
     * 1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
     * 2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
     * 4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
     * <p>
     * This default is set in the underlying FargateTaskDefinition construct.
     * <p>
     * Default: 256
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.String getCpu() {
        return null;
    }

    /**
     * The amount (in MiB) of memory used by the task.
     * <p>
     * This field is required and you must use one of the following values, which determines your range of valid values
     * for the cpu parameter:
     * <p>
     * 0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)
     * <p>
     * 1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)
     * <p>
     * 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)
     * <p>
     * Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)
     * <p>
     * Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)
     * <p>
     * This default is set in the underlying FargateTaskDefinition construct.
     * <p>
     * Default: 512
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.String getMemoryMiB() {
        return null;
    }

    /**
     * Determines whether the Application Load Balancer will be internet-facing.
     * <p>
     * Default: true
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.Boolean getPublicLoadBalancer() {
        return null;
    }

    /**
     * Determines whether your Fargate Service will be assigned a public IP address.
     * <p>
     * Default: false
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    default @org.jetbrains.annotations.Nullable java.lang.Boolean getPublicTasks() {
        return null;
    }

    /**
     * @return a {@link Builder} of {@link LoadBalancedFargateServiceProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    static Builder builder() {
        return new Builder();
    }
    /**
     * A builder for {@link LoadBalancedFargateServiceProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
    public static final class Builder implements software.amazon.jsii.Builder<LoadBalancedFargateServiceProps> {
        private java.lang.Number containerPort;
        private java.lang.String cpu;
        private java.lang.String memoryMiB;
        private java.lang.Boolean publicLoadBalancer;
        private java.lang.Boolean publicTasks;

        /**
         * Sets the value of {@link LoadBalancedFargateServiceProps#getContainerPort}
         * @param containerPort The container port of the application load balancer attached to your Fargate service.
         *                      Corresponds to container port mapping.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder containerPort(java.lang.Number containerPort) {
            this.containerPort = containerPort;
            return this;
        }

        /**
         * Sets the value of {@link LoadBalancedFargateServiceProps#getCpu}
         * @param cpu The number of cpu units used by the task.
         *            Valid values, which determines your range of valid values for the memory parameter:
         *            256 (.25 vCPU) - Available memory values: 0.5GB, 1GB, 2GB
         *            512 (.5 vCPU) - Available memory values: 1GB, 2GB, 3GB, 4GB
         *            1024 (1 vCPU) - Available memory values: 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB
         *            2048 (2 vCPU) - Available memory values: Between 4GB and 16GB in 1GB increments
         *            4096 (4 vCPU) - Available memory values: Between 8GB and 30GB in 1GB increments
         *            <p>
         *            This default is set in the underlying FargateTaskDefinition construct.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder cpu(java.lang.String cpu) {
            this.cpu = cpu;
            return this;
        }

        /**
         * Sets the value of {@link LoadBalancedFargateServiceProps#getMemoryMiB}
         * @param memoryMiB The amount (in MiB) of memory used by the task.
         *                  This field is required and you must use one of the following values, which determines your range of valid values
         *                  for the cpu parameter:
         *                  <p>
         *                  0.5GB, 1GB, 2GB - Available cpu values: 256 (.25 vCPU)
         *                  <p>
         *                  1GB, 2GB, 3GB, 4GB - Available cpu values: 512 (.5 vCPU)
         *                  <p>
         *                  2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB - Available cpu values: 1024 (1 vCPU)
         *                  <p>
         *                  Between 4GB and 16GB in 1GB increments - Available cpu values: 2048 (2 vCPU)
         *                  <p>
         *                  Between 8GB and 30GB in 1GB increments - Available cpu values: 4096 (4 vCPU)
         *                  <p>
         *                  This default is set in the underlying FargateTaskDefinition construct.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder memoryMiB(java.lang.String memoryMiB) {
            this.memoryMiB = memoryMiB;
            return this;
        }

        /**
         * Sets the value of {@link LoadBalancedFargateServiceProps#getPublicLoadBalancer}
         * @param publicLoadBalancer Determines whether the Application Load Balancer will be internet-facing.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder publicLoadBalancer(java.lang.Boolean publicLoadBalancer) {
            this.publicLoadBalancer = publicLoadBalancer;
            return this;
        }

        /**
         * Sets the value of {@link LoadBalancedFargateServiceProps#getPublicTasks}
         * @param publicTasks Determines whether your Fargate Service will be assigned a public IP address.
         * @return {@code this}
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        public Builder publicTasks(java.lang.Boolean publicTasks) {
            this.publicTasks = publicTasks;
            return this;
        }

        /**
         * Builds the configured instance.
         * @return a new instance of {@link LoadBalancedFargateServiceProps}
         * @throws NullPointerException if any required attribute was not provided
         */
        @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
        @Override
        public LoadBalancedFargateServiceProps build() {
            return new Jsii$Proxy(containerPort, cpu, memoryMiB, publicLoadBalancer, publicTasks);
        }
    }

    /**
     * An implementation for {@link LoadBalancedFargateServiceProps}
     */
    @software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.Stable)
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
            super(objRef);
            this.containerPort = this.jsiiGet("containerPort", java.lang.Number.class);
            this.cpu = this.jsiiGet("cpu", java.lang.String.class);
            this.memoryMiB = this.jsiiGet("memoryMiB", java.lang.String.class);
            this.publicLoadBalancer = this.jsiiGet("publicLoadBalancer", java.lang.Boolean.class);
            this.publicTasks = this.jsiiGet("publicTasks", java.lang.Boolean.class);
        }

        /**
         * Constructor that initializes the object based on literal property values passed by the {@link Builder}.
         */
        private Jsii$Proxy(final java.lang.Number containerPort, final java.lang.String cpu, final java.lang.String memoryMiB, final java.lang.Boolean publicLoadBalancer, final java.lang.Boolean publicTasks) {
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
            final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;
            final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();

            if (this.getContainerPort() != null) {
                data.set("containerPort", om.valueToTree(this.getContainerPort()));
            }
            if (this.getCpu() != null) {
                data.set("cpu", om.valueToTree(this.getCpu()));
            }
            if (this.getMemoryMiB() != null) {
                data.set("memoryMiB", om.valueToTree(this.getMemoryMiB()));
            }
            if (this.getPublicLoadBalancer() != null) {
                data.set("publicLoadBalancer", om.valueToTree(this.getPublicLoadBalancer()));
            }
            if (this.getPublicTasks() != null) {
                data.set("publicTasks", om.valueToTree(this.getPublicTasks()));
            }

            final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            struct.set("fqn", om.valueToTree("jsii-calc.LoadBalancedFargateServiceProps"));
            struct.set("data", data);

            final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();
            obj.set("$jsii.struct", struct);

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
