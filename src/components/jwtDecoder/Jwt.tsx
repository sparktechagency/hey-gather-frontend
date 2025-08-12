import { jwtDecode, JwtPayload } from 'jwt-decode'
import Cookies from 'js-cookie'

interface IType extends JwtPayload {
  role: string
}

export const jwtDec = (): IType | null => {
  const token = Cookies.get('token')

  if (!token) return null

  try {
    return jwtDecode<IType>(token)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}
