import { inject, injectable } from 'inversify';
import { DevelopersRepository } from '../repositories/developers.repository';
import {  IDeveloperWithRevenue } from '../types'

@injectable()
export class DevelopersService {

	constructor(
		@inject('DevelopersRepository') private developersRepository: DevelopersRepository,
	) {}

	async getDevelopers(): Promise<IDeveloperWithRevenue[]>{
		return this.developersRepository.getDevelopers()
	}

	async getDeveloperById(id: string): Promise<IDeveloperWithRevenue>{
		return this.developersRepository.getDeveloperById(id)
	}
}
