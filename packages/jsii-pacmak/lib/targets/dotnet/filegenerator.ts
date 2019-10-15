import { CodeMaker } from 'codemaker';
import { Assembly } from 'jsii-spec';
import path = require('path');
import xmlbuilder = require('xmlbuilder');
import logging = require('../../logging');
import { DotNetNameUtils } from './nameutils';

// Represents a dependency in the dependency tree.
export class DotNetDependency {
  public namespace: string;
  public packageId: string;
  public fqn: string;
  public version: string;

  public constructor(namespace: string, packageId: string, fqn: string, version: string) {
    this.namespace = namespace;
    this.packageId = packageId;
    this.fqn = fqn;
    this.version = version;
  }
}

// Generates misc files such as the .csproj and the AssemblyInfo.cs file
// Uses the same instance of CodeMaker as the rest of the code so that the files get created when calling the save() method
export class FileGenerator {

  private readonly assm: Assembly;
  private readonly tarballFileName: string;
  private readonly code: CodeMaker;
  private readonly assemblyInfoNamespaces: string[] = ['Amazon.JSII.Runtime.Deputy'];
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  // We pass in an instance of CodeMaker so that the files get later saved
  // when calling the save() method on the .NET Generator.
  public constructor(assm: Assembly, tarballFileName: string, code: CodeMaker) {
    this.assm = assm;
    this.tarballFileName = tarballFileName;
    this.code = code;
  }

  // Generates the .csproj file
  public generateProjectFile(dependencies: Map<string, DotNetDependency>) {
    const assembly = this.assm;
    const packageId: string = assembly.targets!.dotnet!.packageId;

    const projectFilePath: string = path.join(packageId, `${packageId}.csproj`);

    // Construct XML csproj content.
    // headless removes the <xml?> head node so that the first node is the <Project> node
    const rootNode = xmlbuilder.create('Project', { encoding: 'UTF-8', headless: true });
    rootNode.att('Sdk', 'Microsoft.NET.Sdk');
    const propertyGroup = rootNode.ele('PropertyGroup');
    propertyGroup.ele('TargetFramework', 'netcoreapp2.1');
    propertyGroup.ele('GeneratePackageOnBuild', 'true');
    propertyGroup.ele('GenerateDocumentationFile', 'true');
    propertyGroup.ele('IncludeSymbols', 'true');
    propertyGroup.ele('SymbolPackageFormat', 'snupkg');
    propertyGroup.ele('IncludeSource', 'true');
    propertyGroup.ele('PackageVersion', this.getDecoratedVersion(assembly));
    propertyGroup.ele('PackageId', packageId);
    propertyGroup.ele('Description', this.getDescription());
    propertyGroup.ele('ProjectUrl', assembly.homepage);
    propertyGroup.ele('RepositoryUrl', assembly.repository.url);
    propertyGroup.ele('RepositoryType', assembly.repository.type);
    propertyGroup.ele('PackageLicenseExpression', assembly.license);
    propertyGroup.ele('Authors', assembly.author.name);
    propertyGroup.ele('Language', 'en-US');

    const dotnetInfo = assembly.targets!.dotnet;
    if (dotnetInfo!.title != null) {
      propertyGroup.ele('Title', dotnetInfo!.title);
    }

    if (dotnetInfo!.signAssembly != null) {
      const signAssembly = propertyGroup.ele('SignAssembly');
      signAssembly.att('Condition', `Exists('${dotnetInfo!.assemblyOriginatorKeyFile}')`);
    }

    if (dotnetInfo!.assemblyOriginatorKeyFile != null) {
      propertyGroup.ele('AssemblyOriginatorKeyFile', dotnetInfo!.assemblyOriginatorKeyFile);
    }

    if (dotnetInfo!.iconUrl != null) {
      propertyGroup.ele('PackageIconUrl', dotnetInfo!.iconUrl);
    }

    const itemGroup1 = rootNode.ele('ItemGroup');
    const embeddedResource = itemGroup1.ele('EmbeddedResource');
    embeddedResource.att('Include', this.tarballFileName);

    const itemGroup2 = rootNode.ele('ItemGroup');
    const packageReference = itemGroup2.ele('PackageReference');
    packageReference.att('Include', 'Amazon.JSII.Runtime');

    // Strip " (build abcdef)" from the jsii version
    const jsiiVersionSimple = assembly.jsiiVersion.replace(/ .*$/, '');
    packageReference.att('Version', jsiiVersionSimple);

    dependencies.forEach((value: DotNetDependency) => {
      const dependencyReference = itemGroup2.ele('PackageReference');
      dependencyReference.att('Include', value.packageId);
      dependencyReference.att('Version', value.version);
    });

    const xml = rootNode.end({ pretty: true });

    // Sending the xml content to the codemaker to ensure the file is written
    // and added to the file list for tracking
    this.code.openFile(projectFilePath);
    this.code.open(xml);
    // Unindent for the next file
    this.code.close();
    this.code.closeFile(projectFilePath);

    logging.debug(`Written to ${projectFilePath}`);
  }

  // Generates the AssemblyInfo.cs file
  public generateAssemblyInfoFile() {
    const packageId: string = this.assm.targets!.dotnet!.packageId;
    const filePath: string = path.join(packageId, 'AssemblyInfo.cs');
    this.code.openFile(filePath);
    this.assemblyInfoNamespaces.map(n => this.code.line(`using ${n};`));
    this.code.line();
    const assembly = `[assembly: JsiiAssembly("${this.assm.name}", "${this.assm.version}", "${this.tarballFileName}")]`;
    this.code.line(assembly);
    this.code.closeFile(filePath);
  }

  // Generates the description
  private getDescription(): string {
    const docs = this.assm.docs;
    if (docs) {
      const stability = docs.stability;
      if (stability) {
        return `${this.assm.description} (Stability: ${this.nameutils.capitalizeWord(stability)})`;
      }
    }
    return this.assm.description;
  }

  // Generates the decorated version
  private getDecoratedVersion(assembly: Assembly): string {
    const suffix = assembly.targets!.dotnet!.versionSuffix;
    if (suffix) {
      // suffix is guaranteed to start with a leading `-`
      return `${assembly.version}${suffix}`;
    }
    return assembly.version;
  }
}
