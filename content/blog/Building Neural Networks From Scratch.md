---
external: false
draft: false
title: Building Neural Networks From Scratch
description: Introduction to how neural networks work.
date: 2025-02-09
---

When I first started with AI and ML I would just learn about the algorithm/model from a youtube video then implement it using tensorflow or pytorch. However, I never felt as if I completely understood it, this is because Tensorflow and Pytorch are considered abstractions and the actual stuff is handled by them under the hood.
I have realized that in order to "truly" understand something I must learn how to implement that concept myself. So now I am focusing more on from-scratch implementations of concepts behind AI inorder to learn about them from a deeper perspective, to get an idea of what is going on "under the hood".  
In this blog, I will be discussing about how neural networks work and show a from-scratch implementation using plain python and numpy.

# What is a neural network

According to [IBM](https://www.ibm.com/think/topics/neural-networks), A neural network is a [machine learning](https://www.ibm.com/topics/machine-learning) program, or model, that makes decisions in a manner similar to the human brain, by using processes that mimic the way biological neurons work together to identify phenomena, weigh options and arrive at conclusions.

![Neural Network](https://i.imgur.com/lYRqqk9.png)
A neural network consists of such nodes that mimic the function of the neurons present in our brain. It consists of nodes arranged in layers, particularly the input layer, output layer and the hidden layers. The hidden layers are where the real magic happens as they are used to detect complex patters within the input data that might help the network come to accurate conclusions. These days neural networks have a wide variety of usage, like analyzing and understanding human language, recommendations in e-commerce, robotics, data analysis, generating music etc.

A neural network has 3 key processes driving its inner learning.

- Forward Propagation
- Calculating the error
- Back Propagation

# The big picture

### What is a neuron

A neuron is a very simple mathematical function that takes its inputs, multiplies each input with a respective weight, adds a bias, then uses a non-linearity (also known as an activation function). Putting together neurons in layers create a multi-layer perceptron or a neural network.

Neural networks learn by fine-tuning their internal parameters, called **weights** and **biases**, through a process involving the following steps:

1. **Forward Propagation**:  
   The network processes the input data step-by-step to produce an output.
2. **Loss Calculation**:  
   A loss function measures the difference between the network's output and the actual target (the correct answer).
3. **Backward Propagation**:  
   Using techniques like gradient descent, the network adjusts its weights and biases to minimize this difference (loss).

Let’s break this down with a simple neural network that has **3 neurons** (organized in layers):

### Step-by-Step Calculation

1. **Input and First Layer**:
   - Suppose the input to the network is x.
   - This input is processed by the first neuron: $z1=W1⋅x+b1$ ​ Here, $W_1$ is the weight, and $b_1$​ is the bias for this layer.
   - The neuron applies an **activation function** (like the sigmoid function) to $z_1$​, producing: $a1=sigmoid(z1)a_1$
2. **Second Layer**:
   - The output of the first neuron, $a_1$, is passed to the next neuron: $z2=W2⋅a1+b2$
   - Again, the neuron applies the activation function: $a2=sigmoid(z2)$
3. **Third Layer (Output)**:
   - The process continues to the final neuron: $z3=W3⋅a2+b$
   - After applying the activation function: $a3=sigmoid(z3)$

### Final Output

The value $a_3$ is the network’s final output. Depending on the problem, $a_3$ could represent:

- A **probability** (e.g., for binary classification),
- A **predicted value** (e.g., in regression problems), or
- An input for further calculations (in deeper networks).

### The key idea

We initialize a neural network with random weights and biases, leading to it providing us with nonsense output. Through training, the main question we ask ourselves is that how must be adjust the weights and biases such that our neural network gives us the answers we need.
During training, we take an example $x$ from our training data and feed it to the network, then we compare the output with the actual value $y$ from our training set and see how much it got wrong. We devise a method which measures how wrong our neural network it then with the magic of calculus we figure out the correct combination of weights and biases we use. By repeating this with the entire training set we are able to come up with a good enough neural network.
As you might have noticed, there are alot of computations involved in this. Too many computations mean that as our network grows it will become slower. However, we do a process called vectorization where we arrange all our weights, biases, training data inside matrices so that we speed up our computation.

Lets see this in action by implementing a neural network and training it to recognize handwritten digits on the MNIST dataset.

## Setup

For this example, the best method would be to think of a neuron as something that holds a number. Our task is to teach a neural network to recognizes handwritten digits.
In this stage, we will decide on our model architecture and prepare our data.

![Architecture](https://i.imgur.com/4xB8tcL.png)
As previously mentioned, a neural network is arranged in layers. The number of nodes in the input and output layer depends on our data and the nodes within the hidden layers is choosen randomly.

Our dataset consists of 28x28 images that represent digits from 0 to 9. We aim to acheive a model where we input our image and the output is a representation of what the number could be.
The input will therefore be a 784 (28x28) layer where each node represents a singular pixel. Our images our greyscale so we can think of the values within the input layer to represent how bright that specific pixel is.
The output of our model will be an array somewhat like
`[0.0, 0.1, 0.1, 0.5, 0, 0, 0, 0.2, 0.1, 0]`
This array represents the probability for the image being a 0 is 0, 1 is 0.1 and so on.  
Now we want to train our network in such a way that when I input an image of 0, then the first element of our array has the highest probability while others are like 0.05 or 0.1 and similarly for other numbers.

# Initializing a neural network

Finally, lets end the yapping and focus on learning through implementation.
Firstly, we will need to prepare our data and ensure it is ready for our neural network to interpret.

```python
import numpy as np
import pandas as pd
from matplotlib import pyplot as plt

data = pd.read_csv('./Data/train.csv')

data = np.array(data)
m, n = data.shape
np.random.shuffle(data) # shuffle before splitting into dev and training sets

data_dev = data[0:1000].T
Y_dev = data_dev[0]
X_dev = data_dev[1:n]
X_dev = X_dev / 255.

data_train = data[1000:m].T
Y_train = data_train[0]
X_train = data_train[1:n]
X_train = X_train / 255.
_,m_train = X_train.shape
```

So this chunk of code firstly imports the libraries we will be using. Numpy and Pandas is needed to handle the numbers. Numpy is used to handle matrices and other linear algebra operations, then we have pandas which is used for data analysis. We have also imported matplotlib which is used to create visualisation of data.

```python
def init_params():
    W1 = np.random.randn(32, 784) * 0.5
    W2 = np.random.randn(16, 32) * 0.5
    W3 = np.random.randn(10, 16) * 0.5

    b1 = np.random.rand(32, 1) * 0.5
    b2 = np.random.rand(16, 1) * 0.5
    b3 = np.random.rand(10, 1) * 0.5

    return W1, W2, W3, b1, b2, b3
```

Here, we create a function which is used to initialize our parameters. Remember our architecture consists of

- 784 neuron input layer
- 32 neuron hidden layer
- 16 neuron hidden layer
- 10 neuron output layer, where each neuron corresponds to the a digit in range 0 to 9.

We are arranging our weights and biases into matrices, we do this because individually multiplying and adding such numbers would mean that as our neural network grows in size it becomes slow. Hence, in this process known as vectorization we convert all our numbers into matrices to leverage faster operations like matrix multiplication.

```python
def ReLu(z):
    return np.maximum(0, z)

def softmax(z):
    return np.exp(z) / sum(np.exp(z))

def ReLU_deriv(Z):
    return Z > 0

def one_hot(Y):
    one_hot_Y = np.zeros((Y.size, Y.max() + 1))
    one_hot_Y[np.arange(Y.size), Y] = 1
    one_hot_Y = one_hot_Y.T
    return one_hot_Y
```

We also define some helper functions like ReLu and Softmax which will be used as our activation function later on.

# Forward Propagation

```python
def forward_prop(W1, W2, W3, b1, b2, b3, X):
    Z1 = np.dot(W1, X) + b1
    A1 = ReLu(Z1)
    A2 = np.dot(W2, A1) + b2
    Z2 = ReLu(A2)
    Z3 = np.dot(W3, A2) + b3
    A3 = softmax(Z3)
    return Z1, A1, Z2, A2, Z3, A3
```

Forward propagation is the step where we run our input through the network and get it to produce an output.

`Z1 = np.dot(W1, X) + b1`: This computes the linear combination of the input data (`X`) and the weights of the first layer (`W1`), adding the bias (`b1`).
`A1 = ReLu(Z1)`: The ReLU (Rectified Linear Unit) activation function is applied to `Z1`. ReLU introduces non-linearity, allowing the model to capture complex patterns by setting all negative values in `Z1` to zero and keeping positive values unchanged.
So the general equation to pass on the computations from one layer to another can be represented buy the equation `activation_func(WX + B)` where X denotes the output from the previous layers.
In the last layer we have applied the softmax activation function instead of ReLu, this is because now we want to convert the scores into probabilities. The function is used in the output layer as it helps to interpret the result as a probability distribution over different classes.

# Error Calculation

Now that we have a method to generate our output we will need a system that measures how bad our neural network is doing. This is done using a loss function.
We calculate the cost of a single example to be (y_hat - y)^2 this is known as the error squared. Now to calculate the cost over all the training example we will take their cumulative mean. After taking their mean you have now realized that we are able to form a function that can take the weights and biases of our model as input parameters and is able to give us a measure of how good those weights and biases are.

There are different loss functions and each of them have their different advantages and disadvantages, here I am using MSE because its suitable for this task and also easier to explain.

Feel free to read [this article](https://www.geeksforgeeks.org/loss-functions-in-deep-learning/) to learn about more loss functions.

# Backward Propagation

Now that we have initialized our model, we need a method to convert these random values into a carefully chose sets of weights and biases such that our model is able to provide good results.

In order to do this, we must first find how affecting the activations of layer n - 1 will affect our output, then we must find how much affecting the activations of layer n - 2 will affect output from layer n - 1 and so one. In order to do this, we must use the chain rule.

![Chain rule](https://i.imgur.com/ZOW6ezQ.png)

Basically, we are finding the partial derivative of each and every weight in our neural network with respect to the loss function. We are doing this so we can figure out in what direction we must nudge these weights such that we minimize our loss function.

```python
def backwards_prop(Z1, A1, Z2, A2, W1, W2, X, Y):
    one_hot_Y = one_hot(Y)
    dZ2 = A2 - one_hot_Y
    dW2 = (1/m) * np.dot(dZ2, A1.T)
    dB2 = (1/m) * np.sum(dZ2)

    dZ1 = np.dot(W2.T, dZ2) * ReLU_deriv(Z1)
    dW1 = (1/m) * np.dot(dZ1, X.T)
    dB1 = (1/m) * np.sum(dZ1, axis = 1, keepdims = True)

    return dW2, dB2, dW1, dB1

def update_params(W1, b1, W2, b2, dW2, db2, dW1, db1, learning_rate):
    W1 = W1 - learning_rate * dW1
    b1 = b1 - learning_rate * db1
    W2 = W2 - learning_rate * dW2
    b2 = b2 - learning_rate * db2
    return W1, b1, W2, b2
```

We have also defined a function that updates our params by scaling our partial derivative using a learning_rate. The learning_rate our step size within our loss function. Now using these functions we need to create an algorithm that will

1. Forward propagate our data using the current weights and biases
2. Find the error with respect to each and every weights and biases
3. Then update these weights in the correct direction such that our loss gets minimized.

This algorithm does exactly that is called gradient descent.

[Losslandscape](https://losslandscape.com/explorer) is a great way to visualize how we will function is technically "navigating" our loss function right now trying to find a lowest point.

```python
def gradient_descent(X, Y, learning_rate, epochs):
    W1, b1, W2, b2 = init_params()

    for i in range(epochs):
        Z1, A1, Z2, A2 = forward_prop(W1, b1, W2, b2, X)
        dW2, dB2, dW1, dB1 = backwards_prop(Z1, A1, Z2, A2, W1, W2, X, Y)
        W1, b1, W2, b2 = update_params(W1, b1, W2, b2, dW2, dB2, dW1, dB1, learning_rate)
        if i % 10 == 0:
            print("Iteration: ", i)
            predictions = get_preds(A2)
            print(get_accuracy(predictions, Y))
    return W1, b2, W2, b2
```

All the code written in this blog can be found [Here](https://github.com/Vangmay/From_Scratch_Implementations/blob/main/Neural_Networks/MNIST.ipynb)

Feel free to run it for yourself.

# Conclusion and Closing statements

So in this blog we have covered

- What are neural networks
- How do they work
- Important algorithms like back propagation and gradient descent.

These days, it is very simple to just pickup an abstraction like PyTorch and code away, however to truly understand interesting AI concepts it is crucial that we learn to implement from scratch.
Writing this blog helped me internalize the concepts behind neural network and hope it helps you too :).

Thanks for reading, feel free to reach out to me via email or twitter!
