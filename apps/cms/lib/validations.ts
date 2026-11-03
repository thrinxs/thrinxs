import { z } from 'zod'

export const signupSchema = z.object({
  firstName:   z.string().min(1,  'First name is required'),
  lastName:    z.string().min(1,  'Last name is required'),
  email:       z.string().email('Invalid email address'),
  phone:       z.string().optional(),
  country:     z.string().default('Nigeria'),
  password:    z.string()
    .min(8,  'Password must be at least 8 characters')
    .regex(/[A-Z]/,        'Password must contain an uppercase letter')
    .regex(/[0-9]/,        'Password must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain a special character'),
  orgName:     z.string().min(1, 'Organization name is required'),
  orgSlug:     z.string()
    .min(2,  'Workspace URL must be at least 2 characters')
    .max(50, 'Workspace URL must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens'),
  orgWebsite:  z.string().url().optional().or(z.literal('')),
  orgIndustry: z.string().optional(),
  orgSize:     z.string().optional(),
  plan:        z.enum(['free', 'starter', 'pro', 'agency', 'enterprise']).default('free'),
})

export const loginSchema = z.object({
  email:    z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput  = z.infer<typeof loginSchema>
