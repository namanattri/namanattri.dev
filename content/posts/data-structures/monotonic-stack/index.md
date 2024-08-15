+++
title = 'Monotonic Stack'
date = 2024-08-15T13:52:09+05:30
description = 'Learn about monotonic functions and monotonic stacks, their importance in programming, and how to implement them with Go. Discover step-by-step explanations and code examples for constructing both increasing and decreasing monotonic stacks.'
draft = true
keywords = 'monotonic function, monotonic stack, data structures, algorithm optimization, increasing stack, decreasing stack, Go programming, coding tutorials, algorithm implementation, programming concepts, Go code examples, monotonic stack tutorial, software development, tech blog, stack data structure'
[params]
	author = 'Naman Attri'
slug = 'understanding-monotonic-functions-and-stacks-with-go'
+++
## What is a monotonic function?

A monotonic function is a function that is either entirely non-increasing or non-decreasing. In other words, the function preserves the given order of the input values.

### Monotonically Increasing (Non-decreasing)
A function \(f\) is called monotonically increasing if 
\[for\ all\ x \leq y ,  f(x) \leq f(y)\]
This means that as the input values increase, the output values either increase or stay the same. For example:

\[f(x) = 2x\]
\[f(x) = x^2 \ for \ x \geq 0\]

### Monotonically Decreasing (Non-increasing)
A function f is called monotonically decreasing if 
\[for\ all\ x \leq y\ ,\ f(x) \geq f(y)\]
This means that as the input values increase, the output values either decrease or stay the same. For example:

\[f(x)\ =\ -x\]
\[f(x) = \frac{1}{x}\ for\ x > 0\]

## What is a monotonic stack?

A monotonic stack is a data structure that maintains its elements in a specific order, typically either non-increasing or non-decreasing. It is useful for solving problems related to finding the next or previous greater or smaller elements in an array.

### Monotonic Increasing Stack 
The elements in the stack are arranged in non-decreasing order. This means each new element is pushed onto the stack only if it is greater than or equal to the element currently at the top of the stack. If a smaller element is encountered, elements are popped from the stack until the condition is satisfied.

```goat
                       .----.                             
                       | 12 |                             
                       +----+                             
                       |  7 |                             
                       +----+                             
                       |  2 |                             
                       +----+                             
                       |  1 |                             
                       '----'                             

```

### Monotonic Decreasing Stack
The elements in the stack are arranged in non-increasing order. This means each new element is pushed onto the stack only if it is less than or equal to the element currently at the top of the stack. If a larger element is encountered, elements are popped from the stack until the condition is satisfied.

```goat
                       .----.                             
                       |  1 |                             
                       +----+                             
                       |  3 |                             
                       +----+                             
                       | 14 |                             
                       +----+                             
                       | 37 |                             
                       '----'                             

```

## Code Example

The code below shows the implementation of monotonically both increasing & decreasing stack

```go
package main

import (
	"fmt"
)

// MonotonicStack struct
type MonotonicStack struct {
	stack      []int
	increasing bool
}

// NewMonotonicStack creates a new monotonic stack
func NewMonotonicStack(increasing bool) *MonotonicStack {
	return &MonotonicStack{
		stack:      []int{},
		increasing: increasing,
	}
}

// Push a value onto the stack
func (ms *MonotonicStack) Push(value int) {
	for len(ms.stack) > 0 &&
		((ms.increasing && ms.stack[len(ms.stack)-1] > value) ||
			(!ms.increasing && ms.stack[len(ms.stack)-1] < value)) {
		ms.Pop()
	}
	ms.stack = append(ms.stack, value)
}

// Pop a value from the stack
func (ms *MonotonicStack) Pop() int {
	if len(ms.stack) == 0 {
		return -1
	}
	top := ms.stack[len(ms.stack)-1]
	ms.stack = ms.stack[:len(ms.stack)-1]
	return top
}

// Top returns the top value of the stack
func (ms *MonotonicStack) Top() int {
	if len(ms.stack) == 0 {
		return -1
	}
	return ms.stack[len(ms.stack)-1]
}

// Monotonic stack processing function
func processMonotonicStack(nums []int, increasing bool) []int {
	ms := NewMonotonicStack(increasing)

	for _, num := range nums {
		ms.Push(num)
	}

	return ms.stack
}

func main() {
	nums := []int{2, 1, 5, 6, 2, 3}
	fmt.Println("Original array:", nums)

	// Increasing monotonic stack
	increasingResult := processMonotonicStack(nums, true)
	fmt.Println("Increasing Monotonic Stack:", increasingResult)

	// Decreasing monotonic stack
	decreasingResult := processMonotonicStack(nums, false)
	fmt.Println("Decreasing Monotonic Stack:", decreasingResult)
}
```

### Output

```shell
Original array: [2 1 5 6 2 3]
Increasing Monotonic Stack: [1 2 3]
Decreasing Monotonic Stack: [6 3]
```

## Step-by-Step Explanation On How Increasing Monotonic Stack is Built

Let’s walk through how the input array `[2, 1, 5, 6, 2, 3]` is processed by an increasing monotonic stack.

We begin with an empty stack.
```goat
                             .-----.
                             |     |
                             '-----'                                              
```
**Push 2** onto the Stack. Since the stack is empty, 2 is added directly.
```goat
                             .-----.
                             |     |
                             '-----'                                              

                             .-----.
                             |  2  |
                             '-----'                                              
```
**Push 1** onto the Stack. Compare 1 with the top of the stack (2). Since 1 < 2, and we want to maintain an increasing order, 2 is popped from the stack and 1 is pushed onto the stack
```goat
														 
                             .-----.
                             |  2  |
                             '-----'                                              

                             .-----.
                             |     |
                             '-----'                                              
														 
                             .-----.
                             |  1  |
                             '-----'                                              
```
**Push 5** onto the Stack. Compare 5 with the top of the stack (1). Since 5 > 1, no popping is required, and 5 is pushed onto the stack.
```goat
                             .-----.
                             |  1  |
                             '-----'                                              

                             .-----+-----.
                             |  1  |  5  |
                             '-----+-----'                                        
```
**Push 6** onto the Stack. Compare 6 with the top of the stack (5). Since 6 > 5, no popping is required, and 6 is pushed onto the stack.
```goat
                             .-----+-----.
                             |  1  |  5  |
                             '-----+-----'                                        

                             .-----+-----+-----.
                             |  1  |  5  |  6  |
                             '-----+-----+-----'                                  
```
**Push 2** onto the Stack. Compare 2 with the top of the stack (6). Since 2 < 6, 6 is popped from the stack. Next, compare 2 with the new top of the stack (5). Since 2 < 5, 5 is also popped. Next, compare 2 with the new top of the stack (1). Since 2 > 1, no poppoing is required, and 2 is pushed onto the stack.
```goat
                             .-----+-----+-----.
                             |  1  |  5  |  6  |
                             '-----+-----+-----'                                  

                             .-----+-----.
                             |  1  |  5  |
                             '-----+-----'                                        

                             .-----.
                             |  1  |
                             '-----'                                              

                             .-----+-----.
                             |  1  |  2  |
                             '-----+-----'                                        
```
**Push 3** onto the Stack. Compare 3 with the top of the stack (2). Since 3 > 2, no popping is required, and 3 is pushed onto the stack.
```goat
                             .-----+-----.
                             |  1  |  2  |
                             '-----+-----'                                        

                             .-----+-----+-----.
                             |  1  |  2  |  3  |
                             '-----+-----+-----'                                  
```
The increasing monotonic stack processes the input array in such a way that only the smallest elements, preserving the required order, remain. The final stack is `[1, 2, 3]`, which is the correct increasing sequence that could be formed from the input array.

## Step-by-Step Explanation On How Decreasing Monotonic Stack is Built

Let’s walk through how the input array `[2, 1, 5, 6, 2, 3]` is processed by a decreasing monotonic stack.

We begin with an empty stack.
```goat
                             .-----.
                             |     |
                             '-----'                                              
```
**Push 2** onto the Stack. Since the stack is empty, 2 is added directly.
```goat
                             .-----.
                             |     |
                             '-----'                                              

                             .-----.
                             |  2  |
                             '-----'                                              
```

**Push 1** onto the Stack. Compare 1 with the top of the stack (2). Since 1 < 2, no popping is needed and 1 is pushed onto the stack
```goat
														 
                             .-----.
                             |  2  |
                             '-----'                                              

                             .-----+-----.
                             |  2  |  1  |
                             '-----+-----'                                        
```
**Push 5** onto the Stack. Compare 5 with the top of the stack (1). Since 5 > 1, 1 is popped from the stack to maintain the decreasing order. Next, compare 5 with the new top of the stack (2). Since 5 > 2, 2 is also popped. Now, 5 is pushed onto the stack.
```goat

                             .-----+-----.
                             |  2  |  1  |
                             '-----+-----'                                        

                             .-----.
                             |  2  |
                             '-----'                                              

                             .-----.
                             |     |
                             '-----'                                              

                             .-----.
                             |  5  |
                             '-----'                                              
```
**Push 6** onto the Stack. Compare 6 with the top of the stack (5). Since 6 > 5, 5 is popped from the stack to maintain the decreasing order. Now 6, is pushed onto the stack.
```goat
                             .-----.
                             |  5  |
                             '-----'                                              

                             .-----.
                             |     |
                             '-----'                                              

                             .-----.
                             |  6  |
                             '-----'                                              
```
**Push 2** onto the Stack. Compare 2 with the top of the stack (6). Since 2 < 6, no popping is needed and 2 is pushed onto the stack.
```goat
                             .-----.
                             |  6  |
                             '-----'                                              

                             .-----+-----.
                             |  6  |  2  |
                             '-----+-----'                                        
```
**Push 3** onto the Stack. Compare 3 with the top of the stack (2). Since 3 > 2, 2 is popped from the stack. Now, 3 is pushed onto the stack.
```goat
                             .-----+-----.
                             |  6  |  2  |
                             '-----+-----'                                        

                             .-----.
                             |  6  |
                             '-----'                                              

                             .-----+-----.
                             |  6  |  3  |
                             '-----+-----'                                        
```
The decreasing monotonic stack processes the input array in such a way that only the largest elements, preserving the required order, remain. The final stack is `[6, 3]`, which is the correct decreasing sequence that could be formed from the input array.

## Conclusion

In this post, we’ve explored the concept of monotonic functions and how they are applied in the context of monotonic stacks, a powerful data structure that helps solve a variety of problems related to finding the next or previous greater or smaller elements in an array. By understanding the construction and behavior of both monotonically increasing and decreasing stacks, you can approach problems with a clearer strategy and more efficient solutions.

Monotonic stacks ensure that you maintain a specific order while processing elements, which is essential for many algorithmic challenges. The provided code examples and step-by-step explanations demonstrate how these stacks work in practice, helping you to grasp the underlying principles and apply them to your coding tasks.

Whether you’re dealing with complex data manipulation or optimizing algorithms, monotonic stacks are a valuable tool in your programming toolkit. With this understanding, you’re well-equipped to implement and leverage monotonic stacks in your future projects.