import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    Tags: {
      id: string;
      type: string;
      multi_select: Array<{ id: string; name: string; color: string }>;
    };
    "Post Status": {
      id: string;
      type: string;
      status: { id: string; name: string; color: string };
    };
    "Featured Image": {
      id: string;
      type: string;
      files: Array<{
        file: { url: string };
      }>;
    };
    Title: {
      id: string;
      type: string;
      title: Array<{
        type: string;
        text: { content: string; link: null | string };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
    Categories: {
      id: string;
      type: string;
      multi_select: Array<{ id: string; name: string; color: string }>;
    };
    Content: {
      id: string;
      type: string;
      rich_text: Array<{
        type: string;
        text: { content: string; link: null | string };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null | string;
      }>;
    };
  };
  url: string;
}

export const getDatabase = async (): Promise<NotionPage[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
  });

  return response.results.map((page) => {
    if (!("properties" in page)) {
      throw new Error("Unexpected response structure");
    }
    return mapNotionPageToCustomType(page as PageObjectResponse);
  });
};

function mapNotionPageToCustomType(page: PageObjectResponse): NotionPage {
  return {
    id: page.id,
    created_time: page.created_time,
    last_edited_time: page.last_edited_time,
    properties: {
      Tags: page.properties.Tags as NotionPage["properties"]["Tags"],
      "Post Status": page.properties[
        "Post Status"
      ] as NotionPage["properties"]["Post Status"],
      "Featured Image": page.properties[
        "Featured Image"
      ] as NotionPage["properties"]["Featured Image"],
      Title: page.properties.Title as NotionPage["properties"]["Title"],
      Categories: page.properties
        .Categories as NotionPage["properties"]["Categories"],
      Content: page.properties.Content as NotionPage["properties"]["Content"],
    },
    url: page.url,
  };
}

export const getPage = async (pageId: string): Promise<NotionPage> => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return mapNotionPageToCustomType(response as PageObjectResponse);
};

export const getPageTitle = (page: NotionPage): string => {
  return page.properties.Title.title[0]?.plain_text || "Untitled";
};

export const getPageContent = (page: NotionPage): string => {
  return (
    page.properties.Content.rich_text
      .map((block) => block.plain_text)
      .join("\n") || "No content available"
  );
};

export const getPageStatus = (page: NotionPage): string => {
  return page.properties["Post Status"].status?.name || "No status";
};

export const getPageTags = (page: NotionPage): string[] => {
  return page.properties.Tags.multi_select.map((tag) => tag.name);
};

export const getPageCategories = (page: NotionPage): string[] => {
  return page.properties.Categories.multi_select.map(
    (category) => category.name
  );
};

export const getPageFeaturedImage = (page: NotionPage): string | null => {
  return page.properties["Featured Image"].files[0]?.file.url || null;
};
