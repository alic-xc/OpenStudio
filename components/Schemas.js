import { object, string, date } from "yup";

const DateSchema = object({ dob: date().required() });

export const LoginSchema = object({
  username: string().required().min(6).max(25),
  password: string().required().min(6),
});

export const MerchantRegistrationSchema = object({
  name: string().required().min(2).max(25),
  email: string().required().email().max(50),
  username: string().required().min(6).max(25),
  cityOfResidence: string().max(20),
  password: string().required().min(6),
  phoneNumber: string().max(20),
}).concat(LoginSchema);

export const FilterSchema = object({
  toDate: date().notRequired().nullable(),
  fromDate: date().notRequired().nullable(),
  city: string(),
});

export const clientsFilterSchema = object({
  city: string(),
  name: string(),
});

export const SessionScheme = object({
  type: string().required(),
});

export const BookingSessionSchema = object({
  date: date().required(),
  title: string().required().min(1).max(25),
  notes: string().required().min(1).max(500),
  sessionId: string().required().min(15).max(100),
});

export const RegistrationSchema = MerchantRegistrationSchema.concat(DateSchema);
