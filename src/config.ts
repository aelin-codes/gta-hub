// Central feature flags — flip NEXT_PUBLIC_PAYMENTS_ENABLED to 'true' in env to re-enable
export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true'
