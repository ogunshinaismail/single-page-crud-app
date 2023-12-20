# React Single Page CRUD Web Application with Axios, TypeScript, and Zod

## Overview

This project demonstrates a simple CRUD (Create, Read, Update, Delete) web application built using React, Axios, TypeScript, and Zod. It showcases data management, API interactions, type safety, and input validation.

```typescript
type Item = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  date?: string;
};
```

The project allows users to perform basic CRUD operations on a collection of items. Axios is used for handling HTTP requests, TypeScript for static type checking, and Zod for data validation.

## Features

- **Create:** Add new items to the collection with a title, category, image URL, and description.
- **Read:** View a list of existing items with their details.
- **Update:** Edit the information of an existing item.
- **Delete:** Remove items from the collection.

## Technologies Used

- **React.js:** A popular JavaScript library for building user interfaces.
- **Axios:** A promise-based HTTP client for making requests to a server.
- **TypeScript:** A superset of JavaScript that adds static typing to the language.
- **Zod:** A TypeScript-first schema declaration and validation library.

## Project Structure

```
|-- src
|   |-- assets
|   |   |-- calender-white.svg
|   |   |-- ...
|   |-- components
|   |   |-- AddPost.tsx
|   |   |-- EditPost.tsx
|   |   |-- ...
|   |-- hooks
|   |   |-- useFetch.ts
|   |   |-- ...
|   |-- pages
|   |   |-- Home.tsx
|   |   |-- ...
|   |-- types
|   |   |-- index.ts
|   |-- App.tsx
|   |-- index.tsx
|   |-- ...
|-- package.json
|-- tsconfig.json
|-- ...
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ogunshinaismail/single-page-crud-app.git
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn start
   ```

4. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- To add a new item, click on the "Add Item" button and fill in the required details.
- To edit an existing item, click on the "Edit" button next to the item and update the information.
- To delete an item, click on the "Delete" button next to the item.
- To use the useFetch hook, you have to import it in your file and pass in the url, you can further customize it by
  updating the type of the data you're getting from the endpoint

## Additional Information

- Data Structure: The application manages items with the following structure:
    type Item = {
        id: number;
        title: string;
        category: string;
        image: string;
        description: string;
        date?: string;
    }
- Validation: Zod is used to define schemas for data validation, ensuring data integrity and preventing invalid input.

## Contribution

- This project serves as a foundation for building more complex React applications with CRUD functionality.
- Feel free to customize and extend the project based on your specific requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.