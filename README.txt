Readme For LTC Management Portal  (Supervisor: Dr. Puneet Goyal)
Tech Tools:
1) Front-End: React.js, Material UI, Bootstrap
2) Backend: Node.js , Express
3) Database: PostgreSQL
4) Authentication: Firebase
5) Deployment: Heroku (https://ltc-mgmt.herokuapp.com)

--> You can visit the website using above link otherwise if you want to run it on local machine then you have to make database and install the below libraries. After that you need to connect the database with your code and then open two terminal and run commands: npm start and npm run devStart in client and server side respectively.

Libraries used:
    "@date-io/date-fns": "^1.3.13",
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@material-ui/core": "^4.12.3",
    "@material-ui/lab": "^4.0.0-alpha.61",
    "@mui/icons-material": "^5.6.2",
    "@mui/lab": "^5.0.0-alpha.69",
    "@mui/material": "^5.6.2",
    "@testing-library/jest-dom": "^5.16.2",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.1.3",
    "date-fns": "^2.28.0",
    "firebase": "^9.6.6",
    "jspdf": "^2.5.1",
    "material-table": "^1.69.3",
    "react": "^17.0.2",
    "react-bootstrap": "^2.2.1",
    "react-dom": "^17.0.2",
    "react-icons": "^4.3.1",
    "react-material-ui-form-validator": "^3.0.0",
    "react-navigation": "^4.4.4",
    "react-router-dom": "^6.2.1",
    "react-scripts": "^3.0.1",
    "react-to-print": "^2.14.4",
    "styled-components": "^5.3.5",
    "web-vitals": "^2.1.4"


Code is mainly divided into two parts,
1) Client Side
2) Server Side
Whenever there is a request made by client(GET or POST) it is handled by the server.

It contains two type of user,
1) Employee who applies for the LTC
2) ADMINS which include HOD, Establishment Section, Audit Section, Accounts Section, Registrar and Dean, who will forward, reject, approve, dissaprove etc. the application.

Employee need to fill the new application form then he/she can preview or submit the application.
Then it will be forwarded to the next sequential ADMIN whatever it is.
Then the ADMIN can forward or reject after seeing application.
The employee can see the status of his application by checking his previous application verdict.
If any ADMIN rejects the application then it will not be forwarded to the next ADMIN.
IF the DEAN approves the application then Junior ACCOUNTANT can print the final application and print out the application for further process (EXTENSION PART OF THIS PROJECT, not yet implemented).



