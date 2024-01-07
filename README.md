# Project 1: Soulithic Blog

## Table of Contents
* [About](#about-soulithic-blog)
* [Video](#soulithic-blog-walkthrough-video)
* [Technologies](#technologies)
* [Code Examples](#code-examples)
* [Features](#soulithic-blog-features)
* [Status](#status)
* [Why Mamba Game](#why-soulithic-blog)
* [Contact](#contact)

## About Soulithic Blog
Soulithic Blog represents an intricately developed web application utilizing JavaScript (JSX), Express, Node.js, and MySQL. Engineered with robust backend authentication and database management, it offers a secure environment for creating, organizing, and managing blog content. This platform prioritizes a seamless and secure blogging experience, leveraging modern web technologies for efficient content sharing and management.

## Soulithic blog Walkthrough Video
[Mamba Game Walkthrough Video](https://youtu.be/u3x1Lev1qz8)

## Technologies
JavaScript (JSX), Express, Node.js, MySQL

## Code Examples

```
def next_turn(snake, food):
    global score
    x, y = snake.coordinates[0]

    if direction == "up":
        y -= SPACE_SIZE
    elif direction == "down":
        y += SPACE_SIZE
    elif direction == "left":
        x -= SPACE_SIZE
    elif direction == "right":
        x += SPACE_SIZE

    snake.coordinates.insert(0, [x, y])
    snake.update_head(direction)

    square = snake.canvas.create_image(
        x, y, anchor=NW, image=snake_head, tags="snake")
    snake.squares.insert(0, square)

    if x == food.coordinates[0] and y == food.coordinates[1]:
        global score
        score += 1
        label.config(text="Score : {}".format(score))
        canvas.delete("food")
        food = Food(canvas, snake.coordinates)
    else:
        del snake.coordinates[-1]
        canvas.delete(snake.squares[-1])
        del snake.squares[-1]
        snake.update_tail()

    if check_collisions(snake):
        game_over()
        return

    window.after(SPEED, next_turn, snake, food)

```
```
def check_collisions(snake):
    x, y = snake.coordinates[0]
    if x < 0 or x >= GAME_WIDTH or y < 0 or y >= GAME_HEIGHT - (SPACE_SIZE*2):
        print("GAME OVER")
        return True

    for body_part in snake.coordinates[1:]:
        if x == body_part[0] and y == body_part[1]:
            return True
    return False
```
## Soulithic Blog Features
* Secure user authentication and encrypted passwords for login/logout functionality.
* Categorized posts with edit and delete options, ensuring an organized and customizable blogging experience.
* Interactive navbar displaying category links and user details.
* Edit Profile section enabling users to modify their usernames and profile images.
* Post creation functionality with image uploads, category selection, and publishing capabilities. 


To-Do List:
* Enhance user experience by incorporating post recommendations based on user preferences.
* Implement additional features for post interaction, such as comments and likes.

## Status
Ongoing development, actively adding new features and enhancements.


## Why Soulithic Blog?
I created Soulithic Blog to bring together tech and community. It's not just about code; it's about crafting a place where people feel heard and connected. I wanted to build a blogging hub that's both user-friendly and secure, using the latest tech to make sharing thoughts and stories a breeze. Soulithic Blog is my way of blending technology with a welcoming space for providing a wealth of information.

## Contact
Created by [Caila Bridges](https://www.linkedin.com/feed/)
