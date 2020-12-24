@echo off

REM ###
REM Starts jest with the `--experimental-worker` node flag enabled.
REM ###

for /f "delims=" %%t in ('node -p "require.resolve(`jest-cli/bin/jest`)"') do set JEST=%%t

node --experimental-worker %JEST% %*
