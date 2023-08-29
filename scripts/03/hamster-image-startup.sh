#!/bin/bash
cd home/ec2-user
cd hbfl
git pull
sudo npm i
sudo npm audit fix --force
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKY2QgaG9tZS9lYzItdXNlcgpjZCBoYmZsCmdpdCBwdWxsCnN1ZG8gbnBtIGkKc3VkbyBucG0gYXVkaXQgZml4IC0tZm9yY2UKc3VkbyBucG0gcnVuIHN0YXJ0