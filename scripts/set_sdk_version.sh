#!/bin/sh

platform=$1
version=$2

version_file=embrace.json

tmp=$(mktemp)

jq ".${platform}.version = \"${version}\"" $version_file > $tmp
mv $tmp $version_file
