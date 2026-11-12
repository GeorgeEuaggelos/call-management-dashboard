# Call Center Dashboard

A React-based Call Center Dashboard for viewing, managing, and archiving phone calls through a REST API.

## Features

- **Activity Feed:** Displays the available calls.
- **Call Details:** View detailed information about an individual call.
- **Archive Calls:** Archive calls through the API.
- **Dynamic UI:** Automatically updates the call list after a successful archive operation.
- **Loading States:** Displays loading feedback while API requests are being processed.
- **Error Handling:** Displays error messages and provides retry functionality when requests fail.
- **Empty State:** Displays a message when there are no active calls available.

## Tech Stack

- React
- JavaScript (ES6+)
- HTML5
- CSS3
- Vite
- REST API
- Fetch API

### Installation

1. Clone the repository:

- git clone YOUR_REPOSITORY_URL

2. Navigate to the project directory:

- cd call-management-dashboard

3. Install dependencies:

- npm install

4. Start the development server:

- npm run dev

5. Open the local URL provided by Vite in your browser.

## API Integration

The application communicates with a REST API to retrieve and manage call data.

**API Base URL:**

https://call-center-mu.vercel.app

**Available operations:**

| Method | Endpoint            | Description              |
| GET    | `/calls`            | Retrieve calls           |
| GET    | `/calls/:id`        | Retrieve a specific call |
| PATCH  | `/calls/:id/archive`| Archive a call           |

Requests require the following custom header:

X-User-Id: 'your name'

## Development

This project was built to practice React development, component-based architecture, state management, API integration, and asynchronous JavaScript.
