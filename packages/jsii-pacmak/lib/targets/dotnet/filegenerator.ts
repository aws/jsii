import { Assembly } from '@jsii/spec';
import { CodeMaker } from 'codemaker';
import * as path from 'path';
import * as xmlbuilder from 'xmlbuilder';

import { TargetName } from '..';
import * as logging from '../../logging';
import { VERSION } from '../../version';
import { TARGET_FRAMEWORK } from '../dotnet';
import { toNuGetVersionRange, toReleaseVersion } from '../version-utils';
import { DotNetNameUtils } from './nameutils';

// Represents a dependency in the dependency tree.
export class DotNetDependency {
  public readonly version: string;

  public constructor(
    public readonly namespace: string,
    public readonly packageId: string,
    public readonly fqn: string,
    version: string,
    public readonly partOfCompilation: boolean,
  ) {
    this.version = toNuGetVersionRange(version);
  }
}

// Generates misc files such as the .csproj and the AssemblyInfo.cs file
// Uses the same instance of CodeMaker as the rest of the code so that the files get created when calling the save() method
export class FileGenerator {
  private readonly assm: Assembly;
  private readonly tarballFileName: string;
  private readonly code: CodeMaker;
  private readonly assemblyInfoNamespaces: string[] = [
    'Amazon.JSII.Runtime.Deputy',
  ];
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  // We pass in an instance of CodeMaker so that the files get later saved
  // when calling the save() method on the .NET Generator.
  public constructor(assm: Assembly, tarballFileName: string, code: CodeMaker) {
    this.assm = assm;
    this.tarballFileName = tarballFileName;
    this.code = code;
  }

  // Generates the .csproj file
  public generateProjectFile(
    dependencies: Map<string, DotNetDependency>,
    iconFile?: string,
  ) {
    const assembly = this.assm;
    const packageId: string = assembly.targets!.dotnet!.packageId;

    const projectFilePath: string = path.join(packageId, `${packageId}.csproj`);

    // Construct XML csproj content.
    // headless removes the <xml?> head node so that the first node is the <Project> node
    const rootNode = xmlbuilder.create('Project', {
      encoding: 'UTF-8',
      headless: true,
    });
    rootNode.att('Sdk', 'Microsoft.NET.Sdk');
    const propertyGroup = rootNode.ele('PropertyGroup');
    const dotnetInfo = assembly.targets!.dotnet;

    propertyGroup.comment('Package Identification');
    propertyGroup.ele('Description', this.getDescription());
    if (iconFile != null) {
      propertyGroup.ele('PackageIcon', iconFile.split(/[/\\]+/).join('\\'));
      // We also need to actually include the icon in the package
      const noneNode = rootNode.ele('ItemGroup').ele('None');
      noneNode.att('Include', iconFile.split(/[/\\]+/).join('\\'));
      noneNode.att('Pack', 'true');
      noneNode.att(
        'PackagePath',
        `\\${path
          .dirname(iconFile)
          .split(/[/\\]+/)
          .join('\\')}`,
      );
    }
    // We continue to include the PackageIconUrl even if we put PackageIcon for backwards compatibility, as suggested
    // by https://docs.microsoft.com/en-us/nuget/reference/msbuild-targets#packageicon
    if (dotnetInfo!.iconUrl != null) {
      propertyGroup.ele('PackageIconUrl', dotnetInfo!.iconUrl);
    }
    propertyGroup.ele('PackageId', packageId);
    propertyGroup.ele('PackageLicenseExpression', assembly.license);
    propertyGroup.ele('PackageVersion', this.getDecoratedVersion(assembly));
    if (dotnetInfo!.title != null) {
      propertyGroup.ele('Title', dotnetInfo!.title);
    }

    propertyGroup.comment('Additional Metadata');
    propertyGroup.ele('Authors', assembly.author.name);
    if (assembly.author.organization) {
      propertyGroup.ele('Company', assembly.author.name);
    }
    if (assembly.keywords) {
      propertyGroup.ele('PackageTags', assembly.keywords.join(';'));
    }
    propertyGroup.ele('Language', 'en-US');
    propertyGroup.ele('ProjectUrl', assembly.homepage);
    propertyGroup.ele('RepositoryUrl', assembly.repository.url);
    propertyGroup.ele('RepositoryType', assembly.repository.type);

    propertyGroup.comment('Build Configuration');
    propertyGroup.ele('GenerateDocumentationFile', 'true');
    propertyGroup.ele('GeneratePackageOnBuild', 'true');
    propertyGroup.ele('IncludeSymbols', 'true');
    propertyGroup.ele('IncludeSource', 'true');
    propertyGroup.ele('Nullable', 'enable');
    propertyGroup.ele('SymbolPackageFormat', 'snupkg');
    propertyGroup.ele('TargetFramework', TARGET_FRAMEWORK);
    // Transparently roll forward across major SDK releases if needed
    propertyGroup.ele('RollForward', 'Major');

    const itemGroup1 = rootNode.ele('ItemGroup');
    const embeddedResource = itemGroup1.ele('EmbeddedResource');
    embeddedResource.att('Include', this.tarballFileName);

    const itemGroup2 = rootNode.ele('ItemGroup');
    const packageReference = itemGroup2.ele('PackageReference');
    packageReference.att('Include', 'Amazon.JSII.Runtime');
    packageReference.att('Version', toNuGetVersionRange(`^${VERSION}`));

    dependencies.forEach((value: DotNetDependency) => {
      if (value.partOfCompilation) {
        const dependencyReference = itemGroup2.ele('ProjectReference');
        dependencyReference.att(
          'Include',
          `../${value.packageId}/${value.packageId}.csproj`,
        );
      } else {
        const dependencyReference = itemGroup2.ele('PackageReference');
        dependencyReference.att('Include', value.packageId);
        dependencyReference.att('Version', value.version);
      }
    });

    const warnings = rootNode.ele('PropertyGroup');
    // Suppress warnings about [Obsolete] members, this is the author's choice!
    warnings.comment('Silence [Obsolete] warnings');
    warnings.ele('NoWarn').text('0612,0618');
    // Treat select warnings as errors, as these are likely codegen bugs:
    warnings.comment(
      'Treat warnings symptomatic of code generation bugs as errors',
    );
    warnings.ele(
      'WarningsAsErrors',
      [
        '0108', // 'member1' hides inherited member 'member2'. Use the new keyword if hiding was intended.
        '0109', // The member 'member' does not hide an inherited member. The new keyword is not required.
      ].join(','),
    );
    const xml = rootNode.end({ pretty: true, spaceBeforeSlash: true });

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
    this.assemblyInfoNamespaces.map((n) => this.code.line(`using ${n};`));
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
        return `${
          this.assm.description
        } (Stability: ${this.nameutils.capitalizeWord(stability)})`;
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
    return toReleaseVersion(assembly.version, TargetName.DOTNET);
  }
}
