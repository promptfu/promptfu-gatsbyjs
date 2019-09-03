It twas the morning of July 18, 2019 as I was working on this site; just polishing up a few tidbits, 
when my 2012 Macbook Pro became quite warm and decided to poweroff never to return again. It was about thirty minutes later
that I found myself on Apples cares site filling out a form and scheduling an appointment to bring my laptop in for a good service. 

My initial thought, oh boy I get a little vacation from working and from technology. It was soon after that thought that another had
occured to me - what if I come up with an amazing, life altering, idea that required the use of my most familar working 
enivironment; a terminal (iterm2) and my precious dotfiles (which really are nothing too crazy), git, vim, and maybe a few others.

It was at that moment that I looked over towards my desk and noticed my Windows 10 desktop with a thin layer of dust. Its
initial and main purpose is to serve as a decent gaming rig (provide details of the machine); but now, NOW... it had to elevate
its function to new heights. But wait... its Windows 10... and I favor a Unix-like terminal environment and BASH, while this dusty
machine could offer me, what, PowerShell(?).

Oh, but wait. I remember some talks a couple years back of Windows 10 offer a embedded Ubuntu Linux; perhaps there is some saving grace after all.
Alas, is it possible that, while my typical workhorse is away at the workhorse spa, I can work within an environment on a Windows 10 machine
that is as close to the real thing as possible.

Thus, my journey begins... and here within this <blog|article|journal|post|etc.> I will detail my findings in hopes that it may
bring another hope in a similar time of need.


# Enabling Windows Subsystem for Linuix

## Install the Windows Subsystem for Linux

https://docs.microsoft.com/en-us/windows/wsl/install-win10

Open `ell as an Administrator and run:

```PowerShell
PS C:\WINDOWS\system32> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

Restart your computer when prompted.


## Install your Linux Distribution of Choice

There are a few choices for installing Linux on your Windows 10 machine:

Download and install from the Microsoft Store
Download and install from the Command-Line/Script
Download and manually unpack and install (for Windows Server)

I chose the route of opening Microsoft Store and installing Ubuntu, but I was surprised to see other offerings such as SUSE,
Debian, and Kali Linux.

By searching for Ubuntu from the Microsoft Store and selecting install once found, it should download and install the latest stable Ubuntu LTS which is determined
by the first point release of any newer LTS release; at the time of this writing, Ubuntu LTS 18.04 (Bionic) was installed (yay!).

Once the install is complete, select Launch or open 'Ubuntu' from the start menu where you will be greeted by a seemingly
familar black background terminal:

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

mhassel@DESKTOP-DQE656P:~$
mhassel@DESKTOP-DQE656P:~$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.2 LTS
Release:        18.04
Codename:       bionic

Ah'mazing! We are now running Ubuntu on Windows 10! BTW... the Ubuntu terminal that gets opened has opacity; I like to rock it at 80%.

From here, I would recommend you `apt update` and `apt upgrade`:

sudo apt update && sudo apt upgrade


All this is fine and dandy and will get you going. Laster I will detail a bit more on the rest of my setup which will envolve cloning my github home report which houses
my dotfiles as well as setting up an ssh server possibly so we can utilize a better terminal than the Ubuntu stock terminal.





From here, I checkout my dotfiles:
cd ~
git init
git remote add origin git@github.com:xpros/home.git
git fetch origin
git checkout -b master --track --force origin/master

Before I get too ahead of myself, in my profile I need to create `~/.env_vars` which I can easily do and then updated the variables as needed:
cp `~/.env_vars.example ~/.env_vars

# the one the only
EDITOR=vim

# python development environment
VIRTUALENVWRAPPER_PYTHON=""
VIRTUALENVWRAPPER_SHELL=""
VIRTUALENVWRAPPER_VIRTUALENV=""

# java development environment
# MAC
# JAVA_8_HOME="$(/usr/libexec/java_home -v1.8)"
# MAC OR OTHER
#JAVA_8_HOME="$([[ '$(uname -s)' == 'Darwin' ]] && echo '/usr/libexec/java_home -v1.8' || echo '<path_to_java>')"

JAVA_9_HOME=""
JAVA_8_HOME=""
JAVA_7_HOME=""

# git config
#ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts # setup known_hosts w/github rsa
GIT_AUTHOR_NAME=""
GIT_AUTHOR_EMAIL=""

# npm/node config
NPM_PACKAGES="${HOME}/.npm-packages"

In additionl to the .env_vars file, a .env_paths file will need to be created.

Lastly, we need to install `conda`.


From here, I need to source my .bashrc to get me into my typical environment:

. .bashrc

From here, it looks like I need to install `conda`:

wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh


mhassel@DESKTOP-DQE656P >> bash Miniconda3-latest-Linux-x86_64.sh -p $HOME/conda -b
PREFIX=/home/mhassel/conda
installing: python-3.7.3-h0371630_0 ...
Python 3.7.3
installing: ca-certificates-2019.1.23-0 ...
installing: libgcc-ng-8.2.0-hdf63c60_1 ...
installing: libstdcxx-ng-8.2.0-hdf63c60_1 ...
installing: libffi-3.2.1-hd88cf55_4 ...
installing: ncurses-6.1-he6710b0_1 ...
installing: openssl-1.1.1b-h7b6447c_1 ...
installing: xz-5.2.4-h14c3975_4 ...
installing: yaml-0.1.7-had09818_2 ...
installing: zlib-1.2.11-h7b6447c_3 ...
installing: libedit-3.1.20181209-hc058e9b_0 ...
installing: readline-7.0-h7b6447c_5 ...
installing: tk-8.6.8-hbc83047_0 ...
installing: sqlite-3.27.2-h7b6447c_0 ...
installing: asn1crypto-0.24.0-py37_0 ...
installing: certifi-2019.3.9-py37_0 ...
installing: chardet-3.0.4-py37_1 ...
installing: idna-2.8-py37_0 ...
installing: pycosat-0.6.3-py37h14c3975_0 ...
installing: pycparser-2.19-py37_0 ...
installing: pysocks-1.6.8-py37_0 ...
installing: ruamel_yaml-0.15.46-py37h14c3975_0 ...
installing: six-1.12.0-py37_0 ...
installing: cffi-1.12.2-py37h2e261b9_1 ...
installing: setuptools-41.0.0-py37_0 ...
installing: cryptography-2.6.1-py37h1ba5d50_0 ...
installing: wheel-0.33.1-py37_0 ...
installing: pip-19.0.3-py37_0 ...
installing: pyopenssl-19.0.0-py37_0 ...
installing: urllib3-1.24.1-py37_0 ...
installing: requests-2.21.0-py37_0 ...
installing: conda-4.6.14-py37_0 ...
installation finished.

## Install RVM and Ruby

For my purposes, I prefer to install into my home directory to avoid affecting the system as much as possible. To do so, lets do the following:

$ sudo apt update
$ sudo apt upgrade
$ sudo apt-get install software-properties-common
$ sudo apt install gpgv # Must install this package, otherwise, we cannot import rvms gpg-key
$ gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB


$ curl -sSL https://get.rvm.io | bash -s stable --user-install --path $HOME/.rvm
Turning on user install mode.
Downloading https://github.com/rvm/rvm/archive/1.29.9.tar.gz
Downloading https://github.com/rvm/rvm/releases/download/1.29.9/1.29.9.tar.gz.asc
gpg: Signature made Wed Jul 10 03:31:02 2019 DST
gpg:                using RSA key 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
gpg: Good signature from "Piotr Kuczynski <piotr.kuczynski@gmail.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 7D2B AF1C F37B 13E2 069D  6956 105B D0E7 3949 9BDB
GPG verified '/home/mhassel/.rvm/archives/rvm-1.29.9.tgz'
Installing RVM to /home/mhassel/.rvm/
    Adding rvm PATH line to /home/mhassel/.profile /home/mhassel/.mkshrc /home/mhassel/.bashrc /home/mhassel/.zshrc.
    RVM sourcing line found in /home/mhassel/.bashrc.
    RVM sourcing line not found for Zsh, rerun this command with '--auto-dotfiles' flag to fix it.
Installation of RVM in /home/mhassel/.rvm/ is almost complete:

  * To start using RVM you need to run `source /home/mhassel/.rvm/scripts/rvm`
    in all your open shell windows, in rare cases you need to reopen all shell windows.
Thanks for installing RVM 🙏
Please consider donating to our open collective to help us maintain RVM.

👉  Donate: https://opencollective.com/rvm/donate


rvm install ruby


# Completely Uninstall the subsystem for Linux on Windows 10

On builds prior to 1709 (16299) open a command prompt and run:

If your OS has been upgraded to the Fall Creators Update, you should be able to issue the command wslconfig.

You could of course try uninstalling first by using the command lxrun /uninstall /full.

If its still there, you can try unregistering the distro:

First you need to know which distro is installed by using

wslconfig /l
From the list choose the distro (e.g. Ubuntu) you want to uninstall and type the command

wslconfig /u Ubuntu

PS C:\WINDOWS\system32> .\wslconfig.exe /l
Windows Subsystem for Linux Distributions:
Ubuntu (Default)
PS C:\WINDOWS\system32> .\wslconfig.exe /u Ubuntu
Unregistering...
PS C:\WINDOWS\system32> .\LxRun.exe /uninstall /full
Warning: lxrun.exe is only used to configure the legacy Windows Subsystem for Linux distribution.
Distributions can be installed by visiting the Microsoft Store:
https://aka.ms/wslstore

This will uninstall Ubuntu on Windows.
This will remove the Ubuntu environment as well as any modifications, new applications, and user data.
Type "y" to continue: y
Uninstalling...
Error: 0x80070002


Otherwise, run the below commands:

List all appxpackages

get-appxpackages

List specific package:
PS C:\WINDOWS\system32> Get-AppxPackage -Name "CanonicalGroupLimited.UbuntuonWindows"

Finally, remove the package:
PS C:\WINDOWS\system32> Get-AppxPackage -Name "CanonicalGroupLimited.UbuntuonWindows"


Name              : CanonicalGroupLimited.UbuntuonWindows
Publisher         : CN=23596F84-C3EA-4CD8-A7DF-550DCE37BCD0
Architecture      : X64
ResourceId        :
Version           : 1804.2019.521.0
PackageFullName   : CanonicalGroupLimited.UbuntuonWindows_1804.2019.521.0_x64__79rhkp1fndgsc
InstallLocation   : C:\Program
                    Files\WindowsApps\CanonicalGroupLimited.UbuntuonWindows_1804.2019.521.0_x64__79rhkp1fndgsc
IsFramework       : False
PackageFamilyName : CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc
PublisherId       : 79rhkp1fndgsc
IsResourcePackage : False
IsBundle          : False
IsDevelopmentMode : False
IsPartiallyStaged : False
SignatureKind     : Store
Status            : Ok



PS C:\WINDOWS\system32> Remove-AppxPackage CanonicalGroupLimited.UbuntuonWindows_1804.2019.521.0_x64__79rhkp1fndgsc

Otherwise, you can right lick the icon and select Uninstall.

