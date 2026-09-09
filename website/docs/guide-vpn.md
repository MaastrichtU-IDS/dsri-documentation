---
id: guide-vpn
title: Installing the UM VPN
---

:::danger **Important Note:**
We do not grant access to the UM VPN. We only have documentation on how to use and set up the VPN when you already have access. If you would need access to the UM VPN, please reach out to your information manager!
:::


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

    After logging in, you will see below page to download the **Cisco Secure Client**

    <img src="/img/VPN-anyconnect.png" alt="Download Cisco Secure Client" style={{maxWidth: '100%', maxHeight: '100%'}} />

#### Install and log in to the VPN (Cisco Secure Client)

Run the installer you downloaded (`.exe` on Windows, the equivalent installer/package on Linux) and follow the setup steps.

<img src="/img/vpnsetup1.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/vpnsetup2.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/vpnsetup3.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

<img src="/img/vpnsetup4.png" alt="Install VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

Once installed, open the Cisco Secure Client.

<img src="/img/vpnsetup7.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

Connect to `vpn.maastrichtuniversity.nl` and click connect.

<img src="/img/vpnsetup5.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />

Provide your UM username and password.
- **Employees:** use your P number, e.g. `P7000000`, and select `01-Employees`
- **Students:** use your student number, e.g. `I6000000`, and select `06-AssignedStudents`

<img src="/img/vpnsetup6.png" alt="Log in to the VPN" style={{maxWidth: '100%', maxHeight: '100%'}} />
