"use client";

import { Bubble } from "@typebot.io/nextjs";
import { useLocale } from "next-intl";

export const ChatBot = () => {
  const locale = useLocale();
  const typebotId = locale === "es" ? "noctra-intake-es" : "noctra-intake-v1";

  return (
    <Bubble
      typebot={typebotId}
      theme={{
        button: {
          backgroundColor: "#000000",
          customIconSrc: "/noctra-studio-icon-light-theme.svg",
        },
        previewMessage: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          closeButtonBackgroundColor: "#ffffff",
          closeButtonIconColor: "#000000",
        },
      }}
    />
  );
};
