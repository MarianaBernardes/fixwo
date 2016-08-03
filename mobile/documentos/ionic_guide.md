# Instale primeiro
Instale o nodejs, em seguida:

sudo apt-get install npm
sudo npm install cordova ionic

# caso exista problemas de acesso, faça
sudo chown -R <USERNAME AQUI> /home/bh/.config/configstore
sudo chown -R <USERNAME AQUI> /home/bh/.cordova   
# Android SDK
Baixe ao menos o android 5.0
Dê permissões pro SDK
chmod 777 -R android-sdk-linux

# Biblioteca para leitura de qrcode
https://github.com/phonegap/phonegap-plugin-barcodescanner


cordova plugin add https://github.com/phonegap/phonegap-plugin-barcodescanner.git
