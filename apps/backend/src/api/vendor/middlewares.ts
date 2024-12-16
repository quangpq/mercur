import { vendorCors } from '#/shared/infra/http/middlewares'
import { unlessBaseUrl } from '#/shared/infra/http/utils'

import { MiddlewareRoute, authenticate } from '@medusajs/framework'

import { vendorFulfillmentSetsMiddlewares } from './fulfillment-sets/middlewares'
import { vendorInvitesMiddlewares } from './invites/middlewares'
import { vendorProductsMiddlewares } from './products/middlewares'
import { vendorSellersMiddlewares } from './sellers/middlewares'
import { vendorShippingOptionsMiddlewares } from './shipping-options/middlewares'
import { vendorStockLocationsMiddlewares } from './stock-locations/middlewares'

export const vendorMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/vendor/*',
    middlewares: [vendorCors()]
  },
  /**
   * @desc Here we are authenticating the seller routes
   * except for the route for creating a seller
   * and the route for accepting a member invite
   */
  {
    matcher: '/vendor/sellers',
    method: ['POST'],
    middlewares: [
      authenticate('seller', ['bearer', 'session'], {
        allowUnregistered: true
      })
    ]
  },
  {
    matcher: '/vendor/invites/accept',
    method: ['POST'],
    middlewares: [authenticate('seller', ['bearer', 'session'])]
  },
  {
    matcher: '/vendor/*',
    middlewares: [
      unlessBaseUrl(
        /^\/vendor\/(sellers|invites\/accept)$/,
        authenticate('seller', ['bearer', 'session'], {
          allowUnregistered: false
        })
      )
    ]
  },
  ...vendorSellersMiddlewares,
  ...vendorProductsMiddlewares,
  ...vendorInvitesMiddlewares,
  ...vendorFulfillmentSetsMiddlewares,
  ...vendorStockLocationsMiddlewares,
  ...vendorShippingOptionsMiddlewares
]
