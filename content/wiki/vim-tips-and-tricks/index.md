---
author: mhassel
categories: ["linux"]
created: 2021-11-03 21:26:00 -0600
feature: false
image: none
show: true
tags: ["linux", "vim"]
title: Vim Tips and Tricks
updated:
---

# Summary

Looking for vi (vim) tip and tricks, look no further. Who needs and IDE when you have vi (vim)!

Creating a tips and tricks page can get a bit messy, and there are too many Vim tips and tricks that exist out in the
wild to create a condensed and concise page so this is neither of those; but within this page are some bits that I have
found useful and would love a single source to review them again when needed.
<!--more-->

# Multiple Windows

If you want, you can probably do everything from one vim session! :)

Here are some commands to turn one vim session (inside one xterm) into multiple windows along with some other help
navigation bits.

```vim
:e filename - edit another file 
:split filename - split window and load another file 
:vsplit file - vertical split :sview file - same as split, but readonly 
:hide - close current window :only - keep only this window open 
:ls - show current buffers 
:b 2 - open buffer #2 in this window
```

```vim
ctrl-w up arrow - move cursor up a window 
ctrl-w ctrl-w - move cursor to another window (cycle) 
ctrl-w_ - maximize current window 
ctrl-w= - make all equal size 10 ctrl-w+ - increase window size by 10 lines 
```

# Search and Replace

The `:substitute` command searches for a text pattern, and replaces it with a text string. There are many options, but
these are what you probably want:

Find each occurrence of 'foo' (in all lines), and replace it with 'bar':

```vim
:%s/foo/bar/g
```

Find each occurrence of 'foo' (in the current line only), and replace it with
'bar':

```vim
:s/foo/bar/g
```

Change each 'foo' to 'bar', but ask for confirmation first:

```vim
:%s/foo/bar/gc
```

Change only whole words exactly matching 'foo' to 'bar'; ask for confirmation:

```vim
:%s/\<foo\>/bar/gc
```

Change each 'foo' (case insensitive) to 'bar'; ask for confirmation.This may be wanted after using :set noignorecase
to make searches case sensitive (the
default):

```vim
:%s/foo/bar/gci
```

Change each 'foo' (case sensitive) to 'bar'; ask for confirmation.This may be
wanted after using :set ignorecase to make searches case insensitive:

```vim
:%s/foo/bar/gcI
```

# Remove unwanted whitespace

```vim
:%s/\s\+$//e
```

_Ref:[ https://www.cs.oberlin.edu/~kuperman/help/vim/home.html ](https://www.cs.oberlin.edu/~kuperman/help/vim/home.html)_

