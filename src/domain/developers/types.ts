export interface IDeveloper {
	id: string

	firstName?: string
	lastName?: string

	email: string
}

export interface IDeveloperWithRevenue extends IDeveloper {
	revenue: number
}

export enum ContractStatus {
	pending = 'pending',
	completed = 'completed',
	ongoing = 'ongoing'
}

type Status = ContractStatus.pending | ContractStatus.completed | ContractStatus.ongoing

export interface IContract {
	id: number

	developerId: string

	status: Status

	amount: number
}
