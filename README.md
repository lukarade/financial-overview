# Financial Overview
# Summary
This project is a financial overview application that allows users to track their income and expenses. The application consists of several components that display the financial data in different ways. The main components are the calendar component, the overview component, the list component, and the financial flow component. The calendar component displays the current month and year and allows users to add, edit, and delete events. The overview component displays the total income and expenses for the current year/month/week/day and a pie chart that shows the percentage of income and expenses for the current month. The list component displays all the income and expenses for the current year/month/week/day. The financial flow component displays the percentage of capital flow from all income to all expenses for the current year/month/week/day. Each category is represented by a different color, and the categories are sorted by the amount of money spent on them. The categories are clickable to display the events that belong to them and are highlighted when hovered over.

Below is a list of the features that need to be implemented for each component.

Start Date: 2024-30-11

## Calendar Component

- [x] Create a calendar component that displays the current month and year. (2024-30-11)
- [x] Display the number of the week in the year. (2024-01-12)
- [x] Display the transactions for each day in the calendar. (2024-09-12)
- [ ] Display the total income and expenses for the current month.
  
- [x] Add a button to navigate to the next month. (2024-05-12)
- [x] Add a button to navigate to the previous month. (2024-05-12)
- [x] Add a button to navigate to the month of the current day. (2024-05-12)
- [x] Add a button to navigate to the next year. (2024-05-12)
- [x] Add a button to navigate to the previous year. (2024-05-12)

- [ ] Double click on a day to add an expense / income.
- [ ] Open a modal when a day is double clicked.
- [ ] Add a button to close the modal.
- [x] Add a form to add a new event to the calendar. (2024-13-12)
- [ ] Add a button to delete an event from the calendar.

### Improvements
- [x] If the last displayed week row clomplety is of the next month, display the last week row of the previous month on top of the calendar instead (See September 2025 for an example). (2024-10-12)

## Transaction Component
- [x] Create a transaction component that displays the details of an event. (2024-09-12)
- [x] Display the date, amount, category, and type of the event. (2024-09-12)
- [ ] Add a button to edit the event.
- [ ] Add a button to delete the event.
- [ ] Add a button to close the transaction component. ??
- [ ] Add a button to navigate to the next/prev event (not the next day but the next transaction).


## Overview Component
- [ ] Create an overview component that displays the total income and expenses for the current year/month/week/day.

- [x] Create a bar chart that displays the total income and expenses for the current (2024-04-12)
  - [x] year: by month (2024-04-12)
  - [ ] month: by week
  - [ ] week: by day

- [ ] Empty months/weeks/days should be displayed as well.

- [ ] Create a pie chart that displays the percentage of income and expenses for the current month.
- [ ] Add a button to navigate to the next month.
- [ ] Add a button to navigate to the previous month.
- [ ] Add a button to navigate to the month of the current day.
- [ ] Add a button to navigate to the next year.
- [ ] Add a button to navigate to the previous year.

- [ ] Options menu to select the time frame (year/month/week/day).
- [ ] Options menu to select the type of event (income/expense).
- [ ] Options menu to select the category of the event (food/transportation/entertainment/etc).
- [ ] Options menu to select the type of chart (pie chart/bar chart/line chart).
  

## List Component
### Alternative view to the calendar component
- [x] Create a list component that displays all the income and expenses for the current year/month/week/day.
- [] Add filters to sort the events by:
  - [x] Date (2024-02-12)
  - [ ] Amount
  - [ ] Category
  - [ ] Type
- [x] Display the total income and expenses for the current year/month/week/day. (2024-03-12)
- [ ] Add a button to navigate to the next month.
- [ ] Add a button to navigate to the previous month.
### Bugs
- [x] Fix the bug that causes the list to generate month/ week/ day components for total income and expenses (which of course are not events). These are not displayed by a workaround with a guard clause in the coresponding component.


## Financial Flow Component
- [ ] Create a financial flow component that displays the peercentual capiital flow from all income to all expanses for the current year/month/week/day.
- [ ] Each category should be represented by a different color.
- [ ] The categories should be sorted by the amount of money spent on them.
- [ ] The categories should be clickable to display the events that belong to them.
- [ ] The categories should be highlighted when hovered over.
   

## General
- [x] Fetch the data from a backend server. (2024-10-12)
- [ ] Add option to change the currency.
- [ ] Add option to change the language.
- [ ] Add option to change the theme.

## Bugs 
- [ ] Fix the sorting of the events in the list component. The events are not sorted by date correctly. 



### Fancy Improvements
#### TransactionForm
-  [ ] The Add Transaction Form in the Transaction View should only be visible when the user is hovering over the Button. Otherwise, it should be hidden and olny a little + should be visible.
-  [ ] The Add Transaction Form should be animated when it appears.
-  [ ] The Add Transaction Form should be animated when it disappears.
-  [ ] The Add Transaction Form should be animated when it is submitted (swift up and append to the list).
-  [ ] If the user has startet putting text into the form it should not disappear when the mouse leaves the button. Instead, it should stay visible until the user clicks the submit button or the cancel button. Otherwise, it should disappear when the mouse leaves the button.