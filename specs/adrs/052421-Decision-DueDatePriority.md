# Decision on due date priority of each entry

* Status: [accepted]
* Deciders: Design members
* Date: [2021-05-23]

## Context and Problem Statement

Our original design is that each event, note, and task has an associated due date. There is a dedicated window to show the items that passed the due date. The key problem is that it is unnatural to assign a due date to an event or note, neither of which is necessarily time-sensitive. These items should be associated to the date they get created.

## Decision Drivers 

* Wheher it is intuitive for the user to use

## Considered Options

* Preserve the due date feature for entries

## Decision Outcome

Our team decided that for all entries, including tasks, events, and notes, there will be no dedicated due date input. The due date side window is replaced by day selector. If the user wants, it is still possible to add due date information in the detail of the entry.