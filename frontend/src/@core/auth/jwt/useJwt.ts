// ** JWT Service Import
import JwtService from './jwtService';
import { JwtConfig } from './jwtDefaultConfig';

// ** Export Service as useJwt
export default function useJwt(jwtOverrideConfig: Partial<JwtConfig>): { jwt: JwtService } {
  const jwt = new JwtService(jwtOverrideConfig);

  return {
    jwt
  };
}
