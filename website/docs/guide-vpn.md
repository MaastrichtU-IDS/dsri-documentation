---
id: guide-vpn
title: Installing the UM VPN
---

## Request an account

1. You will need to have an account at Maastricht University with an email ending with `@maastrichtuniversity.nl` or `@student.maastrichtuniversity.nl`.

2. Request access to the DSRI for your account. Please fill this [form 📬](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=09acae9cdf454968bc94ad125b1f8e76&from=436967a9-738c-4112-b3f6-240a9847118e&openedFromService=true) to provide us some information on what you plan to do with the DSRI.


## Connect to the UM network

You need to be connected to the UM network to access the DSRI.

* Connect to **UMnet** or **eduroam** WiFi at Maastricht University

* Use the **Maastricht University VPN** at **[vpn.maastrichtuniversity.nl](https://vpn.maastrichtuniversity.nl/)**

  Log in to that using your UM username and password.

:::info Students
If you have been granted access to the DSRI, VPN access is **automatically included**.
Students must log in with their **student number** (e.g. `I6000000`) and select the **`06-AssignedStudents`** group in the Cisco Secure Client. Do **not** select `01-Employees` as this will cause the connection to fail.

:::



* **Employees:** Use your UM account e.g. `Firstname.Lastname` or your **employee number** (a.k.a. P number), e.g. `P7000000`, and select the **`01-Employees`** VPN group.

* **Students:** Use your **student number**, e.g. `I6000000`, and select the **`06-AssignedStudents`** VPN group.

    <img src="/img/vpn-login.png" alt="VPN Log in View" style={{maxWidth: '100%', maxHeight: '100%'}} />

    After logging in, you will see below page to download the **AnyConnect Secure Mobility Client**

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

Provide your UM username and password.
- **Employees:** use your P number, e.g. `P7000000`, and select `01-Employees`
- **Students:** use your student number, e.g. `I6000000`, and select `06-AssignedStudents`

<img src="/img/vpnsetup6.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />



#### Install the VPN (AnyConnect Secure Mobility Client) on Linux

* Connect to **UMnet** or **eduroam** WiFi at Maastricht University

* For **Linux**, use `openconnect` to connect to the UM VPN. You can easily install it on Ubuntu and Debian distributions with `apt`:

  ```bash
  sudo apt install openconnect
# Employees:
sudo openconnect --useragent "AnyConnect" --no-external-auth -u YOUR.USER --authgroup=01 vpn.maastrichtuniversity.nl
# Students:
sudo openconnect --useragent "AnyConnect" --no-external-auth -u YOUR.STUDENT.NUMBER --authgroup=06 vpn.maastrichtuniversity.nl
  ```

  > Provide your UM password when prompted.


