import { FeedConfig } from 'feeds'
import * as actions from './actions'
import {
  formatAnswer,
  createContract,
  createInfuraProvider,
} from '../../../contracts/utils'
import { Networks } from '../../../utils'
import feeds from '../../../feeds.json'

interface ContractConfig {
  constant: boolean
  inputs: any[]
  name: string
  outputs: any[]
  payable: boolean
  stateMutability: string
  type: string
}

const CONTRACTS: ContractConfig[] = [
  {
    constant: true,
    inputs: [],
    name: 'currentAnswer',
    outputs: [{ name: '', type: 'int256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ name: '', type: 'int256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

const answerContract = (contractAddress: any, provider: any) => {
  return createContract(contractAddress, provider, CONTRACTS)
}

const latestAnswer = async (contractConfig: any, provider: any) => {
  const contract = answerContract(contractConfig.contractAddress, provider)
  return contractConfig.contractVersion === 2
    ? await contract.latestAnswer()
    : await contract.currentAnswer()
}

const allAnswers = async (provider: any) => {
  const answers = feeds
    .filter((config: any) => config.networkId === Networks.MAINNET)
    .map(async (config: any) => {
      const payload = await latestAnswer(config, provider)
      const answer = formatAnswer(
        payload,
        config.multiply,
        config.decimalPlaces,
      )

      return { answer, config }
    })

  return Promise.all(answers)
}

export interface ListingAnswer {
  answer: string
  config: FeedConfig
}

function fetchAnswers() {
  return async (dispatch: any) => {
    const provider = createInfuraProvider()
    const answerList = await allAnswers(provider)
    dispatch(actions.setAnswers(answerList))
  }
}

export { fetchAnswers }
