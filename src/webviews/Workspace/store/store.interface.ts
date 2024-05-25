import { SerializedError } from '@reduxjs/toolkit'

export interface FetchPendingAction<Arg> {
  meta: {
    arg: Arg
    requestId: string
    requestStatus: 'pending'
  }
  payload: undefined
  type: string
}

export interface FetchFulfilledAction<Arg, Payload> {
  meta: {
    arg: Arg
    requestId: string
  }
  payload: Payload
  type: string
}

export interface FetchRejectedAction<Arg> {
  error: SerializedError
  meta: {
    aborted: boolean
    arg: Arg
    condition: boolean
    requestId: string
  }
  payload: unknown
  type: string
}
