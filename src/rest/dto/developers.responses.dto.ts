import { ApiModel, ApiModelProperty } from 'swagger-express-ts'
import { IDeveloperWithRevenue } from '../../domain/developers/types'

@ApiModel()
export class DeveloperDto implements IDeveloperWithRevenue {

	@ApiModelProperty()
	id: string

	@ApiModelProperty()
	firstName?: string

	@ApiModelProperty()
	lastName?: string

	@ApiModelProperty()
	email: string

	@ApiModelProperty()
	revenue: number
}
