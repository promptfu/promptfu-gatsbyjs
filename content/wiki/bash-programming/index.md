---
author: mhassel
categories: ["linux"]
created: 2020-11-17 00:00:00 -0600
feature: false
image:
show: false
tags: ["bash", "command line", "linux", "programming"]
title: Bash Programming
updated:
---


# Arrays

It is not a matter of 'if', it is a matter of 'when'. Below are some tips and usage examples for using bash arrays.


## Defining an Array

Below is how to define an empty array:

```shell
fruits=()
```

It is also possible define an array with items:

```shell
vegetables=('carrot' 'squash')
```


## Looping Through an Array

Echoing each array item in a loop:

```shell
fruits=('apple' 'peach')
for fruit in ${fruits[@]}; do
  echo ${fruit}
done
```

Using an arrays index to access each element:

```shell
for i in ${!fruits[@]}; do
  echo ${fruits[$i]}
done
```


## Concatinating an Array

```shell
fruits=('apple' 'peach')
vegetables=('carrot', 'squash')

basket=()
basket+=("${fruits[@]}")
basket+=("${vegetables[@]}")

```
