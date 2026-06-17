---
id: enabling-vpn-wsl
title: Enabling VPN Access in WSL2
---

When using the UM VPN with WSL2, WSL2 loses internet connectivity after connecting. Follow these steps to fix it.

## Configure WSL2

**1. Disable automatic DNS configuration**

Create or edit `/etc/wsl.conf` and add:

```ini
[network]
generateResolvConf = false
```

This prevents WSL2 from overwriting its own `resolv.conf`.

**2. Set the DNS nameservers**

If `/etc/resolv.conf` is a symlink, remove it first:

```bash
sudo rm /etc/resolv.conf
```

Then create it with:

```
nameserver 137.120.1.1
nameserver 137.120.1.5
nameserver 8.8.8.8
search unimaas.nl
```

## Fix the VPN interface metric (run once per VPN session)

After connecting to the VPN, run the following command in **PowerShell**:

```powershell
Get-NetAdapter | Where-Object {$_.InterfaceDescription -Match "Cisco AnyConnect"} | Set-NetIPInterface -InterfaceMetric 6000
```

## Verify connectivity

You should now have connectivity inside WSL2. Verify it with:

```bash
ping google.com -c 4
```
