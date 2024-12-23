#!/bin/bash

apt update
apt upgrade -y

apt install -y zip python3 nodejs npm
apt install -y pipx

curl -fsSL https://bun.sh/install | bash

pipx ensurepath
pipx install "camoufox[geoip]"

source .bashrc

camoufox fetch

snap install firefox

apt install -y libgtk-3-0t64 libx11-xcb1 libasound2t64
