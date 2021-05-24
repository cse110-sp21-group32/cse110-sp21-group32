# Decision on due date priority of each entry

* Status: [accepted]
* Deciders: Design members
* Date: [2021-05-23]

## Context and Problem Statement

Our original design is that for each event, note, and task, there is a due date associate with it. There is a dedicated window to show the items that passed the due day. The key problem is that it is unnatural to assign a due date to event and note. These items should be associated to the date they get created.

## Decision Drivers 

* Wheher it is intuitive for the user to use

## Considered Options

* Preserve the due date feature for entries

## Decision Outcome

Our team decided that for all entries, including tasks, event, note, there will be not dedicated due date input for them. The due date side window is replaced by day selector. If the user want, it is still doable to add due date information in the detial of the entry.