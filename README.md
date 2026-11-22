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
- Vitest
- React Testing Library
- ESLint
- GitHub Actions

## Installation

1. Clone the repository:

   git clone https://github.com/GeorgeEuaggelos/call-management-dashboard.git

2. Navigate to the project directory:

   cd call-management-dashboard

3. Install dependencies:

   npm install

4. Create a `.env` file in the root directory and configure the API URL:

   VITE_API_URL=https://call-center-mu.vercel.app

5. Start the development server:

   npm run dev

6. Open the local URL provided by Vite in your browser.

## API Integration

The application communicates with a REST API to retrieve and manage call data.

**API Base URL:**

`https://call-center-mu.vercel.app`

**Available operations:**

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/calls`             | Retrieve calls           |
| GET    | `/calls/:id`         | Retrieve a specific call |
| PATCH  | `/calls/:id/archive` | Archive a call           |

Requests require the following custom header:

`X-User-Id: 'your name'`

## Testing

The project uses Vitest and React Testing Library for automated testing.

The test suite covers:

- API service functions.
- Component rendering.
- Call details.
- Archive functionality.
- Loading and error states.
- User interactions.

Run all tests once:

npm test -- --run

## Continuous Integration (CI)

The project uses GitHub Actions to automatically validate changes.

The CI pipeline runs on every push and on pull requests targeting the `main` branch.

The workflow performs the following checks:

1. Install dependencies using `npm ci`.
2. Run automated tests.
3. Run ESLint.
4. Build the application for production.

All checks must pass for the workflow to complete successfully.

## Development

This project was built to practice React development, component-based architecture, state management, API integration, asynchronous JavaScript, automated testing, and continuous integration.