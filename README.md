# バイクノリタイ - Bike Noritai
## 今から走りに行きたいスポットが見つかる検索サイト
![スクリーンショット 2022-12-05 15 05 21](https://user-images.githubusercontent.com/85143983/205561182-c8efd867-4fb6-4e92-9f96-a695cfd9663a.png)

## Backend
[bike_noritai_api](https://github.com/tatsuro1997/bike_noritai_api)

## Staging
https://bike-noritai.vercel.app/

## Node v16.13
- [next-auth](https://www.npmjs.com/package/next-auth?activeTab=readme)のnodeの対応バージョンの兼ね合い上、Nodeを16.13にしている
- vercelも同様に`16.*`に設定する


## Development

### DBの起動方法

`docker compose` で mongo dbが立ち上がります
`docker-compose` を利用している場合は適宜読み替えてください

```console
docker compose up -d
```

### DBの中身の確認

docker composeを立ち上げると mongo-expressを利用して、ブラウザ上でDBの中身を確認することができます。

http://localhost:8081 をブラウザで開いて確認することができます


### 環境変数の設定

.env.local.exampleがあるので .env.localにコピーして利用できます。
GOOGLE_MAP_KEYは適宜設定してください

```console
cp .env.local.example .env.local
```

### 開発サーバの起動

```console
npm install
npm run dev
```
