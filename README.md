# Gateways Backend (Musala Soft Fullstack Developer Assessment)

This sample project is about managing gateways - master devices that control multiple peripheral devices.

The task is to create a REST service for storing information about these gateways and their associated devices. This information must be stored in the database.

When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.

The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

---
<br>

## How to use :bulb:

Clone the repo by typing the command below into your terminal.

```
git clone https://github.com/chunkingz/Gateways-Backend.git
```

```
cd Gateways-Backend
``` 

```
npm i
``` 

---
<br>

## Development server :sparkles:

Type `npm start` for a normal prodcution server or `npm run dev` for a dev server. 
<br>
To interact with the Endpoints directly, Open Postman and use the GET verb to `http://localhost:5000/gateways`
---
<br>

## Frontend

To develop locally, clone the frontend using the below command
```
git clone https://github.com/chunkingz/Gateways-Frontend.git
```

---

:bowtie: yours truly
