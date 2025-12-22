# Shopping Cart & Order Processing System

## Overview

The shopping cart and order processing system handles the complete purchase flow from adding items to the cart to placing orders. The system uses client-side state management for the cart and server-side processing for order creation.

## Cart System Architecture

### State Management (src/store/cart.ts)
The cart uses Zustand for state management with persistent storage:

#### Cart Item Interface
```typescript
interface CartItem {
  id: string           // Local ID for cart item
  productId: string    // Reference to the product
  name: string         // Product name
  price: number        // Product price
  image: string | null // Product image URL
  quantity: number     // Quantity in cart
}
```

#### Cart Store Actions
- **addItem(product, quantity?)**: Adds product to cart or updates quantity if already exists
- **removeItem(productId)**: Removes item from cart completely
- **updateQuantity(productId, quantity)**: Updates item quantity (removes if quantity < 1)
- **clearCart()**: Empties the entire cart
- **total()**: Calculates the total price of all items in cart

#### Persistence
- Cart state persists across browser sessions using `zustand/middleware`
- Uses browser's localStorage with the name 'shopping-cart'

### Cart UI Component (src/components/shop/CartClient.tsx)

#### Cart Display
- **Empty State**: Shows a friendly message when cart is empty with a link to shop
- **Item List**: Displays each cart item with:
  - Product image (20x20 thumbnail)
  - Product name
  - Price
  - Quantity controls (increment/decrement)
  - Remove button

#### Quantity Controls
- **Increment/Decrement**: Buttons to adjust item quantities
- **Validation**: Prevents quantities from going below 1 (removes item if quantity set to 0)
- **Real-time Updates**: Quantity changes update the cart total immediately

#### Order Summary
- **Subtotal Calculation**: Sum of (price × quantity) for all items
- **Tax Calculation**: Currently set to 0% (can be extended)
- **Total Display**: Final amount to be charged
- **Checkout Button**: Triggers the order placement process

#### Checkout Process
1. **Authentication Check**: Verifies user is logged in
2. **Database User Lookup**: Finds user in the application database using Firebase phone number
3. **Order Creation**: Calls server action to create the order
4. **Cart Clearing**: Empties cart on successful order
5. **Navigation**: Redirects to homepage with success parameter

### Order Processing (src/actions/shop.ts)

#### createOrder Function
- **Input Validation**: Checks for valid user ID and non-empty items array
- **Database Transaction**: Creates order with associated order items in a single transaction
- **Order Status**: Sets initial status to "PENDING"
- **Error Handling**: Comprehensive error catching and reporting

#### Order Data Structure
- **Order**: Contains user ID, total amount, and status
- **Order Items**: Associated items with their price at time of purchase and quantity
- **Relationship**: One-to-many relationship between orders and order items

## Product Integration

### Adding to Cart
- Products throughout the application can add items to the cart using the `useCart` hook
- The cart maintains the price at the time of addition (important for order history)
- Product images are stored in the cart for display purposes

### Product Page Integration
- Individual product pages have "Add to Cart" buttons
- Quantity selection is available on product pages
- Real-time cart updates without page refresh

## Authentication Integration

### User Verification
- Checkout requires authenticated user
- Redirects to login page if user is not authenticated
- Uses Firebase authentication to verify user identity
- Cross-references with application database to ensure user exists

### Order Association
- Orders are linked to users in the application database
- Uses phone number from Firebase to find corresponding user record
- Ensures data consistency between authentication and application databases

## UI/UX Features

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Desktop Layout**: Grid layout on larger screens with order summary sidebar
- **Touch-Friendly**: Large buttons and controls for mobile users

### User Feedback
- **Loading States**: Visual feedback during checkout process
- **Error Handling**: Clear error messages for failed operations
- **Success Feedback**: Cart clearing and navigation on successful order
- **Alert Modal**: Notification system for important messages

### Cart Badge
- **Header Integration**: Cart badge in the header shows item count
- **Persistent Count**: Shows total quantity across all items
- **Link to Cart**: Direct navigation to cart page

## Performance Considerations

### Client-Side Optimization
- **Local Storage**: Cart persists without server calls
- **Efficient Updates**: Minimal re-renders when cart changes
- **Quantity Management**: Prevents duplicate entries of same product

### Server-Side Optimization
- **Batch Operations**: Single transaction for order creation
- **Database Relations**: Efficient querying of related data
- **Caching**: Potential for caching order history (not currently implemented)

## Security Features

### Data Validation
- **Server-Side Validation**: All order data validated on server
- **Price Integrity**: Prices stored with order items to prevent manipulation
- **User Verification**: Orders only created for authenticated users

### Order Integrity
- **Transaction Safety**: Database transaction ensures order consistency
- **Price Locking**: Product prices stored with order to prevent price changes
- **Quantity Validation**: Ensures sufficient quantity (though not currently implemented)

## Extensibility Points

### Future Enhancements
- **Tax Calculation**: Currently set to 0%, but framework exists for tax calculation
- **Shipping Integration**: Could add shipping options and costs
- **Order Status Tracking**: Enhanced order status management
- **Payment Processing**: Integration with payment gateways
- **Inventory Management**: Stock validation before order creation

### API Design
- **Modular Actions**: Server actions are well-separated for easy extension
- **Type Safety**: Strong typing throughout the cart and order system
- **Error Handling**: Consistent error reporting pattern

## Error Handling

### Client-Side Errors
- **Authentication Failures**: Redirects to login page
- **Network Issues**: Graceful degradation with error messages
- **Invalid Operations**: Prevents invalid cart operations

### Server-Side Errors
- **Database Failures**: Comprehensive error catching
- **Validation Errors**: Input validation with clear error messages
- **Transaction Failures**: Database transaction rollback on errors