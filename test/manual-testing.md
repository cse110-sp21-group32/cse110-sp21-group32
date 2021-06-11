# Manual Testing Guide
[Return to testing](testing.md)

Automated test cases will only take us so far. In the interest of staying agile,
here are the steps you can take to ensure that what you have will guarantee that our MVP still works.

In order to understand what's happening here, please refer to our 

## Test Suite 1 - Testing bullets
We will rely on using the default category and default date
1. Create new bullet with default category and default date
2. Toggle default date and default category to on
3. Check that new bullet is in focus

Really long title
1. create new bullet with title, "So there was this one time when I was pretty sure I was going to die. So basically I was driving along, you know, like normal, just doing normal person things like breath and consume nourishment, when this giant stork crosses the windshield. Well, being a human being of acceptable moral standing, I didn't want to kill the bird, so I tried to swerve out of the way. Unfortunately, this was on a mountain path and there wasn't exactly much room for swerving. The car went careening off the cliff, and we tumbled several hundred feet. It was then that we were rescued, while flying through the air, by none other than Spiderman, famous for being snapped out of existence by a big purple man with a fancy glove and even bigger, even fancier Napoelon Complex. 'BuT HoW!?!?!' I hear you screaming in inquisitive agony? Well, that actually ties back to this other event when I thought I was going to die a few years previous, so I'll talk about that first. So there was this one time when I was pretty sure I was going to die. So basically I was driving along, you know..." and default category
2. Check that bullet editor shows an error for the title being too long
3. Complain to the devs that a title of more than 1000 characters is totally expected user behavior and this should definitely be supported in the next patch

Deleting bullets
1. Create a bullet with care and attention, giving it a unique title and category which fully express all of its boundless personality and potential for improvement that you might ascribe to your own flesh and blood child
2. Examine this bullet point's existence carefully within local storage, making certain that it is safe and well loved within the storage block
3. Delete the bullet with ruthless prejudice
4. Make certain that all traces of the bullet have been purged from local storage completely and permanently
5. Claim the soul stone

## Test Suite 2 - Testing date
Depends on [Test Suite 1]() passing all tests.

Deselect all dates
1. Deselect all dates on the left panel
2. Verify that all bullets now show in the Focus

Select one date
1. Create two bullet points with arbitrary detail on two separate days
2. Deselect one of the two dates in the date selector
3. Verify that only one bullet shows up in the Focus

Edit existing bullet to different date (functionality may be deprecated/subject to change)
1. Create a bullet with some date
2. Change the date of the bullet
3. Verify that the date selector has deleted the old date and added the new date

## Test Suite 3 - Testing category
Depends on [Test Suite 1]() passing all tests.

Different categories show properly
1. Make one category with title "category1" and color red
2. Make one category with title "HIGHLY CLASSIFIED MILITARY SECRETS DO NOT OPEN UNLESS YOU ARE ME" and color green
3. Verify that both categories show up in the category manager as separate entries

Select and Deselect All
1. Make sure all categories are deselected
2. Click the 'Select All' button and verify that all categories are now selected
3. Click the 'Deselect All' button and verify that all categories are now deselected

Duplicate categories
1. Create a category with title "No I'm mom's favorite category" of red color
2. Create another category with title "No I'm mom's favorite category" of red color, but don't click submit
3. Click submit and weep as the second category is denied its existence, the error message against the creation of categories with the same title and color as ruthless an exterminator as a programmer with too much caffeine hunting for bugs in his pet project that's TOTALLY GONNA BE BIG SOMEDAY MOM, YOU JUST DON'T WANT ME TO SUCCEED

