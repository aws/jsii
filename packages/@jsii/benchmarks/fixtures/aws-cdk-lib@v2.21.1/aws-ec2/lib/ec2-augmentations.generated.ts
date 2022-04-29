// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control
import * as cloudwatch from '../../aws-cloudwatch';
import { VpnConnection } from "./vpn";
declare module "./vpn" {
    interface IVpnConnection {
        /**
         * Return the given named metric for this VPNConnection
         */
        metric(metricName: string, props?: cloudwatch.MetricOptions): cloudwatch.Metric;
        /**
         * The state of the tunnel. 0 indicates DOWN and 1 indicates UP.
         *
         * Average over 5 minutes
         */
        metricTunnelState(props?: cloudwatch.MetricOptions): cloudwatch.Metric;
        /**
         * The bytes received through the VPN tunnel.
         *
         * Sum over 5 minutes
         */
        metricTunnelDataIn(props?: cloudwatch.MetricOptions): cloudwatch.Metric;
        /**
         * The bytes sent through the VPN tunnel.
         *
         * Sum over 5 minutes
         */
        metricTunnelDataOut(props?: cloudwatch.MetricOptions): cloudwatch.Metric;
    }
    interface VpnConnection {
        /**
         * Return the given named metric for this VPNConnection
         */
        metric(metricName: string, props?: cloudwatch.MetricOptions): cloudwatch.Metric;
        /**
         * The state of the tunnel. 0 indicates DOWN and 1 indicates UP.
         *
         * Average over 5 minutes
         */
        metricTunnelState(props?: cloudwatch.MetricOptions): cloudwatch.Metric;
        /**
         * The bytes received through the VPN tunnel.
         *
         * Sum over 5 minutes
         */
        metricTunnelDataIn(props?: cloudwatch.MetricOptions): cloudwatch.Metric;
        /**
         * The bytes sent through the VPN tunnel.
         *
         * Sum over 5 minutes
         */
        metricTunnelDataOut(props?: cloudwatch.MetricOptions): cloudwatch.Metric;
    }
}
VpnConnection.prototype.metric = function(metricName: string, props?: cloudwatch.MetricOptions) {
  return new cloudwatch.Metric({
    namespace: 'AWS/VPN',
    metricName,
    dimensionsMap: { VpnId: this.vpnId },
    ...props
  }).attachTo(this);
};
VpnConnection.prototype.metricTunnelState = function(props?: cloudwatch.MetricOptions) {
  return this.metric('TunnelState', { statistic: 'Average', ...props });
};
VpnConnection.prototype.metricTunnelDataIn = function(props?: cloudwatch.MetricOptions) {
  return this.metric('TunnelDataIn', { statistic: 'Sum', ...props });
};
VpnConnection.prototype.metricTunnelDataOut = function(props?: cloudwatch.MetricOptions) {
  return this.metric('TunnelDataOut', { statistic: 'Sum', ...props });
};
