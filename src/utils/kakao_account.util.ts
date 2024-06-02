import axios from 'axios';

export async function getKakaoUserInfo(access_token: string) {
  const kakaoInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return kakaoInfo.data;
}