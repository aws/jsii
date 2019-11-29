<?xml version="1.0" encoding="utf-8"?>
<!--
Windows does not support symlinks created by Bash for Windows, so the regular NuGet.config
won't work. To enable building on Windows (for instance, if you want to debug using Visual
Studio), replace NuGet.config with this file.
-->
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" protocolVersion="3" />
    <add key="@jsii/dotnet-jsonmodel" value="../../dotnet-jsonmodel/bin/Debug/NuGet" />
  </packageSources>
</configuration>
