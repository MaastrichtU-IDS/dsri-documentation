---
id: enabling-vpn-wsl
title: Enabling VPN access in WSL2
---
## Follow these steps in the WSL2 environment:
 
Create a file in /etc/wsl.conf:

[network]

generateResolvConf = false

This makes sure that WSL2 does not generate it's own resolv.conf anymore.


Edit the file /etc/resolv.conf and add the appropiate nameservers:

nameserver 137.120.1.1

nameserver 137.120.1.5

nameserver 8.8.8.8 # OR OF YOUR CHOOSING

search unimaas.nl

These are all the steps you should take in WSL2. Now you should do the following step after you connected to the VPN.
You can run this command in Powershell:

```Powershell
Get-NetAdapter | Where-Object {$_.InterfaceDescription -Match "Cisco AnyConnect"} | Set-NetIPInterface -InterfaceMetric 6000

```

you should now be able to verify that WSL2 has connectivity:

ping google.com -c 4
