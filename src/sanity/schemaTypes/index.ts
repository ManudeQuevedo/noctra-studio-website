import { type SchemaTypeDefinition } from "sanity";

import blockContent from "./blockContent";
import category from "./category";
import post from "./post";
import author from "./author";

// Nuevos schemas de migraciones
import migrationGuide from "./migrationGuide";
import migrationLandingContent from "./migrationLandingContent";
import errorEntry from "./objects/errorEntry";
import checklistItem from "./objects/checklistItem";
import calloutBox from "./objects/calloutBox";
import codeBlock from "./objects/codeBlock";
import faqItem from "./objects/faqItem";
import seoFields from "./objects/seoFields";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    category,
    blockContent,
    migrationGuide,
    migrationLandingContent,
    errorEntry,
    checklistItem,
    calloutBox,
    codeBlock,
    faqItem,
    seoFields,
  ],
};
