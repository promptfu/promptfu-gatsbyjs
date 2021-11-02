---
author: mhassel
categories: ["linux"]
created: 2021-11-01 23:14:00 -0600
feature: false
image: none
show: true
tags: ["bash", "command line", "linux"]
title: Bash Tips and Tricks
updated:
---

# Summary

Creating a tips and tricks page can get a bit messy, and there are too many bash tips and tricks that exist out in the
wild to create a condensed and concise page so this is neither of those; but within this page are some bits that I have
found useful and would love a single source to review them again when needed.

# Get Directory of a Script

Get directory of a script, eh? Sounds easy peasy, but you would be surprised. The idea behind this next snippet is that
the desired output is a script's root directory regardless of where the script might be symlinked.

```bash
script_dir() {
        SOURCE="${BASH_SOURCE[0]}"
        while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
                DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
                SOURCE="$(readlink "$SOURCE")"
                # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file
                # was located
                [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
        done
        DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
        echo ${DIR}
}
```

# Include Functions From Another File

If ever needing to share a set of functions between scripts, it may be uber helpful to create an file where the shared
functions exist. To include functions from another file, use the source command or the '.' (dot).

```bash
INCLUDES_DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$INCLUDES_DIR" ]]; then INCLUDES_DIR="$PWD"; fi
. "$INCLUDES_DIR/bash_plugin_helpers"
```
