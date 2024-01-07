# Project 1: Soulithic Blog

## Table of Contents
* [About](#about-soulithic-blog)
* [Video](#soulithic-blog-walkthrough-video)
* [Technologies](#technologies)
* [Code Examples](#code-examples)
* [Features](#soulithic-blog-features)
* [Status](#status)
* [Why Soulithic Blog](#why-soulithic-blog)
* [Contact](#contact)

## About Soulithic Blog
Soulithic Blog represents an intricately developed web application utilizing JavaScript (JSX), Express, Node.js, and MySQL. Engineered with robust backend authentication and database management, it offers a secure environment for creating, organizing, and managing blog content. This platform prioritizes a seamless and secure blogging experience, leveraging modern web technologies for efficient content sharing and management.

## Soulithic blog Walkthrough Video
[Soulithic Blog Walkthrough Video](https://youtu.be/OBc8XLjKY7c)

## Technologies
JavaScript (JSX), Express, Node.js, MySQL

## Code Examples

```
export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};
```
```
export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json("Not authenticated!");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts (title, `desc`, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.json("Post has been created.");
    });
  });
};

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
