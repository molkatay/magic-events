# Events Management Application
This repository contains the configuration for an event management application utilizing **Drupal 10** as the backend and **Next.js** on the frontend, styled with **TailwindCSS**. It includes a Docker Compose setup for a complete local development environment.

## Architecture Overview
The application is structured around several key services to ensure robust performance, easy scalability, and efficient search capabilities:

## Services Included:
- **Web:** Running on Nginx, optimized for Drupal 10.
- **PHP:** PHP 8.2 with PHP-FPM, including common extensions and configured with xdebug.
- **Database (db):** PostgreSQL 15, enhanced with UUID extension for better data management.
- **Varnish:** Caching service to speed up content delivery.
- **Redis:** In-memory data structure store, used as a database, cache, and message broker.
- **Solr:** Powerful search platform for indexing and searching event content.
## Code Quality Tools:
- **SonarQube:** For continuous inspection of code quality to perform automatic reviews with static analysis of code to detect bugs, code smells, and security vulnerabilities.
- **ESLint:** For linting JavaScript code, including JSX used in Next.js, to enforce coding standards and catch syntax and logic errors before runtime.
  Additional Components to be Added:
- **TailwindCSS:** For custom, utility-first styling.

## Prerequisites
This project is designed to be cross-platform, working on Linux, Windows (Docker for Windows), and macOS (Docker for Mac). To get started, ensure you have the following installed:

- **Docker CE:** For creating and managing containers.
- **Docker Compose:** For defining and running multi-container Docker applications.
- **Git:** Optional, for version control and collaboration.
### Installation Guide
1.  **Clone the repository** (if Git installed):

```
git clone [repository-url]
cd [repository-directory]
```
2.  **Start the Docker containers:**
```
docker-compose up -d --build
```
This command builds the necessary Docker images and starts the services defined in your docker-compose.yml file.
3.  **Access the application:**
- Frontend (Next.js) can be accessed at http://node.druxt-events.com.
- Backend (Drupal) can be accessed through the Nginx service at http://druxt-events.com.
4. **Configure Drupal and Next.js:**
   Follow the setup instructions for each to configure the connection between backend and frontend components.

## Testing and Code Quality Checks

- **Analyzing code with SonarQube:**

Make sure SonarQube is setup and running
```
docker-compose exec sonarqube sonar-scanner
```
Linting with ESLint:
```
docker-compose exec web eslint /path/to/your/javascript/files
```

To use Code quality on pre commit you need to setting up Git Hooks
### Setting Up Git Hooks

1. **Install Pre-commit:**

You can use tools like pre-commit. First, install it globally:
```
pip install pre-commit
```
2. ** Install Git Hook Scripts: **

Run the following command to set up the hooks in your local repository:
```
pre-commit install
```

This will install the pre-commit hook into your `.git/hooks/pre-commit` directory. Now, each time you commit, the configured hooks will run and check for any issues.
### Contact Information
If you have any questions, feedback, or would like to contribute to the project, please don't hesitate to reach out.

### Contact me at:

- **LinkedIn:** https://www.linkedin.com/in/molka-tayahi-559b7a25/

I am always open to discussing new ideas, improvements, or any sort of feedback that could enhance the project.
