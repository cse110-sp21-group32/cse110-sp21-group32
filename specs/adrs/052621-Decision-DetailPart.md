# Decision on Duplucate category

* Status: [accepted]
* Deciders: All team members
* Date: [2021-05-26]

## Context and Problem Statement

We have implemented the core functionality of bullet and category filtering. However, we did not decide whether to hide the detail box after hiding a bullet entry, or if the detail should remember its state and show back up in the same state.

## Decision Drivers 

* The structure of the focus window should be clear

## Considered Options

* The detail box visibility remains the same after checking or unchecking the category
* The detail box visibility collapses after unchecking the category

## Decision Outcome

We have decided to collapse detail box visibility after unchecking the category to make the focus view cleaner. If the user deselects a bullet, then they have signalled disinterest in that bullet, so it should be acceptable to collapse the detail as well.