# Use Node.js and React for Fullstack Development

## Context
We need to choose two technologies for developing the backend and frontend of our project. I'm experienced with JavaScript, and I need a solution that allows for rapid development and scalability.

## Decisions
- I have decided to use Node.js for backend development.
- I have decided to use Sequelize for making queries to the database.
- I have decided to use SQLite for the database.
- I have decided to use React for frontend development.
- I have decided to use Mantine for the UI interfaces and components.

## Consequences
1. **Rapid Development**: Node.js allows us to use JavaScript for both frontend and backend, speeding up development.
2. **Scalability**: Node.js is designed for building scalable network applications.
3. **Large Ecosystem**: There is a vast ecosystem of libraries and frameworks available for Node.js, such as Express.js, and it allows us to work within the same ecosystem as React.
4. **Database Flexibility**: Sequelize, an ORM tool, simplifies interaction with relational databases for OOP developers.
5. **Easy Development of Interfaces**: Mantine simplifies the creation of user interfaces by providing developers with building blocks and elements that follow best practices in design and accessibility.

## Caveats
- Every time the server is restarted, all data in the SQLite database will be deleted.
- SQLite was chosen for its simplicity when testing in different environments.

## Links
- [Node.js Official Site](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [React](https://react.dev/)
- [Mantine](https://mantine.dev/)
- [SQLite](https://www.sqlite.org/)
