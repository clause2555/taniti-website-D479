# Taniti Tourism Booking Platform

## Forwards

This is a project for my university

## Overview

Taniti Tourism is a comprehensive web application designed to facilitate seamless booking experiences for various tourism services. The platform offers users the ability to browse activities, accommodations, dining options, transportation services, and more. With a focus on user-friendly navigation, secure authentication, and efficient booking management, Taniti ensures that planning your next adventure is both simple and enjoyable.

Access the live page at Access the live page at [Taniti Tourism](https://clause2555.github.io/taniti-website-D479/)

## Features

- **Responsive Navigation Menu:** Easily navigate through different sections of the website using the intuitive hamburger menu.
- **User Authentication:** Secure registration and login functionalities to protect user data and manage personalized bookings.
- **Booking Management:**
  - **Create Bookings:** Users can book activities, accommodations, car rentals, and other services.
  - **View Bookings:** Access a detailed list of all current and past bookings from the account page.
  - **Cancel Bookings:** Users can cancel their bookings with a confirmation modal to prevent accidental cancellations.
- **Dynamic Filtering:** Filter available activities and services based on categories to find exactly what you're looking for.
- **Hero Slider:** Engaging image slider on the homepage to showcase featured services and promotions.
- **Account Management:** View and manage personal information and bookings from a dedicated account page.
- **Accessibility Enhancements:** ARIA attributes and focus management ensure the platform is accessible to all users.

## Technologies Used

- **Frontend:**
  - HTML5 & CSS3
  - JavaScript (Modular ES6)
  - [Flatpickr](https://flatpickr.js.org/) for date selection
- **Backend:**
  - LocalStorage for data persistence
- **Deployment:**
  - Docker with Nginx for local development testing
  - GitHub Pages for user testing

- **Disclaimer**
  - This application is a protoype, if you are a member of my university performing user testing for my app, please please do not put your actual email and/or a password you have or would ever use in the account creation.  [Auth.js](js/auth.js) takes your input and stores in in the browsers local storage so the data is never transmitted anywhere, and the subsequent [booking.js](js/booking.js) and [cancelBooking.js](js/cancelBooking.js) access this local storage to simulate a backend.  If you were to put actual information in it shouldnt go anywhere, however if your browser happened to be compromised this data could be grabbed easily, so it is best practice to NOT use any of your actual information.  

  - In my own testing I just used 'test@test.email' and 'testtest' for the password.  

## Installation

To set up the project locally for testing purposes, you can use Docker with Nginx to serve the static files. This ensures that the environment closely resembles a production setup.

### Running Locally with Docker

1. **Clone the Repo and Navigate to the Project Directory:**

   Open your terminal and navigate to where you'd like the project to reside, and clone.

   ```bash
    cd /path/to/your/projects
    git clone https://github.com/clause2555/taniti-website-D479.git
    ```
   
   Navigate into the root directory of the project where the `index.html` and other HTML files reside.

   ```bash
   cd path/to/your/project/taniti-website-D479.git
   ```

2. **Run the Docker Command:**

   Execute the following command to start a Docker container with Nginx serving your project files.

   ```bash
   docker run --rm --name taniti-nginx -p 8080:80 -v "$(PWD):/usr/share/nginx/html" nginx:latest
   ```

   **Explanation of the Command:**

   - `docker run`: Starts a new Docker container.
   - `--rm`: Automatically removes the container when it exits, ensuring no leftover containers clutter your system.
   - `--name taniti-nginx`: Assigns the name `taniti-nginx` to the container for easy reference.
   - `-p 8080:80`: Maps port `80` of the Docker container (default Nginx port) to port `8080` on your local machine. Access the site by navigating to `http://localhost:8080` in your browser.
   - `-v "$(PWD):/usr/share/nginx/html"`: Mounts the current working directory (`$(PWD)`) to the Nginx HTML directory inside the container. This allows Nginx to serve your project's static files.
   - `nginx:latest`: Specifies the Docker image to use. In this case, the latest version of Nginx.

3. **Access the Application:**

   Once the Docker container is running, open your web browser and navigate to:

   ```
   http://localhost:8080
   ```

   You should see the Taniti Tourism Booking Platform up and running, ready for testing.

## Testing

### Local Testing with Docker

For local development and testing, Docker provides an isolated environment that closely mimics production settings. By using Nginx to serve your static files, you can ensure that the application behaves consistently across different environments.


### Prototype Testing on GitHub Pages

While local testing with Docker provides a robust environment for development, true prototype testing is conducted on the GitHub Pages site. Deploying to GitHub Pages allows for real-world testing scenarios and ensures that the application behaves as expected in a live setting.

Access the live page at [Taniti Tourism](https://clause2555.github.io/taniti-website-D479/)

- **Disclaimer**
  - This application is a protoype, if you are a member of my university performing user testing for my app, please please do not put your actual email and/or a password you have or would ever use in the account creation.  [Auth.js](js/auth.js) takes your input and stores in in the browsers local storage so the data is never transmitted anywhere, and the subsequent [booking.js](js/booking.js) and [cancelBooking.js](js/cancelBooking.js) access this local storage to simulate a backend.  If you were to put actual information in it shouldnt go anywhere, however if your browser happened to be compromised this data could be grabbed easily, so it is best practice to NOT use any of your actual information.  

  - In my own testing I just used 'test@test.email' and 'testtest' for the password.

**Benefits of Testing on GitHub Pages:**

- **Accessibility:** Easily share the live version with team members or stakeholders for feedback.
- **Performance Insights:** Gain insights into how the application performs under real-world conditions.
- **Integration Testing:** Test integrations with other services and APIs in a production-like environment.

## Contributing

Suggestions and tips are always welcome, but as this is a school project no contributions are necessary.

## License

This project is licensed under the [MIT License](LICENSE).

---

*Feel free to reach out if you have any questions or need further assistance!*

```