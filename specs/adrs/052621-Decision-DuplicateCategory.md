# Decision on Duplucate category

* Status: [accepted]
* Deciders: All team members
* Date: [2021-05-26]

## Context and Problem Statement

We have implemented the core functionality of category entries. However, we did not consider the edge cases of duplicate category entries with the same name and color.

## Decision Drivers 

* The logic should be intuitive and functional

## Considered Options

* No duplicate category with the same name
* Allow duplicate category with the same name but with different colors

## Decision Outcome

We have decided to allow the duplicate category with the same name but different colors. To the user, a category is only composed of two variables: the name and the color. It makes sense that the user attempting to create another category with the same name and color would be disallowed, because it carries no new information and contributes to unnecessary clutter.
