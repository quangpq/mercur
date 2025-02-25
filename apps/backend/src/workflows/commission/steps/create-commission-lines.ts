import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk'

import { COMMISSION_MODULE } from '../../../modules/commission'
import CommissionModuleService from '../../../modules/commission/service'
import { CreateCommissionLineDTO } from '../../../modules/commission/types'

export const createCommissionLinesStep = createStep(
  'create-commission-lines',
  async (input: CreateCommissionLineDTO[], { container }) => {
    const service = container.resolve(
      COMMISSION_MODULE
    ) as CommissionModuleService

    const result = await service.createCommissionLines(
      input.map((i) => ({ ...i, value: Number(i.value) }))
    )

    return new StepResponse(result)
  }
)
