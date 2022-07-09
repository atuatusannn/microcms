import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "src/libs/client";
import { Blog } from "src/pages";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId: NextPage<Props> = (props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold">{props.title}</h1>
      <time dateTime={props.publishedAt} className="block mt-2">{dayjs(props.publishedAt).format("YYYY年MM月DD日")}</time>
      <article className="prose prose-sm mt-4" dangerouslySetInnerHTML={{ __html: props.body }} />
    </div>
  );
};
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blogs" });
  const ids = data.contents.map((content) => `/blogs/${content.id}`);

  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return { notFound: true };
  }
  const data = await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId: ctx.params.id,
  });
  console.log(data);
  return {
    props: data,
  };
};

export default BlogId;
