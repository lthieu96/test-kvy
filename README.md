## Technical Approach & Architecture

### Tech Stack Selection

- **Create React App with TypeScript**: For type safety and better developer experience
- **NextUI**: Modern UI component library for rapid development
- **Zustand**: Lightweight state management for cart functionality
- **React Query**: For efficient data fetching and caching
- **Axios**: For HTTP requests
- **Tailwind CSS**: For responsive and customizable styling

### Core Features Implementation

##### Product Listing & Filtering

- Implemented a responsive grid layout using NextUI components
- Created reusable filter components:
  - Price range slider with debounced updates
  - Category selection with checkboxes
  - Rating filter with custom star rating component
  - Search functionality with debounced input

##### Shopping Cart

- Used Zustand with persistence middleware for cart state management
- Implemented cart operations:
  - Add/remove items
  - Update quantities
  - Calculate totals
  - Persist cart data in `localStorage`
- Store productId and quantity in the cart, and utilize useQueries to fetch product data concurrently, optimizing performance.

##### Data Management

- Utilized React Query for:

  - Caching product data
  - Optimistic updates
  - Loading states
  - Error handling

##### Responsive Design

- **Mobile-First Approach**: Ensured the application is fully responsive, providing a seamless experience across various devices and screen sizes by utilizing Tailwind CSS's utility classes and responsive design principles.

### Performance Optimizations

- Debounced search and filter inputs
- Memoized expensive calculations using useMemo
- Implemented proper component splitting for better maintainability
- Used React Query's built-in caching to minimize API calls

### Component Structure

```
src/
├── components/ # Reusable UI components
├── service/ # API and data fetching logic
├── store/ # Zustand store configurations
├── types/ # TypeScript interfaces
└── utils/ # Helper functions
```

#### Challenges and Solutions

- Filters, sorting, and pagination logic will be handled on the backend because applying filters and sorting on the frontend with pagination leads to inaccurate results, but Fake Store API not supported for now. So I refined data fetched from the Fake Store API `getProducts` in [`src/service/fetchers`](src/service/fetchers).
