# UWB-Hacks-the-cloud

https://essentialservices20200419011605.azurewebsites.net/

Khaoula Bahloul

UWB-Hacks the cloud

# README

# Motivation of the project

The main motivation for me was to help people in my home country, Algeria and countries (especially third world countries) around the world. This pandemic is affecting all people around the world and I wanted to contribute by doing anything that can help. This hackathon game me a boost to start and I want to continue afterward.

I was inspired by a group of Algerian volunteers around the world that created a group called We Algerian (you can find it in Facebook). They are welcoming anyone who can help with any essentials to fight this virus, so I wanted to help with this application.

Seeing people from different group ages, especially old ones, risking their lives going out to get groceries, medications, etc. to their families in this difficult time broke my heart because there are no websites or other application to check if stores are open or if there is deliveries. This application will help millions of people and small businesses so they can make deliveries or even let customers knows that they are open/close and how they can work together.

# Goals of the project

During this difficult time, people are asked to stay home in order to protect themselves, their loved ones and the most vulnerable in their communities. We live in big metropolitan area in the United States, with supermarkets and restaurant chains and medical facilities that provide up-to-date information about their locations, hours, operating status and so on. However, in many places around the world, including some places here in the US, this information is not readily available. Corner stores, independent doctors and neighborhood restaurants don&#39;t have the resources and know-how to provide even basic information like their location and hours through search engines or by having their own websites. This leads to more confusion and uncertainty as people struggle to get the essential services they need and may even put them in danger as they would have to roam around in search of a place that is open.

The goal of this project is to provide an easy way for store owners, restaurants, doctors, etc. to share crucial information about their businesses/services in a timely manner and allow customers to easily find essential services nearby. The nice thing about this application is that it will keep serving users even after the pandemic is over.

For the remainder of this document, essential services will be referred to as &quot;places&quot;, people who operate them as &quot;owners&quot; and the consumers as &quot;users&quot;.

# Desired user experience:

The app has two main views. An admin-like view for Owners, allowing them to manage their Places, and a map/search view for Users to find and view Places.

# Implementation details and how cloud computing technologies were used to implement the project:

The project uses several cloud services, with more planned based on the upcoming features. First of all, the app will be deployed to an AppService instance on Azure, and use MongoDb database on Azure Cosmos DB. In the future, the project will also use other AppService features like PushNotifications and AppInsights.

# Issues encountered, bugs fixed or still present, and future work to be done (every project has them!)

**Issues** : the application is not finished yet. And as I said, this hackathon gave me the boost to start and I will finish it afterward.

**Bugs** : no bugs till now. All bugs are fixed. Hopefully no more bugs.

**Future work** : The main features for the MVP are working. However, I have big ambitions for this project. Here are some of the features I think of adding:

- Set location: this is a button at the top header in the main page. This button will detect the user&#39;s location and use it to update the area shown in the map.
- Favorites: allow the user to add places to their favorites so they can easily go back to them.
- Notifications: allow users to subscribe to changes to the places they have in their favorites.
- Moderation: allow users to flag inappropriate/inaccurate information and have a mechanism to notify owners or remove them.
- Change language: since this application is for users from different countries, I want the users to be able to use the app in their native language. There is a button to change the language to different languages, but it is not yet working.
- Search box: there is a search box in the main page, which is not working yet. However, filter box is working.
- Mobile: make the app run on mobile by using React Native.
- Image: next to each place, there is a space to add a picture. I just need to add a way to upload them to blob storage and then attach them to the place.

**CATEGORY 2: USER EXPERIENCE EXAMPLE**

Click a link to see a short video of how users interact with Essentials project!

Link:

**CATEGORY 3: IMPLEMENTATION DETAILS**

We want to see how the project was created. Any or all of the following could be provided:

1. Credentials for a read-only access point for the cloud platform used for implementation, so that judges can explore your configuration (if desired).
2. Screenshots of configuration steps in the cloud platform used.
3. GitHub repository containing all written code (Lambda/Functions or other programming language-centric products).
