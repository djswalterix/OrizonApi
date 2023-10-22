<br />
<div align="center">
  <h3 align="center">Orizon Api</h3>

  <p align="center">
    A web application that provides APIs for eco-friendly travel management.
    <br />
    <a href="https://github.com/djswalterix/orizon-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />

    ·
    <a href="https://github.com/djswalterix/orizon-api/issues">Report Bug</a>
    ·
    <a href="https://github.com/djswalterix/orizon-api/issues">Request Feature</a>

  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#API Documentation">API Documentation</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The "Orizon Api" is a web application that provides the API for working with eco-friendly travels!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- Node.js
- Express

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Getting Started with Orizon Api

This project uses Node.js and Express. Ensure you have them installed before proceeding.

## Prerequisites

- Node.js and npm installed on your machine.

## Installation

1. Clone the repository

   ```sh
   git clone https://github.com/djswalterix/orizon-api.git

   ```

2. Install NPM packages

   ```
   npm install
   ```

3. Start application
   ```
   node app.js
   ```
      <p align="right">(<a href="#readme-top">back to top</a>)</p>
   <!-- USAGE -->

## Usage

To use the "Orizon Api," follow these simple steps:

1.Make API requests to create, retrieve, update, or delete eco-friendly travel data.

2.Explore the various available endpoints for managing eco-friendly travel information.

3.Integrate the API into your sustainable travel application or service.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome! If you'd like to contribute to "Orizon Api," please follow these steps:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Your contributions help make this project better for everyone. Thank you for your support!

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- API DOCUMENTATION -->

## API Documentation

The "Orizon Api" provides the following APIs for eco-friendly travel management:

### Users API

- **Create a New User**

  - Endpoint: `/api/users/`
  - Method: `POST`
  - Description: Create a new user for the eco-friendly travel platform.
    - Request Body:
    - **Name**: User's name.
    - **Surname**: User's surname.
    - **Email**: User's email address.

- **Get All Users**

  - Endpoint: `/api/users/`
  - Method: `GET`
  - Description: Retrieve a list of all registered users.

- **Get User by Email**

  - Endpoint: `/api/users/:email`
  - Method: `GET`
  - Description: Retrieve user information based on their email.

- **Update User by Email**

  - Endpoint: `/api/users/:email`
  - Method: `PUT`
  - Description: Update user information based on their email.
    - Request Body:
    - **Name**: User's name.
    - **Surname**: User's surname.
    - **Email**: User's email address.

- **Delete User by Email**
  - Endpoint: `/api/users/:email`
  - Method: `DELETE`
  - Description: Delete a user based on their email.

### Products API

- **Create a New Product**

  - Endpoint: `/api/products/`
  - Method: `POST`
  - Description: Create a new eco-friendly product.
    - Request Body:
    - **Name**: Product's name.

- **Get All Products**

  - Endpoint: `/api/products/`
  - Method: `GET`
  - Description: Retrieve a list of all eco-friendly products.

- **Get Product by Name**

  - Endpoint: `/api/products/:name`
  - Method: `GET`
  - Description: Retrieve product information based on its name.

- **Update Product by Name**

  - Endpoint: `/api/products/:name`
  - Method: `PUT`
  - Description: Update product information based on its name.
  - Request Body:
    - **Name**: Product's name.

- **Delete Product by Name**
  - Endpoint: `/api/products/:name`
  - Method: `DELETE`
  - Description: Delete a product based on its name.

### Orders API

- **Create a New Order**

  - Endpoint: `/api/orders/`
  - Method: `POST`
  - Description: Create a new eco-friendly travel order.
  - Request Body:
    - **userID**: User's id.
    - **productID**: product id.

- **Get All Orders**

  - Endpoint: `/api/orders/`
  - Method: `GET`
  - Description: Retrieve a list of all eco-friendly travel orders.

- **Get All Orders by Date**

  - Endpoint: `/api/orders/all/:date`
  - Method: `GET`
  - Description: Retrieve eco-friendly travel orders filtered by a specific date.

- **Get Orders by User**

  - Endpoint: `/api/orders/:userId`
  - Method: `GET`
  - Description: Retrieve eco-friendly travel orders for a specific user.

- **Get Orders by User and Date**

  - Endpoint: `/api/orders/:userId/:date`
  - Method: `GET`
  - Description: Retrieve eco-friendly travel orders for a specific user filtered by date.

- **Update Order by ID**

  - Endpoint: `/api/orders/:id`
  - Method: `PUT`
  - Description: Update an eco-friendly travel order based on its ID.
  - Request Body:
    - **userID**: User's id.
    - **productID**: product id.

- **Delete Order by ID**
  - Endpoint: `/api/orders/:id`
  - Method: `DELETE`
  - Description: Delete an eco-friendly travel order based on its ID.

Please refer to the respective API endpoints for detailed information on how to use each of them.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `[](dist/bundle.js.LICENSE.txt)` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Instagram: [@walkerhoxha](https://www.instagram.com/walkerhoxha/)
- LinkedIn: [Walter Hoxha](https://www.linkedin.com/in/walter-hoxha-62112126b/)
- GitHub: [djswalterix](https://github.com/djswalterix)

Project Link: [https://github.com/djswalterix/OrizonApi](https://github.com/djswalterix/OrizonApi)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
