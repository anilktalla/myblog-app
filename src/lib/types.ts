export interface NotionPage {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
  };
  cover: null;
  icon: null;
  parent: {
    type: "database_id";
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  properties: {
    "Post Status": {
      id: string;
      type: "status";
      status: {
        id: string;
        name: string;
        color: string;
      };
    };
    "Published Date": {
      id: string;
      type: "date";
      date: {
        start: string;
        end: string;
      };
    };
    "Featured Image": {
      id: string;
      type: "files";
      files: Array<{
        url: string | undefined;
        name: string;
        type: "file";
        file: {
          url: string;
          expiry_time: string;
        };
      }>;
    };
    Categories: {
      id: string;
      type: "multi_select";
      multi_select: Array<{
        id: string;
        name: string;
        color: string;
      }>;
    };
    Title: {
      id: string;
      type: "title";
      title: Array<{
        type: "text";
        text: {
          content: string;
          link: null;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: null;
      }>;
    };
  };
  url: string;
  public_url: null;
}
