# Running the project

## Install and run mongodb

Install from the brew community.

	brew upgrade
	brew install mongodb-community

Run the mongod with default settings.

	mongod
	
	
## Clone this project

	git clone https://github.com/kasran15/WeatherService.git

	
## Install and Run the backend server

The backend server is built using Spring Boot. It makes use of spring-security and spring-mongodb connector for Authorization and connection to MongoDB.

	mvn clean install
	
	mvn spring-boot:run
	
	
## Install and Run the frontend

The front-end is built using React. It runs on a thin nodejs server for faster development. The nodeserver has a proxy to the server to avoid CORS issues.


	npm install
	
	npm start
	
	
## Open the App

Open your favorite browser and point it to `http://localhost:3000`.



