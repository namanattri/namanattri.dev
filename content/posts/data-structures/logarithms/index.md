---
title: "Crash Course on Logarithms 📘"
date: 2025-10-07T00:00:00+05:30
author: "Naman Attri"
tags: ["mathematics", "crash-course", "logarithm", "education"]
description: "A simple, intuitive, and practical crash course on logarithms with examples you can understand in 10 minutes."
draft: false
---

<!-- Inline CSS for tables -->
<style>
table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}
th {
  background-color: #f6f8fa;
  font-weight: bold;
}
</style>

# 🚀 Crash Course on Logarithms

Logarithms are one of the most useful mathematical tools — from calculating algorithmic complexity to dealing with exponential growth in real life.  
In this quick crash course, you’ll understand what logarithms are, how they work, and how to apply them.

---

## 🧩 What is a Logarithm?

A **logarithm** answers the question:  
> “To what power must I raise this base to get that number?”

Formally:

\[
\log_b(a) = c \iff b^c = a
\]

### Example

\[
\log_2(8) = 3 \text{ because } 2^3 = 8
\]

---

## 🔢 Common Logarithm Bases

| Base | Name | Example |
|------|------|----------|
| 10 | Common Logarithm | log₁₀(1000) = 3 |
| 2 | Binary Logarithm | log₂(32) = 5 |
| e (≈2.718) | Natural Logarithm (ln) | ln(e²) = 2 |

> 💡 Tip: In programming and algorithms, `log` often means `log₂`.

---

## 🧠 Why Do We Use Logarithms?

1. **Simplify exponential growth:** Convert multiplication into addition.  
   e.g., \(\log(ab) = \log(a) + \log(b)\)
2. **Measure complexity:** Big-O like `O(log n)` appears in binary search, tree height, etc.
3. **Handle large numbers:** Makes huge values manageable (e.g., sound intensity, earthquakes).
4. **Undo exponentials:** Solve for unknown exponents easily.

---

## ⚙️ Logarithm Properties (Must-Know)

| Property | Formula | Example |
|-----------|----------|----------|
| Product | logₐ(xy) = logₐ(x) + logₐ(y) | log₂(8×4) = log₂(8) + log₂(4) = 3 + 2 = 5 |
| Quotient | logₐ(x/y) = logₐ(x) − logₐ(y) | log₁₀(100/10) = 2 − 1 = 1 |
| Power | logₐ(xᵖ) = p × logₐ(x) | log₂(8²) = 2 × 3 = 6 |
| Change of Base | logₐ(b) = log_c(b) / log_c(a) | log₂(8) = log₁₀(8) / log₁₀(2) = 0.903 / 0.301 = 3 |

---

## ⚡ Quick Practice

Try these:

1. \(\log_3(81) = ?\)  
   → 81 = 3⁴ → Answer = 4

2. \(\log_5(1/25) = ?\)  
   → 1/25 = 5⁻² → Answer = -2

3. \(\log_{10}(0.01) = ?\)  
   → 0.01 = 10⁻² → Answer = -2

---

## 💻 Logarithms in Programming

| Language | Function | Example |
|-----------|-----------|----------|
| Python | `math.log(x, base)` | `math.log(8, 2)` → 3.0 |
| JavaScript | `Math.log(x)/Math.log(base)` | `Math.log(8)/Math.log(2)` → 3 |
| Go | `math.Log(x)/math.Log(base)` | `math.Log(8)/math.Log(2)` → 3 |
| C++ | `log(x)/log(base)` | `log(8)/log(2)` → 3 |

---

## 📈 Real-World Applications

- **Algorithms:** Binary search, tree depth, sorting complexities.  
- **Finance:** Compound interest & time to double money.  
- **Science:** pH scale (logarithmic measure of acidity).  
- **Technology:** Decibel scale for sound, Richter scale for earthquakes.  
- **AI & Data Science:** Cross-entropy, log-likelihood in model evaluation.

---

## 🔍 Intuitive Analogy

Think of logarithms like **counting how many times you multiply the base** to reach a number.

Example:

| Step | Power of 2 | Value |
|------|-------------|-------|
| 1 | 2¹ | 2 |
| 2 | 2² | 4 |
| 3 | 2³ | 8 |
| 4 | 2⁴ | 16 |

So, **log₂(16) = 4**, because you multiply 2 four times to reach 16.

---

## 🧮 Logarithmic Scales Simplify the Universe

| Phenomenon | Scale | Example |
|-------------|--------|----------|
| Sound | Decibel (dB) | Every +10 dB = 10× intensity |
| Earthquake | Richter | +1 magnitude = 10× stronger |
| Light | Luminosity scale | Logarithmic response of eyes |
| Information | Bits | log₂(n) represents choices among *n* outcomes |

---

## 🏁 Conclusion

Logarithms **turn multiplication into addition, division into subtraction, and powers into multipliers**.  
They are everywhere — from coding algorithms to understanding the world’s natural scales.

So next time you see `O(log n)`, just smile 😄 — you now know what that really means.

---

✅ **Takeaway**  
> A logarithm tells you *how many times you multiply the base to get a number.*

---

🧠 *Written by [Naman Attri](https://namanattri.dev)*  
Built with ❤️ and curiosity for lifelong learners.
