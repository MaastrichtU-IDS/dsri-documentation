---
id: checkpointing-ml-training
title: Checkpointing Machine Learning Training
---

## What is checkpointing?

Checkpointing means saving the state of your model at regular intervals during training: the learned weights and, optionally, the optimizer state and the current epoch. If training stops, you can resume from the last checkpoint instead of starting again from the beginning.

On the DSRI, GPUs are shared and booked for a limited time slot through the [GPU booking calendar](/gpu-booking). When your booking ends or your pod restarts, any training progress that was not saved is lost. If your last checkpoint was saved 12 hours ago, you lose 12 hours of training.

:::caution Save checkpoints to persistent storage
Always write your checkpoints to the persistent volume of your workspace. Files saved anywhere else in the container are deleted when the pod restarts. See [Data storage](/docs/openshift-storage) for more information.
:::

## How often should you save?

Saving too rarely means you lose a lot of work when training stops. Saving too often slows down training, because writing a large model to disk can take from a few seconds to several minutes.

To find a good balance, measure how long one save takes and calculate how much of your training time goes to checkpointing:

| What | How to calculate |
|---|---|
| Number of checkpoints | training time (hours) ÷ save interval (hours) |
| Time spent saving (hours) | number of checkpoints × time per save (seconds) ÷ 3600 |
| Share of training time | time spent saving ÷ training time (hours) × 100 |

**Example:** 7 days of training (168 hours), one save takes 20 seconds, and you save every 30 minutes (0.5 hours):

- Number of checkpoints: 168 ÷ 0.5 = **336**
- Time spent saving: 336 × 20 ÷ 3600 ≈ **1.9 hours**
- Share of training time: 1.9 ÷ 168 × 100 ≈ **1.1%**

Spending about 1% of your training time on saving, so that you never lose more than 30 minutes of work, is usually a good trade-off.

## TensorFlow / Keras

Keras saves checkpoints with the `ModelCheckpoint` callback, which you pass to `model.fit()`.

:::info File extensions
Since TensorFlow 2.16 (Keras 3), full models are saved with the `.keras` extension and weights-only files must end in `.weights.h5`. Older examples that use `.h5` for full models are outdated.
:::

### Save a checkpoint every epoch

```python
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import ModelCheckpoint

# Folder on your persistent volume
checkpoint_dir = "checkpoints"
os.makedirs(checkpoint_dir, exist_ok=True)

# Dummy data for testing, replace with your own data
x_train = np.random.rand(1000, 32)
y_train = tf.keras.utils.to_categorical(np.random.randint(10, size=1000), 10)
x_val = np.random.rand(200, 32)
y_val = tf.keras.utils.to_categorical(np.random.randint(10, size=200), 10)

# Create and compile your model as you normally would
model = tf.keras.Sequential([
    tf.keras.Input(shape=(32,)),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax"),
])
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Save the full model at the end of every epoch
checkpoint_callback = ModelCheckpoint(
    filepath=os.path.join(checkpoint_dir, "model_epoch_{epoch:02d}.keras"),
    save_freq="epoch",
    verbose=1,
)

model.fit(
    x_train, y_train,
    validation_data=(x_val, y_val),
    epochs=10,
    callbacks=[checkpoint_callback],
)
```

To save every N batches instead of every epoch, set `save_freq` to a number, for example `save_freq=500`.

### Resume training from a checkpoint

A `.keras` file contains the model architecture, the weights and the optimizer state, so training continues exactly where it stopped. Use `initial_epoch` to tell Keras which epoch to continue from:

```python
model = tf.keras.models.load_model(os.path.join(checkpoint_dir, "model_epoch_05.keras"))

model.fit(
    x_train, y_train,
    validation_data=(x_val, y_val),
    epochs=10,
    initial_epoch=5,  # continues with epoch 6
    callbacks=[checkpoint_callback],
)
```

### Keep only the best model

To keep only the model with the lowest validation loss, use `save_best_only`:

```python
best_callback = ModelCheckpoint(
    filepath=os.path.join(checkpoint_dir, "best_model.keras"),
    monitor="val_loss",
    mode="min",
    save_best_only=True,
    verbose=1,
)
```

### Save only the weights

Weights-only files are smaller, but you need to create the same model architecture again before loading them:

```python
weights_callback = ModelCheckpoint(
    filepath=os.path.join(checkpoint_dir, "weights_epoch_{epoch:02d}.weights.h5"),
    save_weights_only=True,
    verbose=1,
)

# Later: create the model again, then load the weights
model.load_weights(os.path.join(checkpoint_dir, "weights_epoch_05.weights.h5"))
```

## PyTorch

In PyTorch you save a checkpoint yourself with `torch.save()`. Save the `state_dict` of the model and the optimizer, together with the current epoch, so you can continue training exactly where you left off.

The example below saves a checkpoint after every epoch. When you run it again, it finds the checkpoint and resumes from there:

```python
import os
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"

# Folder on your persistent volume
checkpoint_dir = "checkpoints"
os.makedirs(checkpoint_dir, exist_ok=True)
checkpoint_path = os.path.join(checkpoint_dir, "checkpoint.pth")

# Example model, optimizer and dummy data, replace with your own
model = torch.nn.Linear(10, 2).to(device)
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)
loss_fn = torch.nn.MSELoss()
x = torch.randn(100, 10, device=device)
y = torch.randn(100, 2, device=device)

# Resume from the last checkpoint if it exists
start_epoch = 0
if os.path.exists(checkpoint_path):
    checkpoint = torch.load(checkpoint_path, map_location=device)
    model.load_state_dict(checkpoint["model_state_dict"])
    optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
    start_epoch = checkpoint["epoch"] + 1
    print(f"Resuming from epoch {start_epoch}")

num_epochs = 10
for epoch in range(start_epoch, num_epochs):
    model.train()
    optimizer.zero_grad()
    loss = loss_fn(model(x), y)
    loss.backward()
    optimizer.step()

    # Save the checkpoint at the end of every epoch
    torch.save({
        "epoch": epoch,
        "model_state_dict": model.state_dict(),
        "optimizer_state_dict": optimizer.state_dict(),
        "loss": loss.item(),
    }, checkpoint_path)
    print(f"Epoch {epoch}: loss {loss.item():.4f}, checkpoint saved")
```

:::info Don't save the whole model object
Avoid `torch.save(model, ...)`. Since PyTorch 2.6, `torch.load()` only loads weights and other safe data by default, so loading a full saved model fails unless you set `weights_only=False`. A full model file can also break when your code changes. Saving the `state_dict`, as in the example above, avoids both problems.
:::

:::tip Avoid corrupted checkpoints
If your pod stops while a checkpoint is being written, the file can be left incomplete. To avoid this, save to a temporary file first and then rename it:

```python
torch.save(checkpoint_data, checkpoint_path + ".tmp")
os.replace(checkpoint_path + ".tmp", checkpoint_path)
```
:::

## External resources

- [PyTorch: Saving and loading models](https://pytorch.org/tutorials/beginner/saving_loading_models.html)
- [Keras: ModelCheckpoint](https://keras.io/api/callbacks/model_checkpoint/)
- [TensorFlow checkpointing tutorial (DigitalOcean)](https://www.digitalocean.com/community/tutorials/checkpointing-in-tensorflow)
- [Machine Learning Engineering by Stas Bekman](https://stasosphere.com/machine-learning/)
