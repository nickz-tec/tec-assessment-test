# TEC Assessment Test

TEC meeting room booking demo. Built with Next.js.

## Environment Variables

Please add the following environment variables to the project:

- `TEC_API_BASE_URL` - The base URL of the TEC API.
- `TEC_API_ACCESS_KEY` - The access key for the TEC API.

## How to run the project

For development, run the following command:

```bash
npm run dev
```

To build the project, run the following command:

```bash
npm run build
```

## Overview

### Stylings

The project uses Chakra UI as the base component library. Only necessary design tokens were added to the project. You can find the design tokens in the `src/components/ui/theme.ts` file.

The project uses "Roboto" as a free replacement for "Avenir".

### Server State

For the sake of simplicity, no server state library was used (e.g. React Query). A in house query helper hook is used to fetch the data.

### State Management

No global state management solutions were used for this project. States are kept simple and uses only `useState`.

### API

Route handler is used to build client facing API endpoint (`/api/meeting-rooms`).

### Data Caching

Upstream TEC APIs are cached with reasonable assumptions.

### Rendering

This app uses App route and server components. The page is rendered as "Dynamic Route".

## Assumptions

- The project assumes daily meeting cut off time is 18:00.
- The project _did not_ fully implement user geo detection, however some mock code is added to demonstrate how it could be implemented.
- No custom 404 page is added. This app assumes only the main page will be visited.

## Improvements

- Add fuzzy search for city combobox.
