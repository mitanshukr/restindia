# REST INDIA

A **RESTful API** to provide information about Indian States, Union territories and Districts.

_Version: 1.0.0_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

REST INDIA Restful API, built with Express.js and Mongodb, provides data of Indian States, Union territories and Districts with rich Endpoints to sort, search, and filter the response data.

REST INDIA also provides a limited control to select users to manage and modify stored data which assures you always get authentic and updated data.

_**Check the OpenAPI 3.0 specific documentation [here](https://restindia.herokuapp.com/api-docs/).**_

# Data Endpoints

Below are described the REST endpoints available that you can use to get information about Indian States, Union territories and Districts!</br></br>
You can get information about `Union territories` under `state` endpoints.

## All

**method: `GET`**</br>
**Response: `Array of JSON Objects`**

### All States

Get the information of all the States.

```
https://restindia.herokuapp.com/state/all
```

### All Districts

Get the information of all the Districts.

```
https://restindia.herokuapp.com/district/all
```

Get the information of all the Districts of a specific State.

```
https://restindia.herokuapp.com/{state}/all
```

```javascript
https://restindia.herokuapp.com/Bihar/all
```

```javascript
https://restindia.herokuapp.com/Madhya Pradesh/all
```

## State

**method: `GET`**</br>
**Response: `Array of a JSON Object`**

Get information of a State by Name.

```
https://restindia.herokuapp.com/state/{state}
```

**Example 1:** Search a State `Madhya Pradesh`. Please notice the space between `Madhya` and `Pradesh` in the endpoint URL.
```javascript
https://restindia.herokuapp.com/state/Madhya Pradesh
```
**Example 2:** Search a State `Bihar`.
```javascript
https://restindia.herokuapp.com/state/Bihar
```

**Expected Output:** A JSON Array of an Object with information of `Bihar`.
```json
[
  {
    "_id": "60abb8ff885176224c9df6c6",
    "iso3166code": "IN-BR",
    "code": "BR",
    "name": "Bihar",
    "capital": "Patna",
    "largestCity": "Patna",
    "districts": 38,
    "subdivisions": 101,
    "blocks": 534,
    "area": 94163,
    "literacy": 63.82,
    "sexRatio": 918,
    "population": 104099452,
    "censusYear": 2011,
    "officialWebsite": "https://state.bihar.gov.in/",
    "emblem": "https://restindia.herokuapp.com/image/emblem_Bihar.svg",
    "divisions": ["Patna", "Tirhut", "Saran", "Darbhanga", "Kosi", "Purnea", "Bhagalpur", "Munger", "Magadh"],
    "languages": ["Hindi", "Urdu", "Maithili", "Bhojpuri", "Magahi"],
    "neighbours": ["West Bengal", "Uttar Pradesh", "Nepal", "Jharkhand"]
  }
]
```

## District

**method: `GET`**</br>
**Response: `Array of a JSON Object`**

### General Search

Get information of a District by Name.

```
https://restindia.herokuapp.com/district/{district}
```

```javascript
https://restindia.herokuapp.com/district/Bhopal
```

### State Specific Search

Get information of a District by Name. Search in a specific State.

```
https://restindia.herokuapp.com/{state}/{district}
```

**Example:** Search a District `Sheikhpura` in `Bihar`.

```javascript
https://restindia.herokuapp.com/Bihar/Sheikhpura
```

**Expected Output:** A JSON Array of an Object with information of `Sheikhpura`.
```json
[
  {
    "_id": "609e5cec0899de31888c8a84",
    "name": "Sheikhpura",
    "state": "Bihar",
    "districtCode": 26,
    "division": "Munger",
    "area": 689,
    "censusYear": 2011,
    "population": 636342,
    "literacy": 65.96,
    "sexRatio": 926,
    "officialWebsite": "https://sheikhpura.nic.in/",
    "blocks": ["Sheikhpura"],
    "subdivisions": ["Ariari", "Barbigha", "Chewara", "Ghatkusumbha", "Sheikhpura", "Shekhopur Sarai"]
  }
]
```

# Query Parameters

**method: `GET`**

Below are some query parameters which can be used to **Regex Search**, **Sort**, **Filter**, and **Paginate** the Output Data.</br>
You can also combine different query parameters to get elegant response.

## Regex Search

### Search by Name

_Applicable only to **ALL** type Endpoints._

Search States and Districts with matching Name.

```
https://restindia.herokuapp.com/state/all?name={state}
```

```
https://restindia.herokuapp.com/district/all?name={district}
```

```
https://restindia.herokuapp.com/{state}/all?name={district}
```

**Example:** Search a State with Name `Madhya Pradesh`.

```javascript
https://restindia.herokuapp.com/state/all?name=Madhya Pradesh
```

**Expected Output:** A JSON Array of Objects with information of `Madhya Pradesh`, `Andhra Pradesh`, `Arunachal Pradesh`, `Himachal Pradesh`, and `Uttar Pradesh`.

### Search by Languages

_Applicable only to **ALL STATE** type Endpoints._

Search States and Districts by matching Language(s).

```
https://restindia.herokuapp.com/state/all?languages={Language1[,Language2,...]}
```

**Example:** Search all the States containing Languages `Hindi` **and** `Bhojpuri`, both.

```javascript
https://restindia.herokuapp.com/state/all?languages=Hindi,Bhojpuri
```

### Search by Neighbours

_Applicable only to **ALL STATE** type Endpoints._

Search States and Districts by matching Neighbour(s).

```
https://restindia.herokuapp.com/state/all?neighbours={Neighbour1[,Neighbour2,...]}
```

**Example:** Search all the States having Neighbours `Bihar` **and** `West Bengal`, both.

```javascript
https://restindia.herokuapp.com/state/all?neighbours=Bihar,West Bengal
```

### Search by Division

_Applicable only to **ALL DISTRICT** type Endpoints._

Search Districts by matching Division Name.

```
https://restindia.herokuapp.com/district/all?division={division}
```

```
https://restindia.herokuapp.com/{state}/all?division={division}
```

**Example:** Search all the Districts which belongs to `Munger` division.

```javascript
https://restindia.herokuapp.com/district/all?division=Munger
```

```javascript
https://restindia.herokuapp.com/Bihar/all?division=Munger
```

## Sort Response

_Applicable only to **ALL** type Endpoints._

Add `:asc` for Ascending order sort and `:desc` for sorting in descending order. E.g.: `population:asc`

Sort the output response by field(s) Name.

```
https://restindia.herokuapp.com/state/all?sortby={field1:order[,field2:order,...]}
```

```
https://restindia.herokuapp.com/district/all?sortby={field1:order[,field2:order,...]}
```

```
https://restindia.herokuapp.com/{state}/all?sortby={field1:order[,field2:order,...]}
```

**Example:** Search for States, sorted by `Population` in Ascending Order.

```javascript
https://restindia.herokuapp.com/state/all?sortby=population:asc
```

**Expected Output:** A JSON Array of Objects with information of States sorted by `Population` in Ascending Order.

## Filter Response

_Applicable to all the Endpoints._

Add prefix `-` for Exclusion of the fields, and optionally you can prefix `+` for Inclusion. Default: `Inclusion`.

Filter the output response by field(s) Name.

```
https://restindia.herokuapp.com/state/all?fields={field1[,field2,...]}
```

```
https://restindia.herokuapp.com/{state}/{district}?fields={field1[,field2,...]}
```

Fields must be either Inclusion or Exclusion at a time. Mixing both types will throw an Error.

**Example:** This is invalid Query.

```javascript
https://restindia.herokuapp.com/state/bihar?fields=name,-largestCity,capital
```

## Pagination

_Applicable only to **ALL** type Endpoints._

Paginate and Limit the output response of All States and All Districts.

```
https://restindia.herokuapp.com/state/all?page={page}&limit={limit}
```

```
https://restindia.herokuapp.com/district/all?page={page}&limit={limit}
```

```
https://restindia.herokuapp.com/{state}/all?page={page}&limit={limit}
```

**Example:** Expected Output; A JSON Array of Objects with information of districts of Bihar limited to ```10 districts only```.

```javascript
https://restindia.herokuapp.com/bihar/all?page=1&limit=10
```

# Admin Endpoints

Approved Users can Update and Modify States and Districts Data in the Database using below Endpoints. Admin Endpoints expects `Authorization Token` in the Request Header.

## Authentication

Authentication is the first step to access Admin Endpoints. Execute `Login` Endpoint to get `Authorization Token`.

### Signup

**method: `POST`**

Signup to REST INDIA, to access the Admin Endpoints. Verification Link should be delivered to the provided email.

Make sure to have a genuine and good reason to Signup to get your account `Approved` by SuperAdmin.

```
https://restindia.herokuapp.com/admin/signup
```

**Request Body:**

```json
{
  "name": "Vinod Sinha",
  "email": "vsinha@test.com",
  "password": "strongPass@123",
  "occupation": "Software Engineer",
  "signupReason": "Found some outdated data."
}
```
**Response JSON:**
```json
{
  "data": "Data Object",
  "message": "Signup Successful! Verification Pending.",
  "verification": "Please verify your Email. Verification link sent to your mail: [success]",
}
```
### Login

**method: `POST`**

Approved Users can execute this Endpoint to get `Authentication Token` as a JSON Response. **_AuthToken remains valid only for one hour._**

```
https://restindia.herokuapp.com/admin/login
```

**Request Body:**

```json
{
  "email": "vsinha@test.com",
  "password": "strongPass@123"
}
```

**Response JSON:**
```json
{
  "email": "vsinha@test.com",
  "token": "**************",
  "userId": "*************"
}
```

## Insertion

Add new Data of State and District to the Database.

### Add State

**method: `POST`**

Add a new State.

```
https://restindia.herokuapp.com/admin/add/state
```

**Request Header:**

```javascript
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer {AuthToken}"
}
```

**Request Body:**

```javascript
{
  "iso3166code": String,
  "code": String,
  "name": String,
  "capital": String,
  "largestCity": String,
  "divisions": Array of Strings,
  "districts": Number,
  "subdivisions": Number,
  "blocks": Number,
  "area": Number,
  "literacy": Number,
  "sexRatio": Number,
  "population": Number,
  "officialWebsite": String,
  "censusYear": Number,
  "emblem": String,
  "languages": Array of Strings,
  "neighbours": Array of Strings
}
```

### Add District

**method: `POST`**

Add a new District.

```
https://restindia.herokuapp.com/admin/add/district
```

**Request Header:**

```javascript
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer {AuthToken}"
}
```

**Request Body:**

```javascript
{
  "districtCode": Number,
  "name": String,
  "state": String,
  "division": String,
  "subdivisions": Array of Strings,
  "blocks": Array of Strings,
  "area": Number,
  "population": Number,
  "literacy": Number,
  "sexRatio": Number,
  "censusYear": Number,
  "officialWebsite": String
}
```

## Updation

Update and Modify Exisiting Data of States and Districts.

### Update State

**method: `PATCH`**

Update an existing State Data.

```
https://restindia.herokuapp.com/admin/update/{state}
```

**Request Header:**

```javascript
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer {AuthToken}"
}
```

**Request Body:** Please Refer [`Add State`](#add-state)'s Request Body.

### Update District

**method: `PATCH`**

Update an existing District Data.

```
https://restindia.herokuapp.com/admin/update/{state}/{district}
```

**Request Header:**

```javascript
headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer {AuthToken}"
}
```

**Request Body:** Please Refer [`Add District`](#add-district)'s Request Body.

## Password Reset

### Password Reset Initiation

**method: `POST`**

Send a `POST` Request to this URL, to get `Reset Token`.

```
https://restindia.herokuapp.com/admin/reset-password/init
```

**Request Body:**

```json
{
  "email": "vsinha@test.com"
}
```
**Response JSON:**</br>
User should get a RESET Link/Token to their Registered Email.
```json
{
  "message": "Password Reset URL is sent to your mail: [success]. Please follow the instructions.",
  "status": 200
}
```

### Password Reset Submission

**method: `POST`**

User should have a `Unique URL` from the previous Request in the given format.

```
https://restindia.herokuapp.com/admin/reset-password/{userId}/{resetToken}
```

Send a `POST` Request to the Unique URL Endpoint with your `Email` and `new Password`.

**Request Body:**

```json
{
  "email": "vsinha@test.com",
  "newPassword": "newPassword#644"
}
```
**Reponse Body:**
```json
{
  "email": "vsinha@test.com",
  "message": "Password updated Successfully!",
  "status": 200
}
```
# About

**method: `GET`**

Get the information about API Developers, Contributors and more.

```
https://restindia.herokuapp.com/about
```

# Acknowledgments
REST INDIA Restful API is developed and maintained by **Mitanshu Kumar** with help from its contributors.

Design and Inspiration: [REST Countries API](https://restcountries.eu/) </br>
UI Template by: [Flatdoc](https://ricostacruz.com/flatdoc/)

- [Github](https://github.com/mitanshukr) (@mitanshukr)
- [Linkedin](https://linkedin.com/in/mitanshukr) (@mitanshukr)
- [Twitter](https://twitter.com/mitanshukr) (@mitanshukr)

# License

[Mozilla Public License](https://www.mozilla.org/en-US/MPL/2.0/) MPL 2.0
