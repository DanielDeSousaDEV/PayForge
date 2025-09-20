export const FlashMessagesTypeEnum = {
    error: 'error',
    danger: 'danger',
    success: 'success',
} as const

export type FlashMessageType = typeof FlashMessagesTypeEnum[keyof typeof FlashMessagesTypeEnum]