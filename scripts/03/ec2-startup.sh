#!/bin/bash
curl --silent --location https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
cd home/ec2-user
git clone https://github.com/ryanmurakami/hbfl.git
cd hbfl
sudo npm i
sudo npm audit fix --force
sudo npm run start

# The above commands base64 encoded for entering into UserData
# IyEvYmluL2Jhc2gKY3VybCAtLXNpbGVudCAtLWxvY2F0aW9uIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzIwLnggfCBzdWRvIGJhc2ggLQpzdWRvIHl1bSBpbnN0YWxsIC15IG5vZGVqcwpzdWRvIHl1bSBpbnN0YWxsIC15IGdpdApjZCBob21lL2VjMi11c2VyCmdpdCBjbG9uZSBodHRwczovL2dpdGh1Yi5jb20vcnlhbm11cmFrYW1pL2hiZmwuZ2l0CmNkIGhiZmwKc3VkbyBucG0gaQpzdWRvIG5wbSBhdWRpdCBmaXggLS1mb3JjZQpzdWRvIG5wbSBydW4gc3RhcnQ=