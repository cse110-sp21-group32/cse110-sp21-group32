# Decision on Duo Selector 

* Status: [accepted]
* Deciders: Design members
* Date: [2021-05-23]

## Context and Problem Statement

Previously, we choose to put every entry in the focus window. One selector we have is catorgy. However, since the number of categories is limited, the numebr of entries in the focus is still likely to be a lot. 

## Decision Drivers 

* User should quickly locate the entry they want

## Considered Options

* Drop down electors to switch views in focus window
* Still only use single category filter

## Decision Outcome

We have decided to implement duo selector: day and cateogry. What ever category and days get selected, their intersect entries will show up in the focus window.