import { useEffect, useState } from 'react'
import { ModeType } from '../types'
import axios, { AxiosError } from 'axios'

const useModes = () => {
  const [modes, setModes] = useState<ModeType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchModes = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get<ModeType[]>(
        'https://60816d9073292b0017cdd833.mockapi.io/modes',
      )
      setIsLoading(false)
      setModes(response.data)
    } catch (e: unknown) {
      const error = e as AxiosError
      setIsLoading(false)
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchModes()
  }, [])

  return { modes, isLoading }
}

export default useModes
