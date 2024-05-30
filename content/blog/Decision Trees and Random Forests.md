---
external: false
draft: false
title: Decision trees and Random forests
description: In this blog, I will be introducing what are decision trees and how they can be used to derive inferences using data.
date: 2024-05-30
---

In this blog, we'll explore how decision trees and random forests can be used to make insightful predictions. They are used quite a lot in real world applications such as identifying a patient’s disease based on their medical records, fraud detection and can even be used to make the choice of whether a stock is worth buying or not.

Let's start with a simple **divide and conquer algorithm** to give you an idea of what the algorithm does. Suppose I am thinking of a number between 1 to 100 right now and I want you to guess which number is that. In order to help you guess, you can ask me questions like is the number 10? To which I can only reply yes or no. How will you go about it? The best strategy is to ask questions which help you reduce the search space, I would pick the midpoint and ask is the number <= 50? If you answer yes, I would ask for the number 25. If you answered no I would ask if the number <= 75 and so on. By picking the midpoint between a certain range, it helps me reduce half of the search space and makes the search efficient (This is an approach called binary search). Just as binary search efficiently narrows down the search space, decision trees use a series of splits to categorise data points.

![Binary Search Tree](https://i.imgur.com/sYHRUKh.png)

What I have done, can be nicely demonstrated by a tree. By asking more questions like this, you can eventually deduce what your friend was thinking about.

In a similar situation, Imagine a game of 20 questions, where your friends say, “I’m thinking of a noun, ask me up to 20 yes/no questions to guess what it is”. So now your approach will be to ask carefully crafted questions such that each question leads you to having some sort of **information gain** about what your friend is thinking. In this scenario, you are essentially using a decision tree to come up with a deduction about this object.

![Decision Tree](https://i.imgur.com/MrFPiz8.png)

This is also how hospitals systematically come up with a diagnosis for a patient. They ask a few questions then take your vitals to determine what is wrong. They don’t start doing a check for each and every disease one by one.

Tree terminology:

- Root node: Top node of a tree
- Leaf node: node at the last level of the tree.
- Internal node: Neither root nor a leaf node.

Why is this interesting? Well, it turns out that you can use decision trees to make quite important inferences from data.
There are two types of decision trees. Regression tree and Classification trees. Classification trees are used to predict categorical data, such as whether an email is spam or not, while regression trees are used to predict numerical data, such as the price of a stock.

# Titanic Dataset

Kaggle has a [titanic dataset](https://www.kaggle.com/competitions/titanic) that has data on passengers and whether they survived the titanic or not, using this data we can build a decision tree that allows us to predict if someone would survive the titanic or not.

![Titanic Dataset](https://i.imgur.com/T5cqrQx.png)

## How do we create a split

We want to find a variable which allows us to cleanly split the passengers so that we can ask a series of questions that allows us to make an informed guess about whether a person might survive the Titanic in a hypothetical scenario.
Using this algorithm, we are basically trying to reduce the amount of disorder within our dataset. If we ask a question which gives us a perfect split, such that Yes gives a chance of 100% survivability and no gives 0% survivability then we have zero disorder. The disorder can be quantified using the [gini index](https://en.wikipedia.org/wiki/Decision_tree_learning#Gini_impurity), where lower values indicate a better split.

Surprisingly, gender gives the best way to split the data. Based on the following graphs, 75% of female passengers survived and just 15% of the male passengers survived.

![First split](https://i.imgur.com/snJv68y.png)

This makes a good split for our root node. Now we have divided our data into two groups based on gender. We will find a property that gives a good split for each of these two groups.
But the issue is that it is not necessary that if you are female you definitely survived or if you are a male then you definitely were killed, which means that there is some entropy in our data so by further splitting our data and branching out our tree by creating more nodes we are trying to minimise this entropy and come up with a model that has good enough accuracy.

![Decision tree](https://i.imgur.com/7tfrFLl.png)

The first branch splits the data into male and female. Similarly, the male branch is split into age, which minimises entropy for the subset of dataset where gender = Male. The female brach is split based on the ticket class which minimises the entropy for the subset of dataset where gender = female. By splitting our data further and further, we will ensure that entropy gets minimised and we have a well constructed decision tree.

**Here is how you can use a simple decision tree in python**

```python
from sklearn.tree import DecisionTreeClassifier, export_graphviz
m = DecisionTreeClassifier(min_samples_leaf=50)
m.fit(trn_xs, trn_y)
# data is stored in trn_xs and the labels are in trn_y
```

One interesting side effect is that this entire process also gives you some idea of what features of our dataset are really important and what we should focus on if we want to improve a certain result.

![Importance Plot](https://i.imgur.com/ahQLvvM.png)

# Random forests

The key issue with decision trees is that they tend to often overfit.

> Overfitting is when the model has fitted the data too perfectly to the noise and errors of the data that it cannot perform well on new and unseen data.

Random forest is an ensemble model, meaning that it is created out of many other models, basically we create multiple decision trees and we aggregate their results. But before that we preprocess the data by bootstrapping it.

# Bootstrapping data

Bootstrapping involves repeatedly sampling subsets of the data with replacement to create training sets for each tree.
We bootstrap the data by creating a decision tree classifier using only a small subset of data and we don’t use all of the features.
We also use a process called feature selection which basically means that out of all the features/information provided to us about the passengers [Survived, PClass, Name, sex, age, SipSb, Parch, Ticket, Cabin, Embarked] we will only select some of those and not all the features. For example we make a decision tree out of only 10 examples using the columns [Sex, Pclass, Fare] and out of those columns we only select 20 examples (passengers). This is a random process, so our program will randomly choose what columns to use and how many samples to choose for a specific decision tree. Selecting what features to use is a process called feature selection, together, these techniques enhance the robustness and generalisation of the random forest model by reducing overfitting and capturing varied data patterns.

## Create a forest

We create multiple trees with this bootstrapped data. All of our trees have a different subset of data they are using from the original dataset. To make inferences, we will simply ask each and every tree of our forest to give us a prediction then we average those results to make a decision. I like to picture the process as a council of wise people giving their opinion of our dataset and we (the programmer) are basically considering all their opinions into one final informed decision.

**Here's how to use a random forest model using python**

```python

from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(100, min_samples_leaf=5)
rf.fit(trn_xs, trn_y); # Training our data

```

In conclusion, decision trees and random forests are powerful tools for classification and regression tasks. Random forests help reduce the problem of overfitting when using decision trees by using a technique known as bootstrapping and aggregating their results, together this process is known as bagging. I find decision trees interesting because they offer a clear visual representation of decision-making processes, making it easy to understand how predictions are made.

Thank you for reading this blog :)
If you are interested to know more about them do check out the following links.

- [Decision and Classification Trees, Clearly Explained!!!](https://www.youtube.com/watch?v=_L39rN6gz7Y)

- [StatQuest: Random Forests Part 1 - Building, Using and Evaluating](https://www.youtube.com/watch?v=J4Wdy0Wc_xQ)

- [Medium Blog post on Decision](https://medium.com/machine-learning-for-humans/why-machine-learning-matters-6164faf1df12)

- [Coding Exercise | Jeremy Howard](https://www.kaggle.com/code/jhoward/how-random-forests-really-work/)
