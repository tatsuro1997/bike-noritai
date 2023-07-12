// openapi.ymlからTypeScriptの型定義を生成するスクリプト
// 絶対パスの方が安定すると思ったのでこのような形になっている
// 同じディレクトリに bike_noritai_api がある前提で実行する
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

const openapiFilePath = path.resolve(__dirname, '../bike_noritai_api/openapi.yml');
const outputFilePath = path.resolve(__dirname, './src/schema.ts');

// 
if (!fs.existsSync(openapiFilePath)) {
  throw new Error(`openapi.yml ないよ、いい感じに openapiFilePath のパスを直してね`);
}

const command = `npx openapi-typescript ${openapiFilePath} > ${outputFilePath}`;

execSync(command, { stdio: 'inherit' });