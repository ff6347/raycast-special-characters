import { ActionPanel, Detail, List, Action } from "@raycast/api";
import characters from "./data/characters.json";
export default function Command() {
  return (
    <List>
      {characters.items.map((item, i) => (
        <List.Item
          key={`item.arg${i}`}
          icon={`${item.subtitle}.png`}
          title={item.title.replace(/\n.*?$/, "")}
          actions={
            <ActionPanel>
              <Action.Paste content={item.arg} />
              <Action.CopyToClipboard
                title={item.mods.alt.subtitle}
                content={item.mods.alt.arg}
                shortcut={{ modifiers: ["opt"], key: "return" }}
              />
              <Action.CopyToClipboard
                title={item.mods.cmd.subtitle}
                content={item.mods.cmd.arg}
                shortcut={{ modifiers: ["cmd"], key: "return" }}
              />
              <Action.Push
                shortcut={{ modifiers: ["ctrl"], key: "return" }}
                title="Show Details"
                target={
                  <Detail
                    metadata={
                      <Detail.Metadata>
                        <Detail.Metadata.Label title="Character" text={`${item.text.copy}`} />
                        <Detail.Metadata.Label title="Unicode" text={`${item.subtitle}`} />
                        <Detail.Metadata.Label title="HTML Entity" text={`${item.mods.cmd.arg}`} />
                        <Detail.Metadata.Label title="Hex Unicode" text={`${item.mods.alt.arg}`} />
                      </Detail.Metadata>
                    }
                    markdown={`# ${item.arg}
${item.title}

![](${item.subtitle}.png)
                    `}
                  />
                }
              />
            </ActionPanel>
          }
        />
      ))}
      {/* <List.Item
        icon="list-icon.png"
        title="Greeting"
        actions={
          <ActionPanel>
            <Action.Push title="Show Details" target={<Detail markdown="# Hey! 👋" />} />
          </ActionPanel>
        }
      /> */}
    </List>
  );
}
