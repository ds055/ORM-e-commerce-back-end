# ORM-e-commerce-back-end

[Link to video](https://drive.google.com/file/d/1gUhacLZth6bwMEBQJjECWn8f7yKBH2IM/view)

## Description
Utilizing Insomnia, users can send GET, POST, PUT, and DELETE requests to a sample e-commerce backend and manipulate a test database.

## Screenshot
![App Screenshot](./images/ORM%20Screenshot.png)

## Installation
* Download the required files to run the app. 
* If you haven't already, download and install Insomnia. 
* Create a `.env` file using the following format, inputting the data for your database: 
> DB_NAME='' <br>
DB_USER=''<br>
DB_PASSWORD=''<br>
* In the console, use the `npm i` command to install the necessary modules. 
* To set up the database, open up MySQL in the command line in the correct folder and use the `mysql -u __ -p` command to start MySQL. 
* Use the `source` command and the correct file path with the `schema.sql` file.
* After exiting MySQL, seed the database by using the `npm run seed` command from the command line. 

## Usage
* Open the command line in the ORM E-Commerce Back End folder, and use the `npm run start` command to start the program.
* Open Insomnia. 
* In the address bar of Insomnia, use the `http://localhost:3001/api` root address.
* Then add `/categories`, `/products`, or `/tags` to choose the desired route.
* In the drop down next the address bar, choose GET, POST, PUT, or DELETE.
* To get all categories, products, or tags, use the GET route with nothing after the desired ending address. 
* To select an element by id, type in the id number after the final slash and use the GET route. 
* To delete an item from the database, use the DELETE route and enter the id number for the entry you wish to delete after the final slash. 
* For the POST and PUT routes, select the JSON format for the request type and use the appropriate schema from the following section in the body of the request. 
* To update an entry using the PUT route, you must also type in the correct id number after the slash in addition to sending in the updated JSON body. 

## Schemas
* Category Format: 
> { <br> 
    "category_name": "Desired Name" <br> 
  }
* Tag Format: 
> { <br> "tag_name": "Desired Name" <br>}
* Product Format: <br>
`Note on Product Schema: Stock represents the number of items in stock and each item can have multiple tagIds`
> { <br>
"product_name": "Desired Name", <br>
"price": 200.00,<br> 
"stock": 5,<br> 
"category_id": 1,<br> 
"tagIds": [1, 2]<br> 
}

## References
* [Many to Many with Through Table](https://stackoverflow.com/questions/68082089/query-in-join-table-for-nm-associations-in-node-js-and-sequelize)
* [Used to update FK for Product so categories can be deleted](https://stackoverflow.com/questions/8158244/how-to-update-a-record-using-sequelize-for-node)
* [Referenced throughout for various issues](https://sequelize.org/docs/v6/)

## License
Please refer to the license in the repo.

- - -
