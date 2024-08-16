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
                           root
                            +                         
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
- Starting with 'b'. Since the trie is empty, the current node (root) has no children, hence we create a new node for 'b' and set it as one of the children of current node (root).
- Set the current node pointer to the child ('b') node.
- Moving on to 'a'. Since current node ('b') has no children, we create a new node for 'a' and set it as one of the children of current node ('b').
- Set the current node pointer to the child ('a') node.
- Moving on to 't'. Since current node ('a') has no children, we create a new node for 't' and set it as one of the children of current node ('a').
- Set the current node pointer to the child ('t') node.
- Since all characters of the word are finished, we set the current node's ('t') endOfWord flag to true as it's a complete path for the word "bat" in the trie.
- Now the trie is no longer empty for the next word to be inserted.
- Set the current node pointer to root node again.
- For each character in the given word "ball" check if it's one of the children.
- Starting with 'b'. The current node (root) already has 'b' node as one of it's children. We skip creating a new node.
- Set the current node pointer to the child ('b') node.
- Moving on to 'a'. The current node ('b') already has 'a' node as one of it's children. We skip creating a new node.
- Set the current node pointer to the child ('a') node.
- Moving on to 'l'. Since current node ('a') doesn't have 'l' node as a child, we create a new node for 'l' and set it as one of the children of current node ('a').
- Set the current node pointer to the child ('l') node.
- Moving on to 'l'. Since current node ('l') has no children, we create a new node for 2nd 'l' and set it as one of the children of current node (1st 'l').
- Set the current node pointer to the child (2nd 'l') node.
- Since all characters of the word are finished we set the current node's (2nd 'l') endOfWord flag to true as it's a complete path for the word "ball" in the trie.
- Same steps are repeated until all words are inserted.

The diagram below repsents the state of the trie after all words ("bat", "ball", "bark", "belt", "better", "bet", "betting", "car", "cart", "call", "called") are inserted. Here minus (-) sign next to some characters represent an end of word.

```goat
                     root
                      +                      
                     / \
                    /   \
                   /     \
                  /       \                         
                 /         \                         
                /           \                         
               /             \                         
              .               .
              b               c        
              +               +                                 
             / \              |     
            /   \             |     
           /     \            |     
          /       \           |                              
         .         .          .
         a         e          a
         +         +          +
        /|\       / \        / \
       / | \     /   \      /   \
      .  .  .   .     .    .     .
      t- l  r   l     t-   r-    l
         |  |   |     |    |     |
         .  .   .     .    .     .
         l- k-  t-    t    t-    l-
                      +          |
                     / \         |
                    .   .        .
                    e   i        e
                    |   |        |
                    .   .        .
                    r-  n        d-
                        |    
                        .    
                        g-    
```

#### Search
To search for a word, traverse the Trie following the sequence of characters in the word. If you reach the end and the endOfWord flag is present, the word exists in the Trie.
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
##### How the above code works:
- Let's assume we are searching for the word "bat".
- Set the current node pointer to the root node.
- Starting with 'b'. Since 'b' is one of the children of current node (root). We set current node as node 'b'.
- Moving on to 'a'. Since 'a' is one of the children of current node ('b'). We set the current node as node 'a'.
- Moving on to 't'. Since 't' is one of the children of current node ('a'). We set the current node as node 't'.
- We have compared all the characters.
- Since the the node 't' has endOfWord flag set to true, it means that the word path points to a complete word i.e. "bat". Hence the search result returns true.
- Now, let's assume we are searching for the word "best".
- Set the current node pointer to the root node.
- Starting with 'b'. Since 'b' is one of the children of current node (root). We set current node as node 'b'.
- Moving on to 'e'. Since 'e' is one of the children of current node ('b'). We set the current node as node 'a'.
- Moving on to 's'. Since 's' is not one of the children of current node ('e'). We return false as the word is not present in the Trie.
- Let's assume we inserted the word "better" but didn't insert "bet". Note that "better" has "bet" as prefix. However since the endOfWord flag for the node 't' is false so the word "bet" is not found.

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
##### How the above code works:
- Code follows the same strategy as the search however it doesn't check for the endOfWord flag since we are just checking for prefix.
- If all characters in the prefix are found in the successive children nodes, the for loop ends successfully and true is returned at the end.

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
	prefix = "ba"
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
Words with prefix 'ba':
bat
ball
bark

Words with prefix 'ca':
car
cart
call
called
```
##### How the above code works:
- Let's assume we are searching for prefix "ba".
- The GetWordsWithPrefix function will start at the root and traverse through nodes for ‘b’ and ‘a’.
- After this traversal, the node will be pointing to the node representing ‘a’ in the Trie.
```goat
                      root                            
                       +                      
                       |
                       .           
                       b           
                       +           
                       |
                       .     
                       a     
                       +     
                      /|\    
                     / | \   
                    .  .  .  
                    t- l  r  
                       |  |  
                       .  .  
                       l- k-           
```
- The collectWords function will be called starting from the node representing ‘a’ with the prefix “ba”.
- The function will recursively explore nodes for ‘t’, ‘l’, and ‘r’ (the children of ‘a’).
- Going down 't' the endOfWord flag is found to be true, the word "bat" is collected.
- Going down 'l' the endOfWord flag is found to be false, we iterate over children of 'l'
- Going down 2nd 'l' the endOfWord flag is found to be true, the word "ball" is collected.
- Coming one level back up and going down 'r' the endOfWord flag is found to be false, we iterate over children of 'r'
- Going down to 'k' the endOfWord flag is found to be true, the word "bark" is collected.
- Going back up to the root all the collections are merged to the final result: ["bat", "ball", "bark"].

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
##### How the above code works:

Deletion can be a bit hard to understand so we'll walkthrough each step for each word we are going to delete.

Here's the initial state of the trie.

```goat
                     root
                      +                      
                     / \
                    /   \
                   /     \
                  /       \                         
                 /         \                         
                /           \                         
               /             \                         
              .               .
              b               c        
              +               +                                 
             / \              |     
            /   \             |     
           /     \            |     
          /       \           |                              
         .         .          .
         a         e          a
         +         +          +
        /|\       / \        / \
       / | \     /   \      /   \
      .  .  .   .     .    .     .
      t- l  r   l     t-   r-    l
         |  |   |     |    |     |
         .  .   .     .    .     .
         l- k-  t-    t    t-    l-
                      +          |
                     / \         |
                    .   .        .
                    e   i        e
                    |   |        |
                    .   .        .
                    r-  n        d-
                        |    
                        .    
                        g-    
```
Deleting "bet"
- We start with the root node and depth 0 and recursively pass the word down the trie.
- Root node is not nil and the depth [0] != len('bet') [3]
- We extract the child node at depth = 0 i.e. 'b', increment the depth by 1 and call the deleteHelper function for node 'b'.
- Node 'b' is not nil and the depth [1] != len('bet') [3]
- We extract the child node at depth = 1 i.e. 'e', increment the depth by 1 and call the deleteHelper function for node 'e'.
- Node 'e' is not nil and the depth[2] != len('bet') [3]
- We extract the child node at depth = 2 i.e. 't', increment the depth by 1 and call the deleteHelper function for node 't'.
- Node 't' is not nil and the depth[3] == len('bet') [3] which means that we have found all the characters matching the word in the trie.
- Node 't' has endOfWord flag set to true which means the word "bet" exists in the trie.
- We set the endOfWord flag to false.
- Node 't' has children which means there are other words that start with prefix "bet". So we return false, so that the calling function doesn't delete node 't'.
- False is returned recursively so each calling chain doesn't delete the node.

State of Trie after "bet" has been deleted.
```goat
                     root
                      +                      
                     / \
                    /   \
                   /     \
                  /       \                         
                 /         \                         
                /           \                         
               /             \                         
              .               .
              b               c        
              +               +                                 
             / \              |     
            /   \             |     
           /     \            |     
          /       \           |                              
         .         .          .
         a         e          a
         +         +          +
        /|\       / \        / \
       / | \     /   \      /   \
      .  .  .   .     .    .     .
      t- l  r   l     t    r-    l
         |  |   |     |    |     |
         .  .   .     .    .     .
         l- k-  t-    t    t-    l-
                      +          |
                     / \         |
                    .   .        .
                    e   i        e
                    |   |        |
                    .   .        .
                    r-  n        d-
                        |    
                        .    
                        g-    
```

Deleting "belt"
- We start with the root node and depth 0 and recursively pass the word down the trie.
- Root node is not nil and the depth [0] != len('belt') [4]
- We extract the child node at depth = 0 i.e. 'b', increment the depth by 1 and call the deleteHelper function for node 'b'.
- Node 'b' is not nil and the depth [1] != len('belt') [4]
- We extract the child node at depth = 1 i.e. 'e', increment the depth by 1 and call the deleteHelper function for node 'e'.
- Node 'e' is not nil and the depth[2] != len('belt') [4]
- We extract the child node at depth = 2 i.e. 'l', increment the depth by 1 and call the deleteHelper function for node 'l'.
- Node 'l' is not nil and the depth[3] != len('belt') [4]
- We extract the child node at depth = 3 i.e. 't', increment the depth by 1 and call the deleteHelper function for node 't'.
- Node 't' is not nil and the depth[4] == len('belt') [4] which means that we have found all the characters matching the word in the trie.
- Node 't' has endOfWord flag set to true which means the word "belt" exists in the trie.
- We set the endOfWord flag to false.
```goat
                     root
                      +                      
                     / \
                    /   \
                   /     \
                  /       \                         
                 /         \                         
                /           \                         
               /             \                         
              .               .
              b               c        
              +               +                                 
             / \              |     
            /   \             |     
           /     \            |     
          /       \           |                              
         .         .          .
         a         e          a
         +         +          +
        /|\       / \        / \
       / | \     /   \      /   \
      .  .  .   .     .    .     .
      t- l  r   l     t    r-    l
         |  |   |     |    |     |
         .  .   .     .    .     .
         l- k-  t     t    t-    l-
                      +          |
                     / \         |
                    .   .        .
                    e   i        e
                    |   |        |
                    .   .        .
                    r-  n        d-
                        |    
                        .    
                        g-    
```

- Node 't' has no children which means there are no other words that start with prefix "belt". So we return true.
- The calling function then deletes node 't'
```goat
                     root
                      +                      
                     / \
                    /   \
                   /     \
                  /       \                         
                 /         \                         
                /           \                         
               /             \                         
              .               .
              b               c        
              +               +                                 
             / \              |     
            /   \             |     
           /     \            |     
          /       \           |                              
         .         .          .
         a         e          a
         +         +          +
        /|\       / \        / \
       / | \     /   \      /   \
      .  .  .   .     .    .     .
      t- l  r   l     t    r-    l
         |  |         |    |     |
         .  .         .    .     .
         l- k-        t    t-    l-
                      +          |
                     / \         |
                    .   .        .
                    e   i        e
                    |   |        |
                    .   .        .
                    r-  n        d-
                        |    
                        .    
                        g-    
```
- Current node 'l' doesn't have endOfWord flag set to true which means there is no word "bel" stored in the trie. Also it is a leaf node after deletion of it's only child 't'. True is returned to the calling function.
- The calling function then deletes node 'l'
```goat
                   root
                    +                      
                   / \
                  /   \
                 /     \
                /       \                         
               /         \                         
              /           \                         
             /             \                         
            .               .
            b               c        
            +               +                                 
           / \              |     
          /   \             |                
         .     .            .
         a     e            a
         +     +            +
        /|\    |           / \
       / | \   |          /   \
      .  .  .  .         .     .
      t- l  r  t         r-    l
         |  |  |         |     |
         .  .  .         .     .
         l- k- t         t-    l-
               +               |
              / \              |
             .   .             .
             e   i             e
             |   |             |
             .   .             .
             r-  n             d-
                 |       
                 .       
                 g-       
```
- Current node 'e' doesn't have endOfWord flag set to true which means there is no word "be" stored in the trie. Also it is not a leaf node since the words "better" and "betting" are still present in the trie. False is returned to the calling function.
- The calling function then doesn't delete 'e' node and also recursively return false to the calling function till root and no other node is delete on the path.

Deleting "call"
- Similar to deleting "bet". The endOfWord flag for the 2nd l is set to false and no nodes on the path deleted because the word "called" is still in the trie.

```goat
                   root
                    +                      
                   / \
                  /   \
                 /     \
                /       \                         
               /         \                         
              /           \                         
             /             \                         
            .               .
            b               c        
            +               +                                 
           / \              |     
          /   \             |                
         .     .            .
         a     e            a
         +     +            +
        /|\    |           / \
       / | \   |          /   \
      .  .  .  .         .     .
      t- l  r  t         r-    l
         |  |  |         |     |
         .  .  .         .     .
         l- k- t         t-    l
               +               |
              / \              |
             .   .             .
             e   i             e
             |   |             |
             .   .             .
             r-  n             d-
                 |       
                 .       
                 g-       
```

## Conclusion

In this post, we’ve explored the Trie data structure, a powerful tool for efficiently storing and searching words, especially when dealing with common prefixes. We walked through the basics of Tries and implemented essential operations in Golang, including insertion, search, prefix search, and deletion. By adding functionalities like returning words that match a given prefix, we showcased how Tries can be extended to support features like autocomplete.

Whether you’re building a search engine, implementing autocomplete, or just optimizing text storage, understanding and using Tries can significantly enhance the performance and capabilities of your applications.