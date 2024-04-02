import 'reflect-metadata'
import { request } from './setup/shortcuts'
import { createRequestWithContainerOverrides } from './setup/helpers'
import { DevelopersRepository } from '../src/domain/developers/repositories/developers.repository'
import { GetDeveloperByIdMockResponse, GetDevelopersMockResponse } from './setup/mockData'

describe('Developers API tests examples', () => {

	it('should BAT fetch developers (e2e, real repository used)', async () => {

		const result = await request.get(`/api/developers`)

		expect(result.status).toBe(200)
		expect(result.body?.length).toBeGreaterThan(0)

		for( const developer of result.body ){
			expect(developer).toHaveProperty('id')
			expect(developer).toHaveProperty('firstName')
			expect(developer).toHaveProperty('lastName')
			expect(developer).toHaveProperty('email')
			expect(developer).toHaveProperty('revenue')
		}
	})

	it('should BAT fetch developer by id (e2e, real repository used)', async () => {

		const result = await request.get(`/api/developers/65de346c255f31cb84bd10e9`)
		const developer = result.body

		expect(result.status).toBe(200)
		expect(developer).toHaveProperty('id')
		expect(developer).toHaveProperty('firstName')
		expect(developer).toHaveProperty('lastName')
		expect(developer).toHaveProperty('email')
		expect(developer).toHaveProperty('revenue')
		expect(developer.revenue).toBe(12000)
	})

	it('should return error when developer is not found by provided id (e2e, real repository used)', async () => {

		const result = await request.get(`/api/developers/qweqwe`)

		expect(result.status).toBe(404)
		expect(result.text).toBe("{\"error\":{\"name\":\"Developer not found\",\"message\":\"Developer with requested id is not found\"}}")
	})

	it('should BAT get developers (mocked repository used)', async () => {

		const req = await createRequestWithContainerOverrides({
			'DevelopersRepository': {
				toConstantValue: {
					getDevelopers: async (_id) => (GetDevelopersMockResponse)
				} as Partial<DevelopersRepository>
			}
		})

		const result = await req.get(`/api/developers`)

		expect(result.status).toBe(200)
		expect(result.body?.length).toBeGreaterThan(0)

		for( const developer of result.body ){
			expect(developer).toHaveProperty('id')
			expect(developer).toHaveProperty('firstName')
			expect(developer).toHaveProperty('lastName')
			expect(developer).toHaveProperty('email')
			expect(developer).toHaveProperty('revenue')
		}
	})


	it('should BAT get developer by id (mocked repository used)', async () => {

		const req = await createRequestWithContainerOverrides({
			'DevelopersRepository': {
				toConstantValue: {
					getDeveloperById: async (_id) => (GetDeveloperByIdMockResponse)
				} as Partial<DevelopersRepository>
			}
		})

		const result = await req.get(`/api/developers/65de346c255f31cb84bd10e9`)
		const developer = result.body

		expect(result.status).toBe(200)
		expect(developer).toHaveProperty('id')
		expect(developer).toHaveProperty('firstName')
		expect(developer).toHaveProperty('lastName')
		expect(developer).toHaveProperty('email')
		expect(developer).toHaveProperty('revenue')
		expect(developer.revenue).toBe(12000)
	})

})
