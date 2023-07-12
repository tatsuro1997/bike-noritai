import { paths, components } from '@/schema';

// 取得されるであろうデータの型を定義
type Spot = components['schemas']['Spot'];

// fetchApi は、fetch を使って API を叩く関数
// 同じような関数が並んでたので、参考程度に

// url: keyof paths というのは keyof で paths のキーを取得している
// つまり、fetchApi('/api/spots') というように呼び出せる
// path に定義されていない url を渡すと、コンパイルエラーになる
const fetchApi = async (url: keyof paths) => {
  const baseUrl = process.env.NEXT_PUBLIC_FETCH_URL;
  const requestUrl = `${baseUrl}${url}`;

  try {
    const response = await fetch(requestUrl);
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("スポットデータの取得に失敗しました。");
    } 
  } catch (error) {
    console.log(error);
  }
}

export const getAllSpots = async () => {
  const data = await fetchApi('/api/spots');

  // fetch で取得した data は型が不明っぽい
  // そのため、型アサーションを使って型を明示的に指定している
  // 型アサーションは as ... で書かれた部分
  const { spots } = data as { spots: Spot[] };
  return spots;
};
