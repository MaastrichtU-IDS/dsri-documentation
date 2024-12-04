---
id: checkpointing-ml-training
title: Checkpointing Machine Learning Training
---
## What is Checkpointing?
Checkpointing is periodically saving the learned model parameters and current hyperparameter values during training. It helps to resume training of a model where you left off, instead of restarting the training from the beginning.

On shared DSRI cluster, you might have access to a GPU node for a limited number of time in one stretch, for example, maybe for 24 hours. 
Therefore, whenever the training job fails (due to timelimit expiry or otherwise), many hours of training can be lost. This problem is mitigated by a frequent checkpoint saving. When the training is resumed it'll continue from the last checkpoint saved. If the failure occurred 12 hours after the last checkpoint has been saved, 12 hours of training is lost and needs to be re-done. This can be very expensive.

## Checkpointing fequency?
In theory one could save a checkpoint every 10 minutes and only ever lose 10 minutes of training time, but this too would dramatically delay the reaching of the finish line because large models can't be saved quickly and if the saving time starts to create a bottleneck for the training this approach becomes counterproductive.

Depending on your checkpointing methodology and the speed of your IO storage partition the saving of a large model can take from dozens of seconds to several minutes. Therefore, the optimal approach to saving frequency lies somewhere in the middle.

The math is quite simple - measure the amount of time it takes to save the checkpoint, multiply it by how many times you'd want to save it and see how much of an additional delay the checkpoint saving will contribute to the total training time.

For instance, Let suppose, 

1) Training Time (TT), i.e. allocated time on cluster : x days
2) Time needed to save every checkpoint: y seconds
3) Checkpoint fequencty: every z hours

=> Then, Total Number of Checkpoints during the complete training time (NCP) = (x *24)/ z

=> Total Time Spent on Checkpointing (TTSC) [in hours] = NCP * y/3600 

=> % of Training time spent on checkpointing = (TTSC/TT*24) * 100

------------------Example calculations------------------------------------

Training Time (TT or x): 7 days

Time needed to save every checkpoint (y): 20 secs

Checkpoint fequency (z): every 30 minutes, i.e., 0.5 hours

Then, 

NCP = 7*24/0.5 = 336

TTSC = 336* 20/3600 = 1.87 hours

% of Training time spent on checkpointing = (1.87/7*24)*100 ~ 1.2 %     


## Support for Checkpointing in Tensorflow/Keras and PyTorch ?

Both PyTorch and TensorFlow/Keras support checkpointing. The follwoing sections provide an example of how Checkpointing can be done in these libraries.

## Example of Tensorflow/Keras based checkpointing:

```python
import tensorflow as tf

#Imports the ModelCheckpoint class
from tensorflow.keras.callbacks import ModelCheckpoint

# Create your model as you normally would and compile it:
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(32,)),
    tf.keras.layers.Dense(10, activation='softmax')
])
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Create a Checkpoint Callback
checkpoint_callback = ModelCheckpoint(
#filepath should be a path to your persistent volume. Example, /home/jovyan path in your JupyterLab pod.
    filepath='model_checkpoint.h5',  # You can use formats like .hdf5 or .ckpt. 
    save_best_only=True,
    monitor='val_loss',
    mode='min',
    verbose=1
)

# Train the Model with the Checkpoint Callback
history = model.fit(
    x_train, y_train,
    validation_data=(x_val, y_val),
    epochs=10,
    callbacks=[checkpoint_callback]
)

# Loading a Saved Checkpoint
# Load the model architecture + weights if you saved the full model
model = tf.keras.models.load_model('model_checkpoint.h5')

# If you saved only the weights, you would need to create the model architecture first, then load weights:
model.load_weights('model_checkpoint.h5')

# Optional Parameters for Checkpointing, Example with Custom Save Intervals
checkpoint_callback = ModelCheckpoint(
    filepath='model_checkpoint_epoch_{epoch:02d}.h5',
    save_freq='epoch',
    save_weights_only=True,
    verbose=1
)


```


## Example of PyTorch based checkpointing:

```python
import torch

# Example model
model = torch.nn.Linear(10, 2)

# Save the entire model
torch.save(model, 'model.pth')

# Loading the Entire Model
model = torch.load('model.pth')

# Saving and Loading Optimizer State, i.e., To continue training exactly as before, you may want to save the optimizer state as well.

optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

# Save model and optimizer state_dicts
checkpoint = {
    'epoch': 5,
    'model_state_dict': model.state_dict(),
    'optimizer_state_dict': optimizer.state_dict(),
    'loss': 0.5,
}
torch.save(checkpoint, 'checkpoint.pth')

# Load checkpoint
checkpoint = torch.load('checkpoint.pth')
model.load_state_dict(checkpoint['model_state_dict'])
optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
epoch = checkpoint['epoch']
loss = checkpoint['loss']
model.train()  # Ensure model is in training mode if needed





```

## External Resources

* PyTorch Documentation: https://pytorch.org/tutorials/beginner/saving_loading_models.html#save-on-gpu-load-on-cpu
* Tensorflow/Keras Documentation:
  
  https://www.digitalocean.com/community/tutorials/checkpointing-in-tensorflow
  
  https://keras.io/api/callbacks/model_checkpoint/

* Machine Learning Engineering by stas bekman:
  https://stasosphere.com/machine-learning/
  
 
