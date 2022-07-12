# ZC2030

# Documentation

[Detailed Documentation](https://bejewled-radish-5fd.notion.site/c508f08c5b7a4d01960f2a54b1949e55?v=840ed39028804229828d3b05384052b0)

## Getting Started
### Web Application

Welcome to the Zero Carbon 2030 Web Application. In order to launch, follow these instructions:
1. To a clean directory, type the following command into your terminal to clone the project.
    `git clone https://git.cardiff.ac.uk/c1847017/zc2030.git`
2. Add the .env and .secret as provided by the team into the serverless directory
3. From your project directory type the following commands into your terminal:
4. `cd serverless`
5. `npm install --force`
6. `npx prisma generate`
7. `npm run dev`
8. Your application should now be running on http://localhost:3000

### Blockchain

Welcome to the Zero Carbon 2030 Blockchain. In order to launch, follow these instructions:

1. Add the .secret as provided by the team into the blockchain/smart-contracts directory
2. From your project directory type the following commands into your terminal:
3. `cd blockchain/smart-contracts`
4. `npm install`
5. `truffle compile`
6. `truffle deploy`
7. Your smart contracts should now be deployed on the networks specified on the truffle-config.js

## Documentation

### JavaScript (Programming Language)

[JavaScript documentation](https://www.javascript.com/learn/strings)

JavaScript is one of the most widely used programming languages. It is the language that
was used to develop the frontend of the Recruitment system. JavaScript was used because 
of NextJS, which is a JavaScript framework.

### NextJS (JavaScript Framework)

[NextJS documentation](https://nextjs.org/docs)

NextJS is a React framework that gives you building blocks to create web applications.
NextJS is used for the backend and the frontend of the web application.

 ### Solidity (Programming Language)
[Solidity](https://docs.soliditylang.org/en/latest/index.html#getting-started)

Solidity is a statically-typed curly-braces programming language designed for developing smart contracts that run 
on Ethereum.

 ### MySQL (Database Service)
[MySQL documentation](https://dev.mysql.com/doc/)

MySQL was used for the database service of the web application. MySQL is known for being 
the most secure and reliable database management system, having also a high permormance on
large amount of data.

 ### npm (Package Manager tool for Node.js)
[npm documentation](https://docs.npmjs.com/)

Npm is the default package manager for the JavaScript runtime environment Node.js. It was 
used as a command-line utility for interacting with said repository that aids in package 
installation, version management, and dependency management. In addition, it was used to 
build and start the project. 

 ### Postman (API platform)
[Postman documentation](https://learning.postman.com/docs/publishing-your-api/documenting-your-api/)

Postman is a tool that was used on testing the API calls from the backend of the web 
application. It was a really helpful tool as we were able to test the backend API calls before 
implementing the frontend.

 ### Jest (Testing Framework)
[Jest documentation](https://jestjs.io/docs/getting-started)

Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase.
It was used for testing the web application.

#### Community Resources:

[Jest Crash Course - Unit Testing in JavaScript by Traversy media - Youtube video](https://www.youtube.com/watch?v=7r4xVDI2vho) (How Jest works)

 ### Cypress (Testing Framework)
[Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress)

Cypress is a JavaScript-based end-to-end testing framework built on top of Mocha – a feature-rich JavaScript 
test framework running on and in the browser, making asynchronous testing simple and convenient.

#### Community Resources:

[Cypress End-to-End Testing by Fireship - Youtube video](https://www.youtube.com/watch?v=7N63cMKosIE) (How Cypress works)

 ### GIT (Version Control System)
[GIT documentation](https://git-scm.com/doc)

GIT is an essential tool for any sized projects and was used to manage the source code of the 
project. GIT was used to monitor, track changes and issues as well as enabling other 
developers to have access on it, be able to download it and review it. In addition, Gitlab CI/CD
pipelines were used for automated testing and deployment.

 ### Axios (HTTP Client library)
[Axios documentation](https://axios-http.com/docs/intro)

Axios is a promise-based HTTP Client for the browser that was used on the front end. 
Axios API was used to handle GET and POST requests between the frontend and the backend.

#### Community Resources:

[React - The Complete Guide by Maximilian Schwarzmüller - OReilly Tutorial](https://learning.oreilly.com/videos/react-the/9781789132229/9781789132229-video10_3/) (How Axios works)

 ### React-Bootstrap (Component-based library)
[React-Bootstrap documentation](https://react-bootstrap.github.io/getting-started/introduction)

React-Bootstrap is component-based library which replaces the Bootstrap JavaScript.
React-Bootstrap was used on the frontend for all the components used in the system, to reduce
the amount of boilerplate code that would need to create simple tasks such as buttons and 
form elements. It also has shorter syntax that bootstrap for each component, therefore it 
requires less code. In addition, React-Bootstrap library was created specifically for a React 
project, therefore it is more suitable when using React.  

### WebStorm (Integrated Development Environments tool)
[WebStorm documentation](https://www.jetbrains.com/webstorm/)

WebStorm is a powerful IDE tool specifically for JavaScript that helps with importing, developing, 
modelling, and deploying computer software. It was used for writing most of the code of the web 
application, including the frontend and backend. In addition, CodeWithMe plugin was used for 
collaborative coding and pair programming service. 

 ### MySQL Workbench (Relational Database Design tool)
[MySQL Workbench](https://dev.mysql.com/doc/workbench/en/)

MySQL Workbench is a visual designing tool for creating, executing, and optimizing SQL 
queries. It was used for writing the code for database tier of the web application. In 
addition, it was used for testing purposes on the development phase.

 ### Truffle (Blockchain Development Environment)
[Truffle](https://trufflesuite.com/docs/truffle/)

Truffle is a development environment utilizing the EVM (Ethereum Virtual Machine) as a basis. The slogan of Truffle is 
”Smart Contracts Made Sweeter”, indicating that the environment specializes in smart contract development.

 ### Ganache (Local Ethereum Environment)
[Ganache](https://trufflesuite.com/docs/ganache/)

Ganache is a tool to set up your own local Ethereum blockchain that you can use to deploy and test your smart
contracts/dApps before launching them on an authentic chain. As such, Ganache enables developers to avoid paying 
unnecessary gas fees during the developing process.


