# Budget Tracker

## Description

The PWA Budget Tracker is an online AND offline progressive web application to store and visualize your transactions. It utilizes MongoDB and Mongoose to store the user's budget data, as well as local storage while using the app offline. The Budget Tracker was built to give the user an easy way to track their transactions while traveling or in regions where the network may be spotty. I relied on my knowledge of models, database creation, and local storage creation to complete this project. 

## Table of Contents 
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation
To install the Budget Tracker, first download the files from the Github repo, open a terminal inside the appropriate folder, and run "npm install". To launch the server locally enter "nodemon server.js" or "node server.js". Ensure that Chrome stores the appropriate files locally by using the Chrome Inspect tool. Navigate to the Application tab and check IndexedDB, Service Worker, and the Cache to check the files.

## Usage
![Screenshot](./Screenshot.png)

To begin using the Budget Tracker, first go to https://still-escarpment-66018.herokuapp.com/ . Next, add your transactions to the budget tracker by entering the amount and clicking add or subtract. The transactions will be stored on the database while the application is online, or stored locally while the application is offline. Once the application is online again, any locally stored entries will be added to the online database. 

## Credits
The Github repository resides at https://github.com/tjtahmas/PWA-Budget-Tracker

You can contact me with any questions or comments about the project at tjtahmas@gmail.com

## License

MIT License

Copyright (c) 2021 Thomas Tahmassebi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
---