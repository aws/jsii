import {CodeMaker} from "codemaker";
import {Assembly} from "jsii-spec";
import path = require('path');
import xmlbuilder = require('xmlbuilder');
import logging = require('../../logging');

export class FileGenerator {

    private assm: Assembly;
    private tarballFileName: string;
    private code: CodeMaker;
    private assemblyInfoNamespaces: string[] = ["Amazon.JSII.Runtime.Deputy"];

    // We pass in an instance of CodeMaker so that the files get later saved
    // when calling the save() method on the .NET Generator.
    constructor(assm: Assembly, tarballFileName: string, code: CodeMaker) {
        this.assm = assm;
        this.tarballFileName = tarballFileName;
        this.code = code;
    }

    // Generates the .csproj file
    public generateProjectFile() {
        const packageId: string = this.assm.targets!.dotnet!.packageId;

        const projectFilePath: string = path.join(packageId, `${packageId}.csproj`);

        // Construct XML csproj content.
        const rootNode = xmlbuilder.create('Project', {encoding: 'UTF-8'});
        rootNode.att("Sdk", "Microsoft.NET.Sdk");
        const propertyGroup = rootNode.ele("PropertyGroup");
        propertyGroup.ele("TargetFramework", "netstandard2.0");
        propertyGroup.ele("GeneratePackageOnBuild", "true");
        propertyGroup.ele("IncludeSymbols", "true");
        propertyGroup.ele("IncludeSource", "true");
        propertyGroup.ele("PackageVersion", this.assm.version);
        propertyGroup.ele("PackageId", packageId);
        propertyGroup.ele("Description", this.assm.description);
        propertyGroup.ele("ProjectUrl", this.assm.homepage);
        propertyGroup.ele("LicenseUrl", "https://spdx.org/licenses/" + this.assm.license + ".html");
        propertyGroup.ele("Authors", this.assm.author.name);
        propertyGroup.ele("Language", "en-US");

        if (this.assm.targets!.dotnet!.title != null) {
            propertyGroup.ele("Title", this.assm.targets!.dotnet!.title);
        }

        if (this.assm.targets!.dotnet!.signAssembly != null) {
            const signAssembly = propertyGroup.ele("SignAssembly");
            signAssembly.att("Condition", "Exists('" + this.assm.targets!.dotnet!.assemblyOriginatorKeyFile + "')");
        }

        if (this.assm.targets!.dotnet!.assemblyOriginatorKeyFile != null) {
            propertyGroup.ele("AssemblyOriginatorKeyFile", this.assm.targets!.dotnet!.assemblyOriginatorKeyFile);
        }

        if (this.assm.targets!.dotnet!.iconUrl != null) {
            propertyGroup.ele("IconUrl", this.assm.targets!.dotnet!.iconUrl);
        }

        const itemGroup1 = rootNode.ele("ItemGroup");
        const embeddedResource = itemGroup1.ele("EmbeddedResource");
        embeddedResource.att("Include", this.tarballFileName);

        // TODO: package references will need to be dealt programmatically and in sync with the using statements.
        const itemGroup2 = rootNode.ele("ItemGroup");
        const packageReference = itemGroup2.ele("PackageReference");
        packageReference.att("Include", "Amazon.JSII.Runtime");

        packageReference.att("Version", this.assm.version);

        const xml = rootNode.end({pretty: true});

        // Write XML content to .csproj file.
        logging.debug(`Generating ${projectFilePath}`);
        logging.debug(`XML: ${xml}`);

        // Sending the xml content to the codemaker to ensure the file is written
        // and added to the file list for tracking
        this.code.openFile(projectFilePath);
        this.code.open(xml);
        this.code.closeFile(projectFilePath);

        logging.debug(`Written to ${projectFilePath}`);
    }

    // Generates the AssemblyInfo.cs file
    public generateAssemblyInfoFile() {
        // TODO: look into the indentation bug
        const packageId: string = this.assm.targets!.dotnet!.packageId;
        const filePath: string = path.join(packageId, `AssemblyInfo.cs`);
        this.code.openFile(filePath);
        this.assemblyInfoNamespaces.map(n => this.code.line(`using ${n};`));
        this.code.line();
        const assembly = "[assembly: JsiiAssembly(\"" + this.assm.name + "\", \"" +
            this.assm.version + "\", \"" + this.tarballFileName + "\")]";
        this.code.line(assembly);
        this.code.closeFile(filePath);
    }
}