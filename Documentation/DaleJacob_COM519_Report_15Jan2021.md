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

### Key System Components

![Key_System_Components_Diagram](/Documentation/Diagrams/Key_System_Components.png)

the above image depicts the key components within my application. The blue arrows represent a web page linking to another web page, the purple arrows show what calls on and gets information from the controllers, the red/brown arrows show what implements the data models and the green arrows show what interacts with the database. I didn't use a framework for the creation of my diagram and I added the color scheme for easier reading as I, personally, find it hard to understand all black diagrams with a lot of arrows leading to different places.

## Key Design Decisions

### NoSQL

In the system overview I said I will be using a NoSQL approach in the implementation of the database, this is because the data I am using doesn't require high data security and the validation that a SQL approach grants can be done through the backend. I am developing this application in a agile manner, which allows me to not have all the documentation final before development can start, this means that any changes made to the database during development will need to be updated in the databases schema and entity relationship diagram (ERD). The database should also be scaled easier, although I don't expect a rush of new applicants for the youth group, some of the other leaders have ties to brownies and scouts and if they liked how the app worked they could suggest that the those groups look into using it. Those youth groups have a much wider turn around on children than we do so, the more scalable the application, the better. 

There are so few collections in the database using an SQL approach doesn't make sense. The only two collections that could benefit from a relationship would be users and youths, however a compare of email addresses in the collections using java script (JS) and mongoose would determine if the user existed.

### Full Stack Java Script

Another design decision was to use a full java script stack, this decision was straight forward. The two main driving forces were:

* It's the language I am most confident in using for this type of application.
* Setting up a development environment is easy.
* Java script can be run universally on most, if not all operating systems (OS).
* It is becoming more popular among the tech giants, such as google, amazon and Netflix.

### Model - View - Controller (MVC)

Using the MVC method to implement a web application is popular choice as it abstracts and loosely couples the code. This is great for reusability and reduces the amount of duplicated code, which allows for greater maintainability. This also results in the development time being reduced. It improves the code security because one modification shouldn't affect the entire model the views of web applications get changed regularly, from a font change to a complete overhaul of the UI, these changes won't affect the business logic of the application, which won't slow down the business logic either.

MVC also aids search engine optimization (SEO) as it provides ease to develop SEO friendly URLs. This is because MVC can take a URL like https://www.mywebapp/join and send the user to the creation page instead of the URL needing to be https://www.mywebapp/create-user.ejs?name=bob etc...

## Security and Scalability

### Scalability

Throughout this document scalability has been referenced and the decisions made to improve it. By choosing the MVC method this makes the application scalable in terms of development time as any additions to the application should be just that, an addition, the applications pre-existing business logic shouldn't need to be changed on mass unless the functionality changes drastically.

The NoSQL approach allows for quick scalability as there aren't as many dependencies to consider when modifying the database compared to the SQL approach.

### Security

The database itself is stored on MongoDB Atlas, so I will have to rely on their security measures as well as implementing some within the application.

The application requires users to log in to utilise its functionality therefore their passwords will need to be stored in the database which is a security risk. I have mitigated that risk by using bcrypt to hash the passwords before they are stored in the database. There is also data which some might consider personal being stored on the database in plain text, like their date of birth and medical requirements, so in order to store said data a user agreement would need to be written which every user would need to agree to on user creation. As this is a proof of concept only test data will be stored in the database. The test data will be created by myself or an application such as *Informatica Test Data Management* therefore a user agreement is not required, yet.

### Conclusion and Reflection
