## Master Container Setup

``` bash
apt update
apt install ansible iproute2 nano -y 
# iproute2 = ip addr Command
```

## Slave Container Setup

``` bash
apt update

# To Enable SSH as Root User
mkdir -p /etc/ssh
echo "PermitRootLogin yes" > /etc/ssh/sshd_config 


apt install iproute2 openssh-server python3 -y
service ssh start

clear

# To Setup a custom Root Password
passwd  
```

## Setup Ansible Inventory

**📄 /ansible/inventory.txt**
```
targetContainer1 ansible_host=172.17.X.X ansible_ssh_pass=VerySafePassword
```

## Ansible ad-hoc Commands

- ``ansible all -m ping -i inventory.txt``
- ``ansible all -m gather_facts -i inventory.txt``