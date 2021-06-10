# Decision on Duo Selector 

* Status: [accepted]
* Deciders: Design members
* Date: [2021-05-23]

## Context and Problem Statement

Previously, we chose to put every entry in the Focus window. One selector we have is the category selector. However, since the number of categories is limited, the number of entries in the focus is still likely to be a lot, which is overwhelming to the user. 

## Decision Drivers 

* User should be able to quickly locate the entry they want

## Considered Options

* Drop down selectors to switch views in Focus window
* Still only use single category filter

## Decision Outcome

We have decided to implement two selectors: day and category. Essentially, the day and category function as two different sets, and the Focus will show the intersection of the two.