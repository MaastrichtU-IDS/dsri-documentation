---
id: surf-offerings
title: SURF's digital services for conducting research and development 
---
## What is SURF?

SURF is the ICT cooperative of Dutch education and research institutions. The members, the owners of SURF, join forces to develop or procure the best possible digital services, work together on complex innovation issues and develop and share knowledge with each other.

## Different types of Computing and Storage services provided by SURF:


## Snellius and Spider Compute Clusters

SURF hosts the Dutch National supercomputer known as Snellius cluster
The following section gives a quick introduction to the Snellius cluster, and how it is build up. A detailed description of the system can be found in the SURF user guide (See the external resources links at the bottom of this page).

What is a cluster computer?
You can imagine a cluster computer as a collection of regular computers (known as nodes), tied together with network cables that are similar to the network cables in your home or office (see the figure below - credit: SURF team). Each node has its own CPU, memory and disk space, in addition to which they generally have access to a shared file system. On a cluster computer, you can run hundreds of computational tasks simultaneously.

Interacting with a cluster computer is different from a normal computer. Normal computers are mostly used interactively, i.e. you type a command or click with your mouse, and your computer instantly responds by e.g. running a program. Cluster computers are mostly used non-interactively.

A cluster computer such as Snellius mainly has two types of nodes: login nodes and compute nodes. You connect to Snellius through the login node (see next section). This is an interactive node: similar to your own PC, it immediately responds to the commands you type. There are only a few login nodes on a cluster computer, and you only use them for light tasks: adjusting your code, preparing your input data, writing job scripts, etc. Since the login nodes are only meant for light tasks, many users can be on the same login node at the same time. To prevent users from over-using the login node, any command that takes longer than 15 minutes will be killed.

Your ‘big’ calculations such a neural network training will be done on the compute nodes. These perform what is known as batch jobs. A batch job is essentially a recipe of commands (put together in a job script) that you want the computer to execute. Calculations on the compute nodes are not performed right away. Instead, you submit your job script to the job queue. As soon as sufficient resources (i.e. compute nodes) are available for your job, the system will take your job from the queue, and send it to the compute nodes for execution.

## Different Data Storage Services provided by SURF: 

dCache and Object Store



## How DSRI team can help you?


## External Resources

* 
* 

*
 

