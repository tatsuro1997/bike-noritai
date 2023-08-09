import { paths } from '@/schema';
import { Spot } from '@/types';

/**
 * fetchApi は、fetch を使って API を叩く関数
 * 同じような関数が並んでたので、参考程度に
 * 
 * url: keyof paths というのは keyof で paths のキーを取得している
 * path に定義されていない url を渡すと、コンパイルエラーになる
 * 
 * @example
 * fetchApi({ url: '/api/spots' });
 * fetchApi({ url: '/api/spots/{spot_id}', params: { spot_id: 1 } });
 */
type FetchApiArgs = {
  url: keyof paths;
  params?: { [key: string]: string | number };
}

const fetchApi = async ({ url, params }: FetchApiArgs) => {
  const baseUrl = process.env.NEXT_PUBLIC_FETCH_URL;

  const createUrl = (url: string, params?: { [key: string]: string | number }) => {
    if (!params) return url;

    const [key, value] = Object.entries(params)[0];
    return url.replace(`{${key}}`, String(value));
  }

  const requestUrl = createUrl(`${baseUrl}${url}`, params);
  try {
    const response = await fetch(requestUrl);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("データの取得に失敗しました。");
    } 
  } catch (error) {
    console.log(error);
  }
}

export const getAllSpots = async () => {
  const data = await fetchApi({ url: '/api/spots' });

  // fetch で取得した data は型が不明っぽい
  // そのため、型アサーションを使って型を明示的に指定している
  // 型アサーションは as ... で書かれた部分
  const { spots } = data as { spots: Spot[] };
  return spots;
};


export const getSpot  = async (id: string | number) => {
  const data = await fetchApi({ url: '/api/spots/{spot_id}', params: { spot_id: id } });

  const { spot } = data as { spot: Spot };
  return spot;
};

export const getFeaturedSpots = async () => {
  return await getAllSpots();
};

export const getSpotById = async (id: string | number) => {
  const spot = await getSpot(id);

  return spot;
};

export const getSpotByUid = async (Uid: string | number) => {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.user_id === Number(Uid));
};
