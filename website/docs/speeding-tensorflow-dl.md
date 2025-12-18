---
id: speeding-tensorflow-dl
title: Tensorflow Optimization
---

## 🔶 Speeding up Tensorflow based deep learning pipelines

The amount of resources that you have is not nearly as important as using them to their maximum potential. It’s all about doing more with less.In this write up, we discuss optimizations related to data preparation, data reading, data augmentation,training, and inference. 

## A possible checklist for speeding up your deep learning pipeline in Tensorflow? 
Let’s look at each area of the deep learning pipeline step by step, including data preparation, data reading, data augmentation, training, and, finally, inference.
## Data Preparation
1) Store as TFRecords
2) Reduce Size of Input Data
3) Use TensorFlow Datasets

## Data Reading
1) Use tf.data
2) Prefetch Data
3) Parallelize CPU Processing
4) Parallelize I/O and Processing
5) Enable Nondeterministic Ordering
6) Cache Data
7) Turn on Experimental Optimizations
8) Autotune Parameter Values
   
## Data Augmentation
1) Use GPU for Augmentation

## Training
1) Use Automatic Mixed Precision
2) Use Larger Batch Size
3) Use Multiples of Eight
4) Find the Optimal Learning Rate
5) Use tf.function
6) Overtrain, and Then Generalize
   
   6a) Use progressive sampling
   
   6b) Use progressive augmentation
   
   6c) Use progressive resizing”

 7) Install an Optimized Stack for the Hardware
 8) Optimize the Number of Parallel CPU Threads
 9) Use Better Hardware
 10) Distribute Training
 11) Examine Industry Benchmarks
     
## Inference
1) Use an Efficient Model
2) Quantize the Model
3) Prune the Model
4) Use Fused Operations
5) Enable GPU Persistence

## How RCS team can help you?

We can assist you  with analyzing the bottleneck/s in your deep learning pipeline and recommend the improvments to speed up your pipeline.

## External Resources and references

* This documentation is adopted from the "Practical Deep Learning for Cloud, Mobile, and Edge by Koul etl (publish by O’Reilly)
