# the_bradery_project

## Dependencies

To install this project, you should have :

- Node.js
- Docker
- npm

Clone this repository

Start Docker :


```bash
cd backend
```

```bash
docker-composer up
```


### init backend :

```bash
cd backend
```

```bash
npm install
```

You can test the API with insomnia and [this file](https://github.com/Kiggz-Prizrak/the_bradery_project/blob/main/backend/Insomnia_2023-11-13.json)

### Start backend :

```bash
npm start
```

### init backend :

```bash
cd frontend
```

```bash
npm install
```

## Database gestion

you can work with [adminer](http://localhost:8000/?server=mysql&username=bradery&db=bradery&table=Products) 

adminer log :
- serveur : mysql
- user : bradery
- password : changeme
- database : bradery


to create an admin, create user and convert the "isAdmin" value from 0 to 1


### Start frontend :

```bash
npm run dev
```
