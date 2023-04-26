# Data Notion [YouTube Link](https://youtu.be/HhP8h24ofBo)

- ## Annotation Tool that annotates data effortlessly.

# Installation Instructions

## Prerequisites

1. Java Development Kit (JDK) installed on your machine. You can download it from the official Oracle website: [https://www.oracle.com/java/technologies/javase-jdk14-downloads.html](https://www.oracle.com/java/technologies/javase-jdk14-downloads.html)
2. Maven installed on your machine. You can download it from the official Apache Maven website: [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
3. Node.js and npm (Node Package Manager) installed on your machine. You can download them from the official Node.js website: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Backend Installation

1. Navigate to the `backend` folder of the project.
2. Open a terminal or command prompt in the `backend` folder.
3. Run the following command to build and install the backend dependencies using Maven:

```
mvn clean install
```

4. After successful installation, you can run the backend server using the following command:

```
mvn spring-boot:run
```

5. The backend server should now be running on http://localhost:8080 by default.

## Frontend Installation

1. Navigate to the frontend folder of the project.
2. Open a terminal or command prompt in the frontend folder.
3. Run the following command to install the frontend dependencies using npm:

```
npm install
```

4.After successful installation, you can run the frontend development server using the following command:

```
npm start
```

5. The frontend development server should now be running on http://localhost:3000 by default.

# Usage Instructions

Data Notion is a role-based project with two user roles:

1. **Manager:** Managers can create projects, assign annotators to the project, assign tasks to annotators, create tags for annotation, and view project statistics.

2. **Annotator:** Annotators can view tasks assigned to them, perform data annotation based on assigned tasks and tags.

# Configuration

Data Notion requires the following configuration:

```
DB_HOST: Database host
DB_PORT: Database port
DB_DATABASE: Database name
DB_USERNAME: Database username
DB_PASSWORD: Database password
```

# Contributing

Contributions to Data Notion are welcome! If you would like to contribute, please follow the standard GitHub workflow of Fork, Branch, and Pull Request.
