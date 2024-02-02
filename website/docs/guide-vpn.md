---
id: guide-vpn
title: Install UM VPN
---

## Request an account

1. You will need to have an account at Maastricht University with an email ending with `@maastrichtuniversity.nl` or `@student.maastrichtuniversity.nl`.

2. Request access to the DSRI for your account Please fill this [form 📬](/register). to provide us some information on what you plan to do with the DSRI.


## Connect to the UM network

You need to be connected to the UM network to access the DSRI.

* Connect to **UMnet** or **eduroam** WiFi at Maastricht University

* Use the **Maastricht University VPN** at **[vpn.maastrichtuniversity.nl](https://vpn.maastrichtuniversity.nl/)**

  Log in to that using your UM username and password.

:::info Students

By default the UM VPN is only available to employees. As a student you can access UM resources from any location via [Student Desktop Anywhere](https://athenadesktop.maastrichtuniversity.nl). However, if VPN access is absolutely necessary you can request access via your course coordinator. 

:::



  * The **prefix of your UM email address** with the first letter capitalized, e.g. `Firstname.Lastname` or `F.Lastname`Or your **employee number** at Maastricht University (a.k.a. P number), e.g. `P7000000`

    <img src="/img/vpn-login.png" alt="VPN Log in View" style={{maxWidth: '100%', maxHeight: '100%'}} />

    Then You will see below page to download the **AnyConnect Secure Mobility Client**

    <img src="/img/VPN-anyconnect.png" alt="Download AnyConnect Secure Mobility Client" style={{maxWidth: '100%', maxHeight: '100%'}} />

#### Install the VPN (AnyConnect Secure Mobility Client) on Windows

Double click on the `.exe` file to install the VPN.

You can follow below steps as in pictures.

<img src="/img/vpnsetup1.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/vpnsetup2.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/vpnsetup3.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/vpnsetup4.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

#### Log in to the VPN (AnyConnect Secure Mobility Client)

Once you finish installing you can run the Cisco AnyConnect Secure Mobility Client. 

<img src="/img/vpnsetup7.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

Then after you will get the bellow wizard and click connect

<img src="/img/vpnsetup5.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

Provide your UM username and password. (**employee number** at Maastricht University (a.k.a. P number), e.g. `P7000000`)

<img src="/img/vpnsetup6.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />



#### Install the VPN (AnyConnect Secure Mobility Client) on Linux

* Connect to **UMnet** or **eduroam** WiFi at Maastricht University

* For **Linux**, use `openconnect` to connect to the UM VPN. You can easily install it on Ubuntu and Debian distributions with `apt`:

  ```bash
  sudo apt install openconnect
  sudo openconnect -u YOUR.USER --authgroup 01-Employees --useragent=AnyConnect vpn.maastrichtuniversity.nl
  ```

  > Provide your UM password when prompted.

* For **students**:
  * By default the UM VPN is only available to employees. As a student you can access UM resources from any location via [Student Desktop Anywhere](https://athenadesktop.maastrichtuniversity.nl). However, if VPN access is absolutely necessary you can request access via your course coordinator.

