# React-Coding-Challenge
Clear Solutions has created this challenge to assess the developer skills of candidates.

### Code Task: Maks' Todo Manager

## Instructions
#### 1. Build your app
You have 1 week to complete the challenge.

*Implementation and tests will be evaluated.*
#### 2. Submit your challenge
Follow these instructions to submit your challenge.
* Fork the Challenge Repository
* Write your Code
* Commit your Changes
* Issue a Pull Request

#### 3. Impress us with your skills

## Challenge
Develop a tool to help Maks, our busy manager, manage his daily tasks (Todos).

## Requirements

Please leek at the example of user interface:

![design](2023-10-17%2014.43.50.jpg)

1. **Loading Todos:**
    - Fetch the list of all Maks's Todos from the provided API: [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos)
    - Display the fetched Todos in the left column/square of the interface.

2. **Adding New Todos:**
    - Provide an input field on the left side of the interface.
    - Maks should be able to type in his new Todo in this input field.
    - Include an "Add" button next to the input field.
    - On clicking the "Add" button, the new Todo should be added to the list in the left column.

3. **Completing Todos:**
    - Each Todo item in the left column should have an associated checkbox.
    - On selecting one or multiple Todo items using the checkboxes and clicking a "COMPLETE" button, the selected items should:
        - Move to the right column.
        - Be marked as ‘completed: true’.

4. **Undoing Completed Todos:**
    - Each Todo item in the right column (completed tasks) should also have an associated checkbox.
    - On selecting one or multiple completed Todo items and clicking an "UNDO" button, the selected items should:
        - Move back to the left column.
        - Be marked as ‘completed: false’.

5. **Searching Todos:**
    - Provide a search input field on the right side of the interface.
    - Maks should be able to search for specific Todos by typing in this input.
    - The search functionality should activate after Maks has typed in at least 3 characters.
    - Based on the search query, filter and display only the relevant Todos in both the left and right columns, hiding the non-matching items.



## Grading
The grading of the app  will be based off of three criteria:
* **40%** - Overall Design and Structure
* **30%** - Data Management and Store
* **30%** - Testing 