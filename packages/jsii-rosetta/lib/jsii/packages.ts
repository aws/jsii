import * as spec from '@jsii/spec';

export function jsiiTargetParameter(target: spec.Targetable, field: string) {
  const path = field.split('.');
  let r: any = target.targets;
  while (path.length > 0 && typeof r === 'object' && r !== null) {
    r = r[path.splice(0, 1)[0]];
  }
  return r;
}
