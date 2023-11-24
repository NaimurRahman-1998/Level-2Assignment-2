import { z } from 'zod';

const AddressValidationSchema = z.object({
  street: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  country: z.string().min(1).max(255),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1).max(255),
  price: z.number(),
  quantity: z.number(),
})

const FullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(255)),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
