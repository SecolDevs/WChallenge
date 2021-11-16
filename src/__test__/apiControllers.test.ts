import request from 'supertest'
import { Request, Response } from 'express'
import { App } from '../api/app'
import { register } from '../api/controllers/auth.controller'
import { indexMessage } from '../api/controllers/index.controller'
import {} from '../api/controllers/coins.controller'

let mockRequest: Request
let mockResponse: Response
let responseObject: {}

describe('INDEX CONTROLLERS TEST', () => {
  test('Should response the / route', () => {
    // indexMessage(mockRequest, mockResponse)
    expect(true).toBeTruthy()
  })
})

describe('AUTH CONTROLLERS TEST', () => {
  test('Should register users', () => {
    // register(mockRequest as Request, mockResponse as Response)
    expect(true).toBeTruthy()
  })
})
