+++
title = 'Checking if the nth bit is set'
date = 2024-08-16T00:00:00+05:30
description = 'Learn how to check if the nth bit of an integer is set using bitwise operations in Golang. This guide provides a clear explanation, examples, and a code walkthrough to help you master bit manipulation in Go.'
draft = false
keywords = 'Golang, bitwise operations, check nth bit, bit manipulation, Golang tutorial, programming, Go language, bitwise AND, left shift, isBitSet function, Go bitwise example'
[params]
	author = 'Naman Attri'
slug = 'check-nth-bit-set-golang'
+++
## Understanding Bitwise Operations in Golang: Checking if the nth Bit is Set

Bitwise operations are a fundamental tool in programming, allowing you to manipulate individual bits of data efficiently. In this blog post, we'll explore how to check if the nth bit of an integer is set (i.e., whether it is `1` or `0`) using a simple and effective bitwise operation in Golang. We'll break down the process step by step and provide examples to clarify the concept.

### The Concept of Bits

Before diving into the code, it's essential to understand the basics of bits:

- Computers store data in binary, using `0` and `1`.
- Each binary digit (bit) represents a power of 2, with the rightmost bit being the least significant \(2^0\) and the leftmost bit being the most significant.

For example, the binary representation of the number `5` is `101`, which is equivalent to:

\[5 = 1*2^2 + 0*2^1 + 1*2^0\]

### The Problem: Checking if the nth Bit is Set

Given a number, we might want to check whether a specific bit (the nth bit) is set. A bit is considered "set" if it is `1`. To achieve this, we can use a bitwise AND operation combined with a bitwise left shift.

### The Code

Here is a simple Go function to check if the nth bit of a given number is set:

```go
func isBitSet(num, n int) bool {
    return (num & (1 << n)) != 0
}
```

### How It Works

1. **Left Shift Operation (`1 << n`)**:
   - The left shift operation (`<<`) shifts the binary representation of `1` to the left by `n` positions.
   - For example, `1 << 2` results in `100` in binary, which is `4` in decimal.

2. **Bitwise AND Operation (`num & (1 << n)`)**:
   - The bitwise AND operation (`&`) compares each bit of the number `num` with the corresponding bit in the result of `1 << n`.
   - If both bits are `1`, the resulting bit is `1`; otherwise, it's `0`.
   - This operation isolates the nth bit of `num`.

3. **Comparison to `0`**:
   - Finally, we compare the result of the AND operation with `0`. If the result is not `0`, it means the nth bit in `num` is set (i.e., it's `1`); otherwise, it is not set (i.e., it's `0`).

### Examples and Walkthrough

Let's go through some examples to see how this function works in practice.

#### Example 1: Check if the 2nd Bit is Set in `5`

```go
num := 5      // Binary: 101
n := 2
result := isBitSet(num, n)
fmt.Println(result) // Output: true
```

- **Step 1**: `1 << 2` results in `100` (binary) or `4` (decimal).
- **Step 2**: `5 & 4` results in `100` (binary) or `4` (decimal).
- **Step 3**: Since the result is not `0`, the function returns `true`, indicating that the 2nd bit is set.

#### Example 2: Check if the 1st Bit is Set in `5`

```go
num := 5      // Binary: 101
n := 1
result := isBitSet(num, n)
fmt.Println(result) // Output: false
```

- **Step 1**: `1 << 1` results in `10` (binary) or `2` (decimal).
- **Step 2**: `5 & 2` results in `0` (binary), which means the 1st bit is not set.
- **Step 3**: The function returns `false`.

#### Example 3: Check if the 0th Bit is Set in `5`

```go
num := 5      // Binary: 101
n := 0
result := isBitSet(num, n)
fmt.Println(result) // Output: true
```

- **Step 1**: `1 << 0` results in `1` (binary).
- **Step 2**: `5 & 1` results in `1` (binary), which means the 0th bit is set.
- **Step 3**: The function returns `true`.

### Conclusion

The `isBitSet` function is a straightforward yet powerful way to check if a particular bit in a number is set. By understanding the mechanics of bitwise operations, you can unlock a wide range of possibilities in programming, especially in performance-critical applications where bit-level manipulations are essential.

Experiment with different numbers and bit positions to deepen your understanding of this concept. Bitwise operations may seem tricky at first, but with practice, they can become a valuable tool in your programming arsenal.