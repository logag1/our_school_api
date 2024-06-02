import { Router } from 'express';
import KakaoAuthController from '../controllers/kakao.auth.controller';
import { asyncHandler } from '../utils/request-handler.util';

const router = Router();

const kakaoAuthController = new KakaoAuthController({
  CLIENT_ID: process.env.KAKAO_RESTAPI_KEY!,
  REDIRECT_URI: process.env.KAKAO_REDIRECT_URI!
});

router
  .route('/callback/kakao')
  .get(asyncHandler(kakaoAuthController.handleOAuthCallback))

router
  .route('/account')
  .get(asyncHandler(kakaoAuthController.getAccountInfo))

export default router;