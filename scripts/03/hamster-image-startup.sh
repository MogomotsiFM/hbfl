#!/bin/bash
sudo apt-get update
sudo apt-get -y install git
rm -rf /home/bitnami/hbfl
git clone https://github.com/MogomotsiFM/hbfl.git /home/bitnami/hbfl
chown -R bitnami: /home/bitnami/hbfl
cd /home/bitnami/hbfl
npm ci
sudo npm audit fix --force
npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKcm0gLXJmIC9ob21lL2JpdG5hbWkvaGJmbApnaXQgY2xvbmUgaHR0cHM6Ly9naXRodWIuY29tL01vZ29tb3RzaUZNL2hiZmwuZ2l0IC9ob21lL2JpdG5hbWkvaGJmbApjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwKY2QgL2hvbWUvYml0bmFtaS9oYmZsCm5wbSBjaQpzdWRvIG5wbSBhdWRpdCBmaXggLS1mb3JjZQpucG0gcnVuIHN0YXJ0