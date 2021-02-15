| Release   | Status                       |
| --------- | ---------------------------- |
| `<10.3.0` | :x: Defunct                  |
| `^10.3.0` | :white_check_mark: Supported |
| `^11.0.0` | :warning: Unsupported        |
| `^12.0.0` | :white_check_mark: Supported |
| `^13.0.0` | :warning: Unsupported        |
| `^14.0.0` | :white_check_mark: Supported |
| `^15.0.0` | :test_tube: Best effort      |

??? question "Status Definitions"
    - **:white_check_mark: Supported**: Long Term Support (LTS) releases  (those with an even major version) are
      supported and bugs specific to those releases are addressed with the highest priority. Every `jsii` release is
      automatically tested against those releases.
    - **:test_tube: Best effort**: Development releases (those with an odd major version) are supported on a best-effort
      basis. No automated testing is performed against those releases.
    - **:warning: Unsupported**: End-of-Life releases are not supported. Bugs affecting those may not be fixed, and
      users are strongly advised to migrate to more recent releases.
    - **:x: Defunct**: Very old releases (these have been End-of-Live for a while now) are unlikely to work at all.

    The [node releases schedule][node-releases] provides up-to-date information on the current status of all active
    releases, and indicates the timelines for support (including planned End-of-Life dates for each).

    [node-releases]: https://nodejs.org/en/about/releases/
