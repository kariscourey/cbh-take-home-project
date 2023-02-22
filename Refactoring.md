# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Karis Courey's Explanation Here

I refactored based on modular portions of functionality performed on `event` and `candidate`. These modular portions of functionality are best defined as `setCandidate()`, in which `candidate` is declared based on `event` or `event.partitionKey`; `stringifyCandidate()`, in which `candidate` is stringified, as needed, or set to the trivial key,`TRIVIAL_PARTITION_KEY`; and `updateCandidate()`, in which `candidate.length` is compared to `MAX_PARTITION_KEY_LENGTH` to determine if updating `candidate` to its hash is required.
</br>

I further abstracted away the hashing mechanism to `shaHash()`, as its functionality was repeated within the provided code, to improve debugging in a production environment.
</br>

This version is more readable as it clearly defines each modular portion of code as it relates to `event` and `candidate` into smaller subsections of code with single purposes. This will permit more ease of debugging and maintenance as opposed to its non-refactored counterpart.
