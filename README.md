## Habit Tracker API (in progess)
The API of an app used to track habits. 

### Basic idea
- The user creates habits and treats. 
- Every habit has a weekly occurrence as goal and some reward points.
- Every treat has a "value", meaning a certain amount of points that the user has to "spend" in order to earn it. 
- The user wins the points every time he completes the weekly occurence of a habit successfully.

### Included
- [x] Node.js
- [x] Express.js
- [x] Sequelize ORM
- [x] Joi Schema Description / Data Validator
- [x] ESLint 
- [x] Prettier
- [x] Docker 
- [x] Postgres

### Get started
```
# Setup docker 
docker-compose up -d 

# Start postgres
docker start postgres

# Install dependencies
npm install

# Start server
npm start
```
