# Scheduling App Frontend

This repository contains the frontend code for the Scheduling App. It is a React application designed for managing schedules.
Library: AntD for ui componnet, styled compoennt for designing, Typescript, for routing react-router-dom v6

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.17.0 recommended)
- [npm](https://www.npmjs.com/) (included with Node.js)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mahmudulmurad/scheduling_app_frontend.git
   cd scheduling_app_frontend
   ```

2. Build and run the Docker container:

   ```bash
   docker-compose up -d
   ```

3. Access the application at [http://localhost:3000](http://localhost:3000).

### Environment Variables

- `REACT_APP_BACKEND_URL`: Backend API URL (default: `http://localhost:3020/api/v1`)

### Usage

- Stop the application:

  ```bash
  docker-compose down
  ```

- Clean up volumes:

  ```bash
  docker-compose down -v
  ```

### Development

Run the application locally:

```bash
npm install
npm start
```
