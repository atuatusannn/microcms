import { MicroCMSListResponse } from "microcms-js-sdk";
import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { client } from "src/libs/client";

export type Blog = {
  title: string;
  body: string;
};

const Home: NextPage<MicroCMSListResponse<Blog>> = (props) => {
  console.log(props.contents[0].body);
  return (
    <div className="text-blue-500">
      <p className="text-gray-400">{`記事の総数：${props.totalCount}件`}</p>
      <ul className="mt-4 space-y-4">
        {props.contents.map((contents) => {
          return (
            <li key={contents.id}>
              <Link href={`/blogs/${contents.id}`}>
                <a className="text-3xl text-blue-800 underline hover:text-blue-400 ">{contents.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  MicroCMSListResponse<Blog>
> = async () => {
  const data = await client.getList({ endpoint: "blogs" });
  return {
    props: data,
  };
};

export default Home;
