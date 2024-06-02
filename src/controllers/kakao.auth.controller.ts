import { Request, Response } from 'express';
import axios from 'axios';
import { getKakaoUserInfo } from '../utils/kakao_account.util';

export interface KakaoConfig {
  CLIENT_ID: string;
  REDIRECT_URI: string;
}

export default class KakaoAuthController {
  constructor(
    private _kakaoConfig: KakaoConfig
  ) {
    this.handleOAuthCallback = this.handleOAuthCallback.bind(this);
    this.getAccountInfo = this.getAccountInfo.bind(this);
  }

  public async handleOAuthCallback(req: Request, res: Response) {
    const oAuthRes = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: `grant_type=authorization_code&client_id=${this._kakaoConfig.CLIENT_ID}&redirectUri=${this._kakaoConfig.REDIRECT_URI}&code=${req.query.code}`
    });

    res.cookie('access_token', oAuthRes.data.access_token);

    return res.redirect('http://ourschool.kro.kr');
  }

  public async getAccountInfo(req: Request, res: Response) {
    const access_token = req.headers.cookie!.split('access_token=')[1];
    const kakaoInfo = await getKakaoUserInfo(access_token);

    console.log(kakaoInfo.properties);

    return res.status(200).json({ success: true, result: kakaoInfo.properties });
  }
}