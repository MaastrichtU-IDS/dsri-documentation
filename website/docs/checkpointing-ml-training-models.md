---
id: checkpointing-ml-training
title: Checkpointing Machine Learning Training
---
## What is Checkpointing?
Checkpointing is periodically saving the learned model parameters and current hyperparameter values during training. It helps to resume training of a model where you left off, instead of restarting the training from the beginning.
In case of disruption, Save model snapshots periodically during training so progress isn’t lost if a spot instance gets terminated. Resume from the last checkpoint.

In case of shared DSRI cluster, you might have access to a GPU node for a limited number of time in one stretch, for example, maybe for 24 hours. 
Therefore, whenever the training job fails (due to timelimit expiry or otherwise), many hours of training can be lost. This problem is mitigated by a frequent checkpoint saving. When the training is resumed it'll continue from the last checkpoint saved. If the failure occurred 12 hours after the last checkpoint has been saved, 12 hours of training is lost and needs to be re-done. This can be very expensive.

## Checkpointing fequency?
In theory one could save a checkpoint every 10 minutes and only ever lose 10 minutes of training time, but this too would dramatically delay the reaching of the finish line because large models can't be saved quickly and if the saving time starts to create a bottleneck for the training this approach becomes counterproductive.

Depending on your checkpointing methodology and the speed of your IO storage partition the saving of a large model can take from dozens of seconds to several minutes. Therefore, the optimal approach to saving frequency lies somewhere in the middle.

The math is quite simple - measure the amount of time it takes to save the checkpoint, multiply it by how many times you'd want to save it and see how much of an additional delay the checkpoint saving will contribute to the total training time.


## how to do checkpointing in popular Deep Learning libraries?
