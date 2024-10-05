import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NotionPage } from "@/lib/types";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

export const getDatabase = async (): Promise<NotionPage[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  //console.log(JSON.stringify(response.results));

  return (response.results as NotionPage[])
    .filter((page) => page.properties["Post Status"].status.name === "Done")
    .sort((a, b) =>
      a.properties["Published Date"].date.start >
      b.properties["Published Date"].date.start
        ? -1
        : 1
    );
};

export async function getPage(pageId: string): Promise<NotionPage> {
  return (await getDatabase()).filter(
    (page) => page.id === pageId
  )[0] as NotionPage;
}

export async function getPageChildBlocksMarkdown(
  pageId: string
): Promise<string> {
  const mdblocks = await n2m.pageToMarkdown(pageId);
  const mdString = n2m.toMarkdownString(mdblocks);
  return mdString.parent;
}

export const getPageTitle = (page: NotionPage): string => {
  return page.properties.Title.title[0].plain_text;
};

export const getPageCategories = (page: NotionPage): string[] => {
  return page.properties.Categories.multi_select.map(
    (category) => category.name
  );
};

export const getPageFeaturedImage = (page: NotionPage): string | undefined => {
  const image = page.properties["Featured Image"].files[0];
  return image ? image.file.url : undefined;
};
