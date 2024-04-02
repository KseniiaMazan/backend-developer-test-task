// **************************************************************************
// Репозиторій імітує шар підключення до бази данних. Данні знаходяться в data.ts
// **************************************************************************

import { injectable } from 'inversify';
import { ContractStatus, IContract, IDeveloper, IDeveloperWithRevenue } from '../types'
import { contracts, developers } from './data'
import { DeveloperByIdNotFoundError } from '../errors';

@injectable()
export class DevelopersRepository {
	private getCompletedContractsRevenueByDeveloperId(devId: string): number{
		const devCompletedContracts = contracts.filter(contract => (
			contract.status === ContractStatus.completed && contract.developerId === devId
		))

		return devCompletedContracts.reduce(
			(accumulator, currValue) => accumulator + currValue.amount,
			0
		)
	}

	async getDevelopers(): Promise<IDeveloperWithRevenue[]>{
		const result = developers.map((developer:IDeveloper) => {
			const revenue = this.getCompletedContractsRevenueByDeveloperId(developer.id)

			return {
				...developer,
				revenue,
			}
		})

		return result
	}

	async getDeveloperById(id: string): Promise<IDeveloperWithRevenue>{
		try {
			const developer = developers.find(d => d.id === id)
			const revenue = this.getCompletedContractsRevenueByDeveloperId(developer.id)
			
			return {
				...developer,
				revenue,
			}
		} catch {
			throw DeveloperByIdNotFoundError
		}
	}

	async getContracts(): Promise<IContract[]>{
		return contracts
	}
}
