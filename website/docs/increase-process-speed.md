---
id: increase-process-speed
title: Increasing Your Processes' Speed
---

DSRI provides a lot of computing resources, but there are a few things to know if you want to increase the speed of your processes.

## The good

With the DSRI you get  access to a workspace with more memory and cores than your laptop (around 200G memory, and 64 cores on the DSRI, against around 16G memory and 8 cores on your laptop)

Those additional resources **might** help to make your workload run faster, but not automatically! It will run faster  

* If your code can make use of the really large amount of RAM to load more of the data to process in memory. But if your workload does not require dozens of GB of memory, and your laptop does not face out of memory issues, or crash, when you run your workload, then you probably already have enough memory on your laptop, and will not gain a significant boost from the increased memory.
* If you can run your workload in parallel, or enable the libraries you use to use the  available cores. This will highly depend on the libraries you use. Do  they support running their processes in parallel? Do you need to explicitly enable parallelism on a specific number of cores?

Proper parallelism is not  achieved easily, it needs to be manually implemented within the library processes. 

For example, Python has a "Global  Interpreter Lock" (aka. GIL) that limit threads parallelism by design, so when you are doing some work on a spreadsheet with `pandas`, you are only going to use 1 thread (which is nice, because it makes the conceptualization and understanding of algorithms easier, but it also makes it harder to write truly efficient libraries)

You will need to use complementary libraries if you want to use more threads while processing data with `pandas`. There are multiple ways and libraries to achieve this, but the easiest, if you want to check it yourself with pandas, is to use [pandarallel](https://github.com/nalepae/pandarallel). You could also implement the parallelism yourself with `concurrent.futures`

## The bad

Until now everything seems good, more memory, more cores... So, what's the catch? It can only get better, no?

Application and workspace running on the DSRI uses a persistent volume to avoid losing data when  the application is restarted. On most workspaces this persistent volume  is mounted on the workspace working directory.

This persistent volume is not hosted directly on the same node as your application, it's hosted on the cluster in a distributed fashion (remember you can attach this  persistent volume to different applications, which might be hosted on different nodes themselves)

And distributed storage means: slower read and write times! 

* In your laptop the data is in a hard drive disc sitting at 2 cm of the CPU and memory.

* In the DSRI your workspace  might be on node 4, when the persistent volume is on node 8. In this  case the data will need to go through the network

So if you write a script to  just load data, do no computing, and write back the data to the  persistent volume, it will probably be much faster on your laptop than on the DSRI!

## The solution

Only 1 folder (and its  subfolders) usually mounted on the persistent volume. The rest is "ephemeral  storage", which is the data bound to the application you started, this means the data will be stored on the same node as your workspace. 

Which might result in faster read/write speed! But also means the data will be lost if the workspace is restarted (which does  not happen everyday, but can happen without notice)

A solution could be to:

* Keep your code and important data as backup in the persistent volume (the workspace working dir usually)
* Copy the data your process needs to load in a folder outside of the persistent volume (on the ephemeral storage)
* Read/write data mostly from this folder on the ephemeral storage, avoid using the data in the  persistent volume folder as much as possible
* Copy the important result  files or temporary files you don't want to lose from the folder on the  ephemeral storage to the folder on the persistent storage

Let us know how it works for you on the [Topdesk Form ](https://servicedesk.icts.maastrichtuniversity.nl/tas/public/ssp/content/serviceflow?unid=1ffa93e9ecd94d938ad46e3cb24c2392), and if you have suggestions to improve the workspaces.
