# COM519 Advanced Database Systems Assessment

# Lecturer: Joe Appleton

# Student: Jacob Dale

# Hand in Date: 15/Jan/2021



Hosted Web app can be found at: https://nameless-savannah-04348.herokuapp.com/

Git Hub repository:  https://github.com/JSDale/AdvancedDbAssessment

## Abstract

I was tasked to create a ***proof of concept*** web application that is attached to a database on the backend to solve a real world problem. The real world problem would have preferably been one experienced in work, unfortunately my work place currently has no need for a web application so I used a real world problem from my personal life. The application and server should be hosted on an external server, such as Heroku and Atlas MongoDB, it should show I have an understanding of current work place practices, it should also be saleable and maintainable.

## Mission Statement - Introduction

I am a leader of a small youth group (ages 10 - 16) belonging to the local Church of England church in my village and currently we must rely on our memories for the medical requirements of the children. We also only use a paper register for each of our meetings, this is problematic as that is our only copy and if we loose it we have no record of who attended when. This can also cause an issue in an event of a disaster, such as fire. If we can't get that to that register to ensure everyone is out and safe it might result in injury or death.

We have a duty of care to those children and their parents trust us with said care. Having an online resource to keep track of attendance and medical requirements would be a great help, as sometimes we get the kids to bring in food for end of year parties etc... so if they could see what the dietary requirements of other kids are there is less risk of allergic reactions. According to the NHS *https://digital.nhs.uk/data-and-information/find-data-and-publications/supplementary-information/2018-supplementary-information-files/hospital-admissions-for-allergies-and-anaphylactic-shock*, the number of Finished Admission Episode (FAEs) with primary diagnosis of allergies for the year **2013-14** for ages **10 and under** were **4,869** and ages 11 to 18 were **2,873**. For the year 2017-18 **10 and under** were **6,167** and 11 to 18 were **4,743**.

I would also like to implement a forum for the kids to use to talk to each other, as finding children who are open about their beliefs can be hard and can feel isolating. This may not be implemented in the proof of concept as the register and information on the children are the top priorities.

## System Overview

### Functionality

The system will be comprised of two main functions, a service that keeps track of attendance and a service that allows users to view all profiles, create and edit their own. I intend to implement other functionality, however I am aware of the time constraints so they might have to missed out of this version and looked at in a future sprint.

### Datastores

I will be using a single non-relational MongoDB database stored in a cloud service called MongoDB Atlas. I will use the model view controller (MVC) method to implement my application.

### Key Views and Interfaces

The key views are:

* The Home Page.
* The log in page.
* The create user page.
* The edit profile page.
* The view all profile page.
* The attendance tracker page.

The key interfaces are:

* user.js
* youth.js

The key views are the web pages that will be used the most and the interfaces are the JavaScript files that interface between the webpage, the data model and the collections.

## Key System Components

![](D:\jdale\Documents\Uni\AdvancedDB\AdvancedDataBaseAssessment\Documentation\Diagrams\Key_System_Components.png)

the above image depicts the key components within my application. The blue arrows represent a web page linking to another web page, the purple arrows show what calls on and gets information from the controllers, the red/brown arrows show what implements the data models and the green arrows show what interacts with the database. I didn't use a framework for the creation of my diagram and I added the color scheme for easier reading as I find it hard to understand all black diagrams with a lot of arrows leading to different places.