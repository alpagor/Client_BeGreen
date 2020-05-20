# BeGreen 

#### Description

BeGreen is an app created to help you with your choice to eliminate meat from your meals. The app will shows you recipes that will take care you do not have nutritional deficiencies on proteins (one of most common worries  for vegetarian beginners).

#### User Stories

 **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

**Signup:** As an anon I can sign up in the platform so that I can start generating recipes 

**Login:** As a user I can login to the platform so that I can start using the app

**Logout:** As a user I can logout from the platform so no one else can use it

**Becoming a Premium user** As a user I will be able to update my plan and access to extra features such as shopping  list and live chat with a nutritionist

**Shopping List** As a user I will be able to access to a list of all the ngredients of the recipe in a list so it will be easier for me to but them and I also be able to download it on a pdf file and print it out.

**Live chat** I'll be able to talk to the chosen nutritionist 

**View Recipe details** A a user I will be able to view the recipe details (ingredients, preparation, etc...)

**Add Recipe to the Menu** As a user I can add a receipe into my daily menu 

**Edit menu** As a user I can edit the menu including adding which day of the week I'll use it

**Userzone** As a user I'll be able  to access to my userzone in order to upgrade my plan, change the default profile picture or ammend the food allergies or other personal details.



## Backlog

- Video-chat with the nutritionist.
- Premium users will have more info a part from the proteins also will cover the needs of D Vitamin, Iron, Calcium, zinc, omega3, Yodo, etc...
- Users can likes the recipes and give feedback over the nutritionists.
- Create a private access for the nutritionists.
- Add more food alergies



## Client / Frontend

### React Router Routes (React App)

`<Route/>` = allows anyone to see the page

`<PublicRoute/>` = allows unauthenticated users to see the page

`<PrivateRoute/>` = allows only authenticated users to see the page

`<PremiumRoute/>` = allows only authenticated premium users to see the page OR redirect to premium info

|      Path       |   Component   |    Permissions    | Component Description                                        |
| :-------------: | :-----------: | :---------------: | ------------------------------------------------------------ |
|       `/`       |  SplashPage   |    `<Route/>`     | Home page                                                    |
|    `/signup`    |  SignupPage   | `<PublicRoute/>`  | Signup form, link to login,navigate to homepage after signup |
|    `/login`     |   LoginPage   | `<PublicRoute/>`  | Login form, link to signup, navigate to homepage after login |
|  `/generator`   | GeneratorPage | `<PrivateRoute/>` | Shows recipe generator page                                  |
|     `/menu`     |   MenuPage    | `<PrivateRoute/>` | Shows MenuPage                                               |
|     `/chat`     |   ChatPage    | `<PremiumRoute/>` | Show chat box if premium user else show become premium component |
|   `/userzone`   | UserzonePage  | `<PrivateRoute/>` | Show UserzonePage                                            |
| `/premium/info` |  PremiumInfo  | `<PrivateRoute/>` | Show page with benefits of becoming premium user             |
| `/premium/form` |  PremiumForm  | `<PrivateRoute/>` | Show upgrading  forms (bank and personal details form)       |



### Page components

- LoginPage
- SplashPage
- SignupPage
- GeneratorPage
- MenuPage
- ChatPage
- UserzonePage
- PremiumInfo
- PremiumForm



### Atom page components

- NavBar
- Generator
- DailyList
- RecipeDetails
- MenuList
- MenuDetails
- BecomingPremium (inside ChattPage)
- Chat 
- NavProgresBar
- Bankdetails form
- Personaldetails form
- Thankyou  message





## Server / Backend

#### Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  picture: {type: String, required: true},
  password: {type: String, required: true},
  premium: {type: Boolean, required: true},
  diet: {type: String, required: true, enum: [vegan", "ovoLactoVegetarian", "ovoVegetarian",  	"lactoVegetarian"]},
  weight: {type: Number, required: true},
  height: {type: Number, required: true},
  lifestyle: {type: String, required: true, enum: [""]}
  alergies: {type: String, required: true, enum: ["celiac", "dairy", "pulses", "nuts"]}
  gender:type: String, required: true, enum: ["man", "woman", "nonBinary"]}
  age: {type: Number, required: true},
  creditCard: {type: String, required: true},
  menus: [{type: Schema.Types.ObjectId,ref:'Menu'}]
}
```



Recipe Model

```javascript
 {
     name: {type: String, required: true},
     img: {type: String, required: true},
     preptime: {type: Number, required: true},
     cooktime: {type: Number, required: true},
     servings: {type: Number, required: true},
     protein: {type: Number, required: true},
     instructions: {type: Array, required: true},
     ingredients: {type: Array, required: true},
     tags: {type: Array, required: true, enum: ["celiac", "dairy", "pulses", "nuts", 						 "vegan", "ovoLactoVegetarian", "ovoVegetarian", "lactoVegetarian"]}
 }
```



Menu Model

```javascript
 {
   name: {type: String, required: true},
   recipes: [{type: Schema.Types.ObjectId,ref:'Recipe'}],
 }
```



### 



## API Endpoints (backend routes)

| HTTP Method | URL                 | Request Body                    | Success status | Error Status | Description                                                  |
| ----------- | ------------------- | ------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup`      | {username, img, diet, password} | 201            | 404          | Checks if fields not empty (400) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`       | {username, password}            | 200            | 401          | Checks if fields not empty (400), if user exists (else 404), and if password matches (else 404), then stores user in session |
| POST        | `/auth/logout`      | (empty)                         | 204            | 400          | Logs out the user and destroy the session                    |
| GET         | `/api/recipe/`      |                                 | 204            | 400          | Send random recipe details                                   |
| GET         | `/api/recipe/:id`   |                                 | 204            | 400          | Returns specific recipe by Id                                |
| POST        | `/api/menu`         | {menu}                          | 201            | 400          | Create Menu. Including 3 recipes on the menu                 |
| GET         | `/api/menu`         |                                 | 200            | 400          | Show all created menus for the current user                  |
| GET         | `/api/user/`        |                                 | 200            | 400          | Get the profile of the current user (via session info)       |
| PUT         | `/api/user/`        | {user}                          | 200            | 400          | Edit the profile of the current user (via session info)      |
| PATCH       | `/api/user/premium` | {user}                          | 200            | 400          | Update current user plan                                     |
| PUT         | `/api/user/cc`      | {user.creditCard}               | 200            | 400          | Save  C.C. details                                           |
| PATCH       | `/api/user/det`     | {user.weight.....}              | 200            | 400          | Save User personal details                                   |



### Links

------

[Trello](https://trello.com/invite/b/mlpCPWTR/196ac5448a3694e93976879e37020803/be-green)

Slides

Git



### Contributors 

------

##### Ariadna Díaz - [GitHub](https://github.com/arimagic-8bit) - [LinkedIn](www.linkedin.com/in/ariadna-diaz-baggerman/)



##### Alberto Pagoria - [GitHub](https://github.com/alpagor) - [LinkedIn](https://www.linkedin.com/in/albertopagoria/)

