import { fetcher_Owner } from '@/libs/fetcher'
import useSWR from 'swr'

const useOwner = (id) => {
  const {data, error, isLoading} = useSWR(id, fetcher_Owner)

  return {
    owner: data,
    isOwnerLoading: isLoading,
    isOwnerError: error
  }
}

export default useOwner