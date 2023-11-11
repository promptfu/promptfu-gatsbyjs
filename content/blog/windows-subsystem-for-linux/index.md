---
categories: ["windows"]
created: 2019-08-22 14:00:00 -0500
description: How to make Windows useful someone may ask. The answer? Enable Windows Subsystem for Linux.
feature: true
image: bike-chain-forming-1-and-0-large.jpg
show: true
tags: ["linux", "windows"]
title: "How Windows is Useful: Enabling Windows Subsystem for Linux"
updated: 2019-08-22 14:00:00 -0500
---
It 'twas the morning of July 18, 2019 as I was working on this site; just polishing up a few tidbits,
when my 2012 Macbook Pro became quite warm and decided to poweroff, never to return again. About 30 minutes had past
while I aimlessly troubleshot, but ultimately I found myself on Apple's support site scheduling an appointment to have my laptop serviced.
<!--more-->
My initial thought after setting up my appointment:
>Que sera sera! I get a little vacation from technology, wonderful!

<center><span>&#x1F601;&#x1F601;&#x1F601;</span></br >It was soon after that thought that another had occured to me; which came as quite a surprise.</br ><span>&#x1F601;&#x1F601;&#x1F601;</span></center>

>What if I come up with an amazing, life altering, idea that required the use of my most familiar working
>enivironment - a terminal (iterm2) and my precious dotfiles (nothing too crazy), git, vim, and maybe a few others.

It was the very next moment when I found myself gazing across the room towards my desk, taking notice to my Windows 10 desktop. The
desktop was not used often so it only had a modest amount of dust on it, but its initial and main purpose is to serve
as a decent gaming rig; now (**NOW...**) though, it had to elevate its purpose to new heights.

But wait... its Windows 10, and I favor a Unix-like terminal environment with vim and bash; while this dusty machine could offer me...
what? Notepad and PowerShell.

Oh, but wait... I remember some mentions from a couple years back of Windows 10 offering an embedded Ubuntu Linux; perhaps
there is some saving grace after all.

Thus, my journey begun... and here within this blog, I will detail my findings in hopes that it may bring another
hope in a similar time of need.

# Enabling Windows Subsystem for Linux

## Install the Windows Subsystem for Linux

Open PowerShell as an Administrator and run:
```powershell
PS C:\WINDOWS\system32> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
Restart your computer when prompted.

## Install your Linux Distribution of Choice

There are a few choices for installing Linux on your Windows 10 machine:

- Download and install from the Microsoft Store
- Download and install from the Command-Line/Script
- Download and manually unpack and install (for Windows Server)

I chose the first option - Download and install from the Microsoft Store.

The list of distributions available to install was quite surprising; to name a few - SUSE, Debian, and Kali Linux
were among others on the list. For the task at hand, I decided to install Ubuntu 18.04 LTS.

## Install Ubuntu 18.04 LTS (Bionic) from the Microsoft Store

Opening the Microsoft Store, searching for "Ubuntu", and selecting "Install" was the minimal effort I needed to put in
to begin the download and install process.

Once the install completed, the option to "Launch" was available and I did what came naturally next - I clicked "Launch".

A seemingly familiar black backgrounded terminal appeared on my screen:

```none
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username: mhassel
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
Installation successful!
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.
```

```shell{outputLines: 2-6}
lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.2 LTS
Release:        18.04
Codename:       bionic
```

Ah'mazing! Ubuntu running on Windows 10! BTW... the Ubuntu terminal window has opacity built-in; I like to rock it at 80%.

After making sure I was on the latest and greatest:

```shell
sudo apt update && sudo apt upgrade
```
<br />
<center><strong>I was back!</strong></center>
<br />

I was finally up and running; and just needed to apply my dotfiles, and install nvm and a few other tools. I could head
back to the couch, no longer worried that I may miss out on pursuing the most amazing idea if it
would come to me.

<center><i>And then Matthew stood up, walked to his desktop, and began writing this post...</i></center>
<br />

<small>_Reference: [ Windows Subsystem for Linux Installation Guide for Windows 10 ](https://docs.microsoft.com/en-us/windows/wsl/install-win10)_</small>
