#PC-Point Angular

##Technologies
The following technologies and/or libraries are used in this project:

- Client-side: Angular, Bootstrap, Angular-Material.

##Application parts
- Public part: Homepage, About page, Login, Register and Locations page
- Private part: New Product, Reviews, Catalogue, Profile
###Application components
####Common Module:
- Header Component: the navbar for the site, which changes if a user is logged / not logged
- Footer Component: basic footer component
- Not-Found Component: A "404" page for non-existing paths
####Home Module:
- About Component: a basic about page
- Home Component: the home page of the site if a user is logged
####Product Module:
- Create Component: a form for creating a new product
- All Component: the catalogue page where all products are shown
- Details Component: a page for a product's details
- Item Component: product component to be shown in other pages
####Location Module:
- Location Component: A page with a google maps element for displaying offices
- Location Item: location component to be shown in other pages
####Review Module:
- Review-Home Component: A page where you can view and leave a review
- Review Item: review component to be shown in other pages
####User Module:
- Login Component: A basic login form
- Register Component: A basic registration form
- Profile Component: A profile page for the current user where owned listings and reviews are shown
#####Shared Module:
- validators.ts: A set of custom validators for the forms
- interfaces: A folder of interfaces for the app
######Additional Functionality:
- auth-interceptors.ts: Custom http interceptor for figuring if a call to a component is authorized
- auth-guard.ts: A guard for the routes that require authentication

Link to the Back-end: https://github.com/AlexanderNestorov/PC-Point
