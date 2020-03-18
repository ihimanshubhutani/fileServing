# fileServing

Online File Serving 

This API hosts files on server , on uploading files it give return unique token for particular file which can be then used to access files.

## Setup

### Prerequisites

1. Install [Node.js](https://nodejs.org/) 

### Project Setup

1. Change directory to project

        $ cd path/to/project

> Make sure you are on Sequelize_FileServing branch

2. Change directory to fileServing_Sequelize

        $ cd fileServing_Sequelize

3. Install the project dependencies
        
        $ npm install 

### Start project 

      $ npm install
### Routes
It requires user need to be logged in, if user is not registered he can register by following below link:

    http://localhost:3000/signup

Or

Login

    http://localhost:3000/login

After logged in user can use following routes.

Upload

    http://localhost:3000/upload 

Show files

    http://localhost:3000/files

Download particular file

    http://localhost:3000/files/download/:file_id

To Just view file on server

   http://localhost:3000/files/:file_id