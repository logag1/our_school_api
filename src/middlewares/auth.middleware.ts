import { Request, Response, NextFunction } from 'express';
import { getKakaoUserInfo } from '../utils/kakao_account.util';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * getKakaoUserInfo 요청 실패시 -401로 반환과 동시에 AxiosError 발생 => 그냥 500으로 리턴하고 클라에서는 cookie 없애주는걸로
     */
    if (req.headers.cookie!.split('access_token=')[1]) {
      await getKakaoUserInfo(req.headers.cookie!.split('access_token=')[1]);

      next();
    } else {
      return res.status(401).json({ success: false, message: 'Unauthorization' });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}