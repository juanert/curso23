# Print "Hello, World!" to the console
# print("Hello, World!")


# Variable declarations with different data types
# number = 42         # int (Integer number)
# pi = 3.14           # float (Floating-point number)
# name = "Alice"      # str (String)
# is_active = True    # bool (Boolean value)

# Some ways to print variables to the console
# print(number)
# print("Value of pi: ", pi)
# print(f"Name: {name}, Active: {is_active}")


# Read user inputs
# user_name = input("What is your name? ")
# print(f"Nice to meet you, {user_name}!")

# input() always return an str, and this data type won't work with calculations
# You can force the data type of an input() to change acordinly to the following
# funcitons:
# int()     Integers
# float()   Floating-points numbers
# str()     Strings (to convert numbers into strings)

# Operators

# Aritmetics
# >, <, >=, <= , % , == , !=

# Logic
# and, or, not


# Conditionals: The if statement
# if 43 >= 32:
#     print("Yay :D")

# if (True and False) or (True and not False):
#     print(":3")

# n = int(input("Please, type a number. Any number: "))
# if n % 2 == 0:
#     print(f"The number {n} is even!")
# elif n % 2 != 0:
#     print(f"The number {n} is odd!")
# else:
#     print(f"There was an error reading that number!")


# Loops: while and for

# count = 0
# while count < 5:
#     print(f"Count is: {count}")
    
#     if count == 3:
#         print("Count reached 3, breaking the loop.")
#         break
    
#     count += 1 # This is the same as count = count + 1

# for i in range(5):
#     print(f"i is: {i}")

#     if i == 2:
#         print("i is 2, breaking the loop.")
#         break


# Data Structures: Lists, Tuples and Dictionaries

# A list is a collection of items that can be changed (mutable)
# fruits = ["apple", "banana", "orange"]

# # A tuple is a collection of items that cannot be changed (immutable)
# coordinates = (10.0, 20.0)

# # A dictionary is a collection of key-value pairs
# person = {
#     "name": "Bob",
#     "age": 30,
#     "is_student": False
# }

# # Accessing and modifying data structures

# print(f"First fruit: {fruits[0]}")
# print(f"Coordinates: {coordinates[0]}, {coordinates[1]}")

# # Common list methods

# fruits.append("grape")
# print(f"Fruits after adding grape: {fruits}")

# fruits.insert(1, "kiwi")
# print(f"Fruits after inserting kiwi at index 1: {fruits}")

# fruits.remove("banana")
# print(f"Fruits after removing banana: {fruits}")

# fruits.pop()
# print(f"Fruits after popping the last item: {fruits}")

# fruits.sort()
# print(f"Fruits after sorting: {fruits}")

# fruits.reverse()
# print(f"Fruits after reversing: {fruits}")

# # Common dictionary operations

# print(f"Person's name: {person['name']}")

# person["age"] = 31
# print(f"Person after updating age: {person}")

# person["city"] = "New York"
# print(f"Person after adding city: {person}")


# students = [
#     {"name": "Alice", "age": 24},
#     {"name": "Bob", "age": 22},
#     {"name": "Charlie", "age": 23}
# ]

# for student in students:
#     print(f"Student Name: {student['name']}, Age: {student['age']}")