---
external: false
draft: false
title: "My thoughts on CS1101S" 
description: Discussing a module that I took in my first semester of university 
date: 2023-12-05
---
During my first semester at National University of Singapore, My intro to programming module was "CS1101S: Programming Methodology I". I found this module to be the most challenging and rewarding experiences I have ever had. For me this is one of the most difficult "introductory" programming course that I had to go through ever.
I found the module to be quite useful and also makes freshmen to push themselves. 
If you are a freshmen joining NUS and are thinking "Its just an introductory mod and since I have previous exposure to programming this mod is an easy A+", NO ITS NOT. 

# Outline 
The module is divided into 5 examinations and a ton of continuous assessments based on an interactive web application called source academy. 
The teaching team of the module consists of Professor Martin Henz, Professor Boyd Anderson, Professor Low Kok Lim, Professor Sanka Rasnayaka and an army of tutors that teach and empower the freshmen during their tutorial sessions. 

This module introduces the concepts of programming and computational problem solving. It starts from a small core of fundamental abstractions, the module introduces programming as a method for communicating computational processes. 

> A powerful programming language is more than just a means for instructing a computer to perform tasks. The language also serves as a framework within which we organize our ideas about processes.[^1]



The module begins with purely functional programming based on a simple substitution model, and ends with a powerful modern imperative language based on a realistic environment-based execution model. Topics covered include: functional abstraction, recursion, higher-order functions, data abstraction, algorithmic strategies, state mutation, loops and arrays, evaluation strategies, sorting and searching and the implementation of a whole interpreter at the end. 

Here is a breakdown of the full course
**Assessment Components**   
- Source Academy: 14% (full grade awarded upon hitting 24,000XP)  
- Studios (Tutorials): 5% (Attendance 3%, Effort 2%)  
- Reflection Attendance (Recitation): 5%  
- Reading Assessment 1: 5%  
- Reading Assessment 2: 8%  
- Mastery Check 1: 3%  
- Mastery Check 2: 3%  
- Midterm Assessment: 15%  
- Practical Assessment: 12%  
- Final Assessment: 30%
The book used throughout this mod is an edited version of the book Structure and Interpretation of Computer programs. We use SICPJS, which is the JavaScript version of the book. I find the questions in the book to be quite helpful in understanding some tough concepts. 

![SICP](https://i.imgur.com/zNLuXuT.jpg)

**Fun Fact**: The module is heavily influenced by the course at MIT "6.001" titled "Structure and Interpretation". Although the original book is written in scheme, the book for this course has been adapted to JavaScript by Professor Martin himself. 

# Source academy 
Source academy is an online platform where you earn XP by participating in missions, quests, paths and contests. The platform has been made and is being maintained by Professor Martin Henz and his army of talented NUS Computer Since Students. This is my favourite part of the module because it was structured like an RPG game where we embark on a journey inside a spaceship. All the missions/quests and paths relate to a story about a journey across space and help expand it forwards as you solve the problems. 
I find this method of using an online platform to be highly effective and it also helped in increasing our problem solving skills. In some way, this was our first proper introduction to competitive programming. However, that is not all because CS1101S was our introduction to basically everything in the field of computer science and not just programming. 


# Workload
The module starts off very lightly, introducing concepts such as expressions and statements. 
Then we move on to more formal methods of decoding our programs, such as the substitution model. Initially, we are provided with a subset of JavaScript that is functional, called source 1. This allows us to get familiar with basic concepts used in functional paradigm and we start to appreciate the beauty of it. We often overlook this paradigm because of immutability and the absence of loops, but after solving some questions I found it to be pretty simple, intutive and useful. What I liked the most was the quest "Functional Expressionalism", it introduced us to the integral concept of lambda calculus and church numerals. Which is basically expressing positive integers using functions. Well, why do we need those? (I have a blog coming out for that soon) 
I spend a total of 16 hours on that specific quest before giving up on question 4 / 5.

# Key takeaways

For me, I believe that the difficulty of this module arrived more in the "Formal method of thinking part". I find it that when solving programming questions, if I think long and hard enough then the solution just comes to my mind almost like a light bulb turning on inside my head. The problem arises when we are made to formalize our procedure of thinking and to express our ideas in words. That is also one of my key lessons from this module, the skill of formalizing our ideas and building up a proper framework to come up with solutions. In my opinion, this skill is quite important for computer scientists as it helps in communication and also gives us an approach of how to attack difficult problems.  

# Topics
### Elements of programming
The semester begins with the very basics of programming like data types, and basic expressions like 2 + 2. 

### Recursion and orders of growth
We are introduced to measure of the performance of our algorithms, recursion and dynamic programming, specifically things like the coin-change problems and the factorial function.

### Further recursion, diving into functional programming
This is where everything starts picking up speed, we get introduced higher order functions, more harder recursion problems and also lambda calculus in disguise. 

### Data abstraction
We get introduced to several data structures like pairs, trees and structures.

![This is where the fun begins](https://i.imgur.com/4kdtXXP.jpg)


We are introduced to basic operations like filter, map and reduce (accumulate) and understand how we can chain these operations to achieve more complex results. I found tree processing to be quite fun to understand. It also helps us to understand that data can be represented in several different ways depending on the problem we are trying to solve.

### Searching and sorting
Now that we know how to create data structures and perform operations on them, we are thought how to manipulate the data to our own will and perform complex manipulations such as searching and sorting. 
[Put reality can be whatever I want]
We understand how popular sorting algorithms like Selection sort, insertion sort, merge sort, bubble sort and quicksort are implemented, what are the differences between them and how to analyse such algorithms to deduce their orders of growth. 

### Imperetive programming
Now, we are introduced to a subset of JavaScript that can handle mutable structures and supports loops. YES LOOPS, I was so happy when loops returned. But, we were made aware of the downfalls of imperetive programming as it made decoding our programs much more complex because we are now supposed to keep track of changing state and variables. Although both are quite useful paradigms, I enjoyed the simplicity of functional paradigm.   

### CSE machine and the environment model
CSE stands for control, stash and environment. This is a new model that helps us open the black box and analyse what happens to the variables and the operations that are executed when we run instructions on our machine. 
The environment model helps us combat some of the disadvantages of the imperetive paradigm by allowing to keep track of scope and internal state of our program. It is basically another way of thinking out our programs for enabling our minds to understand what is happening and allow us to understand programs that are not written by us. 


### Metalinguistic abstraction
By this point, we have all the tools we need to understand and come up with programs that achieve a certain task, the following topic teaches us how to understand the way different functions are linked together by making us study the implementation of source interpreter within source itself. 

## Even more fun stuff!
Besides the source academy, we are also given lego mindstorm robots for some duration of the course and are asked to build and program the robot so that it can follow a line. I find this part to be quite interesting as it gives us a nice little introduction to robotics. Moreover, teams that really enjoyed this part are encouraged to program their robots to fight other robots in a competition called Sumobot! 

![sumobot](/images/SumoBot.png)
**Here is my team's robot (The one that is smaller in breadth) competing in a fight**

# Conclusion
Overall, I found the module to have an exceptional amount of fun, workload and also challenge. Despite the times where this module was challenging and difficult, I found fun in pushing through those difficulties and trying to overcome the challenges of this module. I become addicted to the ecstatic feeling I experience when finally figuring out a problem after spending hours on it. 
For the incoming freshmen, I would like to say that consistency and practice is the key to the module. If you have had programming experience and are still finding yourself stuck in the problems in the mod, don't let that discourage you but instead push through the challenge. 


[^1]:Abelson, H., Sussman, G. J., Henz, M., Wrigstad, T., & Sussman, J. (2022). Structure and interpretation of computer programs.