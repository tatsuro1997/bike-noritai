import type { ReactElement } from "react";
import { GetStaticProps } from 'next';
import Head from "next/head";
import SpotList from "@/components/spots/spot-list";
import SpotRegistration from "@/components/spots/spot-registration";
import SpotsSearch from "@/components/spots/spots-search";
import { getAllSpots } from "@/helpers/spot-api-util";

import { components } from '@/schema';

type Spot = components['schemas']['Spot'];

/**
 * 受け取る props の型を定義
 * 命名は AllSpotsPageProps としているが、別に Props でもいい
 * 今回 type を使用しているが interface でも問題ない
 */
type AllSpotsPageProps = {
  spots: Spot[];
};

const AllSpotsPage = ({ spots }: AllSpotsPageProps): ReactElement => (
  <>
    <Head>
      <title>バイクノリタイ - スポット一覧</title>
      <meta
        name="description"
        content="Find a lot of great spots that allow you to evolve..."
      />
    </Head>
    <SpotRegistration />
    <SpotsSearch />
    <SpotList items={spots} />
  </>
);

/**
 * GetStaticProps<T> で T には props の型を指定する
 * このようにすることで AllSpotsPage 型の props を返すことを保証する
 */
export const getStaticProps: GetStaticProps<AllSpotsPageProps> = async () => {
  const spots = await getAllSpots();

  return {
    props: {
      spots: spots,
    },
    revalidate: 60,
  };
};

export default AllSpotsPage;
