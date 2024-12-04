---
id: profile-pytorch-code
title: PyTorch Profiling
---
## What is profiling?
According to wikipedia:

"Profiling is a form of dynamic program analysis that measures, for example, the space (memory) or time complexity of a program, the usage of particular instructions, or the frequency and duration of function calls. Most commonly, profiling information serves to aid program optimization, and more specifically, performance engineering."

## Why should I care about profiling?
You may know that training large models like GPT-3 takes several million dollars source and a few hundred MWh source. If the engineers that trained these models did not spend time on optimization, it might have been several million dollars and hunderds of MWh more.

Sure, the model you'd like to train is probably not quite as big. But maybe you want to train it 10000 times, because you want to do hyperparameter optimization. And even if you only train it once, it may take quite a bit of compute resources, i.e. money and energy.

## When should I care about profiling?
Well, you should always care if your code runs efficiently, but there's different levels of caring.

From personal experience: if I know I'm going to run a code only once, for a few days, on a single GPU, I'll probably not create a full profile. What I would do is inspect my GPU and CPU utilization during my runs, just to see if it is somewhat efficient, and if I didn't make any obvious mistakes (e.g. accidentally not using the GPU, even if I have one available).

If I know that I'll run my code on multiple GPUs, for multiple days, (potentially) on multiple nodes, and/or I need to run it multiple times, I know that my resource footprint is going to be large, and it's worth spending some time and effort to optimize the code. That's when I'll create a profile. The good part is: the more often you do it, the quicker and more adapt you become at it.

## How DSRI team can help you?

We can assist you  with analyzing the bottleneck/s in your deep learning pipeline and recommend the improvments to speed up your pipeline.

## External Resources and references

* This documentation is taken from the Surf's PyTorch profiling wiki (https://servicedesk.surf.nl/wiki/display/WIKI/PyTorch+Profiling)
* Tutorial on PyTorch profiling can be found here: (https://github.com/sara-nl/PraceHPML2022/blob/master/notebooks/PyTorch_profiling/PyTorch_profiling.ipynb)
  

