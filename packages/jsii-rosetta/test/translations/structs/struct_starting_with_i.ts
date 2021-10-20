/// !hide
/// fake-from-jsii
class Integration {
  constructor(_something: any, id: string, props?: IntegrationOptions) { }
}
interface IntegrationOptions { readonly argument: number }
/// !show
new Integration(this, 'Something', {
  argument: 5
});
