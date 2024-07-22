
in the first make "npm start"


in the first we need to make login this table of users and password and acsses code

this table exsist in database right now dont need to create new user 
| username | password | accessCode |
|----------|----------|-------------|
| user1    | user1    | 111         |
| user2    | user2    | 222         |
| user3    | user3    | 333         |
| user4    | user4    | 444         |
| user5    | user5    | 555         |


right now un the database exsit table of preference and this is the table 


[
  {
    "accessCode": "111",
    "startDate": "2024-08-01T00:00:00.000+00:00",
    "endDate": "2024-08-05T00:00:00.000+00:00",
    "destination": "London",
    "vacationType": "Tour"
  },
  {
    "accessCode": "222",
    "startDate": "2024-08-01T00:00:00.000+00:00",
    "endDate": "2024-08-06T00:00:00.000+00:00",
    "destination": "Sydney",
    "vacationType": "Adventure"
  },
  {
    "accessCode": "333",
    "startDate": "2024-08-01T00:00:00.000+00:00",
    "endDate": "2024-08-05T00:00:00.000+00:00",
    "destination": "London",
    "vacationType": "Rest"
  },
  {
    "accessCode": "444",
    "startDate": "2024-08-01T00:00:00.000+00:00",
    "endDate": "2024-08-06T00:00:00.000+00:00",
    "destination": "London",
    "vacationType": "Nature"
  },
  {
    "accessCode": "555",
    "startDate": "2024-08-04T00:00:00.000+00:00",
    "endDate": "2024-08-06T00:00:00.000+00:00",
    "destination": "Paris",
    "vacationType": "Nature"
  }
]

http://localhost:3000/preferences/majority to get all majority preference

in our example will return this preference

{
    "destination": "London",
    "vacationType": "Nature",
    "dates": {
        "startDate": "2024-08-04T00:00:00.000Z",
        "endDate": "2024-08-05T00:00:00.000Z"
    }
}


you can see the destination options by GET http://localhost:3000/preferences/destinations
you can see the vacation type  options by GET http://localhost:3000/preferences/vacation_types


you can udpate the data but make first login and put the same accsess code of the same preference  

example:

first we make login in postman 



POST http://localhost:3000/users/login

in the body
{
    "username" : "user4",
    "password" : "user4",
    "accessCode" : "444"
}

after that open new tap in postman 

PUT http://localhost:3000/preferences/edit

in the body 
{
  "accessCode": "444",
  "startDate": "2024-08-07",
  "endDate": "2024-08-13",
  "destination": "Paris",
  "vacationType": "Nature"
}

and i make delete all preference just call DELETE http://localhost:3000/preferences/

after that you can start add new preference and every preference must be with the corrcet acces code and start check 





