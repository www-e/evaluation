# Database Schema

## Overview

The application uses a MySQL database managed by Prisma ORM. The schema consists of five main entities that represent users, products, categories, and orders.

## Database Configuration

- **Provider**: MySQL
- **ORM**: Prisma Client
- **Connection**: Configured via `DATABASE_URL` environment variable
- **Generator**: Prisma Client JavaScript

## Entity Relationship Diagram (ERD)

```
Users 1----* Orders *----* OrderItems *----1 Products 1----* Categories
```

## Model Definitions

### User Model
```prisma
model User {
  id        String   @id @default(uuid())
  mobile    String   @unique
  fullName  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
}
```

**Fields**:
- `id`: Unique identifier (UUID)
- `mobile`: User's phone number (unique)
- `fullName`: User's full name
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `orders`: Related orders (one-to-many relationship)

**Constraints**:
- Mobile number must be unique
- Each user can have multiple orders

### Category Model
```prisma
model Category {
  id        String    @id @default(uuid())
  name      String
  image     String?
  products  Product[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

**Fields**:
- `id`: Unique identifier (UUID)
- `name`: Category name
- `image`: Optional image URL
- `products`: Related products (one-to-many relationship)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Relationships**:
- One category can have many products

### Product Model
```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Float
  image       String?
  categoryId  String
  category    Category @relation(fields: [categoryId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  OrderItems  OrderItem[]
}
```

**Fields**:
- `id`: Unique identifier (UUID)
- `name`: Product name
- `description`: Optional product description
- `price`: Price as float value
- `image`: Optional image URL
- `categoryId`: Foreign key to Category
- `category`: Related category (many-to-one relationship)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `OrderItems`: Related order items (one-to-many relationship)

**Relationships**:
- Many products belong to one category
- One product can appear in many order items

### Order Model
```prisma
model Order {
  id        String      @id @default(uuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  total     Float
  status    String      @default("PENDING")
  items     OrderItem[]
  createdAt DateTime    @default(now())
  updatedAt DateTime    @updatedAt
}
```

**Fields**:
- `id`: Unique identifier (UUID)
- `userId`: Foreign key to User
- `user`: Related user (many-to-one relationship)
- `total`: Total order amount
- `status`: Order status with default "PENDING"
- `items`: Related order items (one-to-many relationship)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Relationships**:
- Many orders belong to one user
- One order can have many order items

### OrderItem Model
```prisma
model OrderItem {
  id        String  @id @default(uuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  price     Float
}
```

**Fields**:
- `id`: Unique identifier (UUID)
- `orderId`: Foreign key to Order
- `order`: Related order (many-to-one relationship)
- `productId`: Foreign key to Product
- `product`: Related product (many-to-one relationship)
- `quantity`: Quantity ordered
- `price`: Price at time of order

**Relationships**:
- Many order items belong to one order
- Many order items reference one product

## Relationships

1. **User → Order** (One-to-Many):
   - One user can place multiple orders
   - Foreign key: `userId` in Order model

2. **Category → Product** (One-to-Many):
   - One category can contain multiple products
   - Foreign key: `categoryId` in Product model

3. **Order → OrderItem** (One-to-Many):
   - One order can contain multiple items
   - Foreign key: `orderId` in OrderItem model

4. **Product → OrderItem** (One-to-Many):
   - One product can appear in multiple order items
   - Foreign key: `productId` in OrderItem model

## Indexes and Constraints

- Mobile numbers in User model are unique (`@unique`)
- UUIDs are used for primary keys (`@id @default(uuid())`)
- CreatedAt timestamps default to current time (`@default(now())`)
- UpdatedAt timestamps automatically update (`@updatedAt`)
- Order status defaults to "PENDING"

## Migration Strategy

Prisma Migrate is used for database schema changes. The migration process involves:

1. Modifying the schema.prisma file
2. Running `npx prisma migrate dev` to create and apply migrations
3. Generating the Prisma Client with `npx prisma generate`

## Seeding Data

The application includes a script (`src/scripts/truncate-db.ts`) to clear all data from tables, which can be used for testing purposes.