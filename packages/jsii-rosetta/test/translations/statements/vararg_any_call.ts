function test(..._args: any[]): void {
  // ...
}

test({ Key: 'Value', also: 1337 });

test({ Key: 'Value' }, { also: 1337 });
