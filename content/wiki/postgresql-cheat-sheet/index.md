---
author: mhassel
categories: ["database", "linux"]
created: 2017-09-06 00:00:00 -0600
feature: false
image: none
show: true
tags: ["command line", "database", "linux", "postgresql"]
title: PostgreSQL Cheat Sheet
updated:
---
# Logging in:

```shell
$ psql -h localhost -U postgres <database[optional]>
```

List all databases (all commands can be administered after logging into
postgreSQL):

```shell
\l
# or
\list
```

#  Create a user

```shell
CREATE USER <username> PASSWORD '<password>';
```

#  Backup

##  Create Backup User

```shell
CREATE USER <backup username> SUPERUSER PASSWORD '<password>';
ALTER USER <backup username> set default_transaction_read_only = on;
```

##  Setup homedir so password does not prompt

```shell
$ touch ~/.pgpass
$ chmod 0600 ~/.pgpass
$ echo "<hostname>:<port>:<database>:<username>:<password>" > ~/.pgpass
```

Each respective placeholder above (ie. <hostname>) could either be a literal
value or a *, which matches anything.

_REF:_ [ https://www.postgresql.org/docs/current/static/libpq-pgpass.html
](https://www.postgresql.org/docs/current/static/libpq-pgpass.html)

##  Dump all databases

```shell
$ pg_dumpall > outfile
$ pg_dumpall | gzip > outfile.gz
```

##  Dump specific databaser

```shell
$ pg_dump <database> > outfile
```

#  Restore

```shell
$ pg_restore -d <database> <filename>
```

# Check Wether a Specific Database Exists

```shell
sql="SELECT 1 FROM pg_database WHERE datname='<database_name>';"

if [ "$( psql -tAc "${sql}" )" = '1' ]
then
    echo "Database already exists."
else
    echo "Database does not exist."
fi
```

# Check Whether a Specific Table Exists

```shell
sql="SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name='<table_name>';"

if [ "$( psql -tAc "${sql}" )" = '1' ]
then
    echo "Table already exists."
else
    echo "Table does not exist."
fi
```
