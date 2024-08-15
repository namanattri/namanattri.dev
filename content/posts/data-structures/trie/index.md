+++
title = 'Trie'
date = 2024-08-15T13:53:09+05:30
description = 'Learn all about Trie, a powerful data structure for efficient string handling. Understand its structure, operations like insertion, search, and deletion, and explore practical use cases in autocomplete systems, spell checkers, and more.'
draft = false
keywords = 'Trie data structure, prefix tree, digital tree, string handling, autocomplete, search engine optimization, spell checker, Golang Trie implementation, data structures tutorial'
[params]
	author = 'Naman Attri'
slug = 'trie-data-structure-guide'
+++

## What is a Trie?

A Trie, also known as a prefix tree or digital tree, is a tree-like data structure that is used to efficiently store and retrieve keys in a dataset of strings. The Trie is especially useful when dealing with dynamic sets of strings and allows for fast searching, insertion, and deletion of keys.

### Components of a Trie
- **Nodes**: Each node represents a single character of a string or a key. Each node has a set of children, which correspond to the next characters in the keys.
- **Root**: The root node represents the start of the Trie and usually doesn’t hold any character value. It's associated with an empty string. Each path from the root to a leaf represents a key in the Trie.
- **Edges**: Edges connect nodes and represent the next character in the sequence.
- **End of Word Marker**: A special marker or flag that indicates the end of a valid word. Each node has the end of word marker as a boolean flag.

### Examples
The following Trie stores words: bag, ball, bar, bark & bat

```goat
                          (nil)                         
                            |                         
                            .                         
                            b                         
                            |                         
                            .                         
                            a
                            +
                           / \
                          /   \                          
                         +     +                         
                        / \   / \                         
                       .   . .   .                         
                       g   l r   t                            
                           | |                                
                           . .                                
                           l k                                
```

### Operations on a Trie (with code examples)
#### Creation
Creation of an empty Trie with root node representing empty string.
```go
package main

import "fmt"

type TrieNode struct {
	children  map[rune]*TrieNode
	endOfWord bool
}

type Trie struct {
	root *TrieNode
}

func NewTrie() *Trie {
	return &Trie{root: &TrieNode{children: make(map[rune]*TrieNode)}}
}

func main() {
  trie := NewTrie()
}
```

#### Insertion
Adding a word involves creating new nodes for each character if they don’t already exist and marking the last character node as the end of the word.
```go
func (t *Trie) Insert(word string) {
	node := t.root
	for _, char := range word {
		if _, exists := node.children[char]; !exists {
			node.children[char] = &TrieNode{children: make(map[rune]*TrieNode)}
		}
		node = node.children[char]
	}
	node.endOfWord = true
}

func main() {
  ...
  wordsToInsert := []string{"bat", "ball", "bark", "belt", "better", "bet", "betting", "car", "cart", "call", "called"}

  // Inserting words into the Trie
  for _, word := range wordsToInsert {
    trie.Insert(word)
  }
}
```
##### How the above code works:
- Set the current node pointer to root node (empty string).
- For each character in the given word "bat" check if it's one of the children.
- Starting with 'b'. Since the trie is empty current node (root) as no children, we create a new node for 'b' and set it as one of the children of current node (root).
- Set the current node pointer to the child ('b') node.
- Moving on to 'a'. Since current node ('b') has no children, we create a new node for 'a' and set it as one of the children of current node ('b').
- Set the current node pointer to the child ('a') node.
- Moving on to 't'. Since current node ('a') has no children, we create a new node for 't' and set it as one of the children of current node ('a').
- Set the current node pointer to the child ('t') node.
- Since all characters of the word are finished we set the current node ('t') end flag to true as it's a complete word "bat" path in the trie.
- Now the trie is non empty for the next word we want to insert.
- Set the current node pointer to root node (empty string) again.
- For each character in the given word "ball" check if it's one of the children.
- Starting with 'b'. The current node (root) already has 'b' node as one of it's children. We skip creating a new node.
- Set the current node pointer to the child ('b') node.
- Moving on to 'a'. The current node ('b') already has 'a' node as one of it's children. We skip creating a new node.
- Set the current node pointer to the child ('a') node.
- Moving on to 'l'. Since current node ('a') doesn't have 't' node as a child, we create a new node for 't' and set it as one of the children of current node ('a').
- Set the current node pointer to the child ('l') node.
- Moving on to 'l'. Since current node ('l') has no children, we create a new node for 'l' and set it as one of the children of current node ('l'). Note that 'l' is recreated even though we already have an 'l' node in the trie because we have two 'l' in the work 'ball'.
- Set the current node pointer to the child ('l') node.
- Since all characters of the word are finished we set the current node ('l') end flag to true as it's a complete word "ball" path in the trie.
- Repeated until all words are inserted.


#### Search
To search for a word, traverse the Trie following the sequence of characters in the word. If you reach the end and the end of word marker is present, the word exists in the Trie.
```go
func (t *Trie) Search(word string) bool {
	node := t.root
	for _, char := range word {
		if _, exists := node.children[char]; !exists {
			return false
		}
		node = node.children[char]
	}
	return node.endOfWord
}

func main() {
  ...
  fmt.Println("Search Results:")
  for _, word := range wordsToInsert {
		fmt.Printf("Word '%s' found?: %v\n", word, trie.Search(word))
	}
}
```
Output:
```shell
Search Results Before Deletion:
Word 'bat' found?: true
Word 'ball' found?: true
Word 'bark' found?: true
Word 'belt' found?: true
Word 'better' found?: true
Word 'bet' found?: true
Word 'betting' found?: true
Word 'car' found?: true
Word 'cart' found?: true
Word 'call' found?: true
Word 'called' found?: true
```

#### Prefix Search
Useful for auto-complete systems. The code below checks if the words matching the given prefix exist in a Trie.
```go
func (t *Trie) StartsWith(prefix string) bool {
	node := t.root
	for _, char := range prefix {
		if _, exists := node.children[char]; !exists {
			return false
		}
		node = node.children[char]
	}
	return true
}

func main() {
  ...
  prefix := "ba"
  fmt.Printf("Words starting with '%s' found?: %v\n", prefix, trie.StartsWith(prefix))
}
```
Output:
```shell
Words starting with 'ba' found?: true
```

#### Autocomplete
Find all words with a given prefix by traversing the Trie to the end of the prefix and then listing all descendants.
```go
func (t *Trie) GetWordsWithPrefix(prefix string) []string {
	node := t.root
	for _, char := range prefix {
		if _, exists := node.children[char]; !exists {
			return nil // No words with the given prefix
		}
		node = node.children[char]
	}
	return t.collectWords(node, prefix)
}

func (t *Trie) collectWords(node *TrieNode, prefix string) []string {
	var words []string

	if node.endOfWord {
		words = append(words, prefix)
	}

	for char, childNode := range node.children {
		words = append(words, t.collectWords(childNode, prefix+string(char))...)
	}

	return words
}

func main() {
  ...
	prefix = "be"
	fmt.Printf("Words with prefix '%s':\n", prefix)
	matchingWords := trie.GetWordsWithPrefix(prefix)
	for _, word := range matchingWords {
		fmt.Println(word)
	}

	prefix = "ca"
	fmt.Printf("\nWords with prefix '%s':\n", prefix)
	matchingWords = trie.GetWordsWithPrefix(prefix)
	for _, word := range matchingWords {
		fmt.Println(word)
	}
}
```
Output:
```shell
Words with prefix 'be':
belt
bet
better
betting

Words with prefix 'ca':
car
cart
call
called
```

#### Deletion
Deleting a word involves removing the end of word marker and pruning the Trie if the nodes are not part of another word.
```go
func (t *Trie) Delete(word string) bool {
	return t.deleteHelper(t.root, word, 0)
}

func (t *Trie) deleteHelper(node *TrieNode, word string, depth int) bool {
	if node == nil {
		return false
	}

	// If we've reached the end of the word
	if depth == len(word) {
		// This word doesn't exist
		if !node.endOfWord {
			return false
		}

		// Unmark the end of word node
		node.endOfWord = false

		// If this node has no children, it can be deleted
		return len(node.children) == 0
	}

	char := rune(word[depth])
	if t.deleteHelper(node.children[char], word, depth+1) {
		// Remove the child node reference if it's no longer needed
		delete(node.children, char)

		// Return true if the current node is no longer a part of another word
		return !node.endOfWord && len(node.children) == 0
	}

	return false
}

func main() {
  ...
  wordsToDelete := []string{"bet", "belt", "call"}

	// Deleting words from the Trie
	fmt.Println("\nDeleting words:", wordsToDelete)
	for _, word := range wordsToDelete {
		trie.Delete(word)
	}

	fmt.Println("\nSearch Results After Deletion:")
	for _, word := range wordsToInsert {
		fmt.Printf("Word '%s' found?: %v\n", word, trie.Search(word))
	}
}
```
Output:
```shell
Deleting words: [bet belt call]

Search Results After Deletion:
Word 'bat' found?: true
Word 'ball' found?: true
Word 'bark' found?: true
Word 'belt' found?: false
Word 'better' found?: true
Word 'bet' found?: false
Word 'betting' found?: true
Word 'car' found?: true
Word 'cart' found?: true
Word 'call' found?: false
Word 'called' found?: true
```

## Conclusion

In this post, we’ve explored the Trie data structure, a powerful tool for efficiently storing and searching words, especially when dealing with common prefixes. We walked through the basics of Tries and implemented essential operations in Golang, including insertion, search, prefix search, and deletion. By adding functionalities like returning words that match a given prefix, we showcased how Tries can be extended to support features like autocomplete.

Whether you’re building a search engine, implementing autocomplete, or just optimizing text storage, understanding and using Tries can significantly enhance the performance and capabilities of your applications.