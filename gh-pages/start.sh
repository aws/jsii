#!/bin/bash

###
# Starts a local server for the documentation website, for easy iteration.
##

if [ ! -d .venv ]; then
  python3 -m venv --system-site-packages .venv
fi
source .venv/bin/activate

python3 -m pip install -r requirements-dev.txt --upgrade

python3 -m mkdocs serve
