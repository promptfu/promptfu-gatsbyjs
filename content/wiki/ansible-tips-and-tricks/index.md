---
author: mhassel
categories: ["ansible", "linux"]
created: 2021-11-01 23:15:00 -0600
feature: false
image: none
show: true
tags: ["ansible", "linux"]
title: Ansible Tips and Tricks
updated:
---

# Summary

Creating a tips and tricks page can get a bit messy, and there are too many Ansible tips and tricks that exist out in
the wild to create a condensed and concise page so this is neither of those; but within this page are some bits that I
have found useful and would love a single source to review them again when needed.

# Add a Prefix or Suffix to All Items of a List

## Prefix Items of a List

Let's transform the following list:

```shell
[ "bar", "cat", "dog" ]
```

to:

```shell
[ "foobar", "foocat", "foodog" ]
```

```shell
- debug:
    var: result
  vars:
    prefix: foo
    a_list: [ "bar", "cat", "dog" ]
    result: "{{ [prefix] | product(a_list) | map('join') | list }}"
```

## Suffix Items of a List

Let's transform the following list:

```shell
[ "bar", "cat", "dog" ]
```

to:

```shell
[ "barfoo", "catfoo", "dogfoo" ]
```


```shell
- debug:
    var: result
  vars:
    suffix: foo
    a_list: [ "bar", "cat", "dog" ]
    result: "{{ a_list | product([suffix]) | map('join') | list }}"
```

