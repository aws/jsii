using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;

namespace Amazon.JSII.Analyzers.UnitTests.Helpers
{
    /// <summary>
    /// Location where the diagnostic appears, as determined by path, line number, and column number.
    /// </summary>
    public readonly struct DiagnosticResultLocation : IEquatable<DiagnosticResultLocation>
    {
        public DiagnosticResultLocation(string path, int line, int column)
        {
            if (line < -1)
            {
                throw new ArgumentOutOfRangeException(nameof(line), "line must be >= -1");
            }

            if (column < -1)
            {
                throw new ArgumentOutOfRangeException(nameof(column), "column must be >= -1");
            }

            Path = path;
            Line = line;
            Column = column;
        }

        public string Path { get; }
        public int Line { get; }
        public int Column { get; }

        public override bool Equals(object? obj)
        {
            if (obj is DiagnosticResultLocation other)
            {
                return Equals(other);
            }

            return false;
        }

        public bool Equals(DiagnosticResultLocation other)
        {
            return Path == other.Path
                   && Line == other.Line
                   && Column == other.Column;
        }

        public override int GetHashCode()
        {
            return Path.GetHashCode()
                   ^ Line.GetHashCode()
                   ^ Column.GetHashCode();
        }

        public static bool operator ==(DiagnosticResultLocation left, DiagnosticResultLocation right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(DiagnosticResultLocation left, DiagnosticResultLocation right)
        {
            return !left.Equals(right);
        }
    }

    /// <summary>
    /// Struct that stores information about a Diagnostic appearing in a source
    /// </summary>
    public struct DiagnosticResult : IEquatable<DiagnosticResult>
    {
        private IReadOnlyList<DiagnosticResultLocation> _locations;

        public IReadOnlyList<DiagnosticResultLocation> Locations
        {
            get
            {
                _locations ??= new DiagnosticResultLocation[] { };
                return _locations;
            }

            set => _locations = value;
        }

        public DiagnosticSeverity Severity { get; set; }

        public string Id { get; set; }

        public string Message { get; set; }

        public string Path => Locations.Count > 0 ? Locations[0].Path : "";

        public int Line => Locations.Count > 0 ? Locations[0].Line : -1;

        public int Column => Locations.Count > 0 ? Locations[0].Column : -1;

        public override bool Equals(object? obj)
        {
            if (obj is DiagnosticResult other)
            {
                return Equals(other);
            }

            return false;
        }

        public override int GetHashCode()
        {
            return Locations.GetHashCode()
                   ^ Id.GetHashCode()
                   ^ Severity.GetHashCode()
                   ^ Message.GetHashCode()
                   ^ Path.GetHashCode()
                   ^ Line.GetHashCode()
                   ^ Column.GetHashCode();
        }

        public bool Equals(DiagnosticResult other)
        {
            return Locations == other.Locations
                   && Id == other.Id
                   && Severity == other.Severity
                   && Message == other.Message
                   && Path == other.Path
                   && Line == other.Line
                   && Column == other.Column;
        }

        public static bool operator ==(DiagnosticResult left, DiagnosticResult right)
        {
            return left.Equals(right);
        }

        public static bool operator !=(DiagnosticResult left, DiagnosticResult right)
        {
            return !left.Equals(right);
        }
    }
}
