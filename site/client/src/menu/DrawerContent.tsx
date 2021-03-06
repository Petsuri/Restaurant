import React from "react";
import { List, ListItem, makeStyles, Theme } from "@material-ui/core";
import CvLink from "../cv/CvLink";
import ComingSoonLink from "../coming-soon/ComingSoonLink";
import BeingDeveloperLink from "../career/BeingDeveloperLink";
import { none, Option, some } from "@petriworks/common";
import { IdentedListItem } from "../styles/components";
import ChapterOneLink from "../career/chapters/ChapterOneLink";
import ChapterTwoLink from "../career/chapters/ChapterTwoLink";
import ChapterThreeLink from "../career/chapters/ChapterThreeLink";
import TechnologiesLink from "../cv/TechnologiesLink";
import ChapterFourLink from "../career/chapters/ChapterFourLink";

type DrawerContentProps = {
  readonly closeDrawer: Function;
};

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: 250,
    alignItems: "baseline",
    color: "white",
    paddingTop: "2rem",
    paddingLeft: "2rem",
  },
}));

type DrawerItem = {
  readonly MainLink: JSX.Element;
  readonly SubLinks: Option<JSX.Element[]>;
};

export default function DrawerContent(props: DrawerContentProps) {
  const classes = useStyles();

  const links: DrawerItem[] = [
    { MainLink: <CvLink />, SubLinks: some([<TechnologiesLink />]) },
    {
      MainLink: <BeingDeveloperLink />,
      SubLinks: some([
        <ChapterOneLink />,
        <ChapterTwoLink />,
        <ChapterThreeLink />,
        <ChapterFourLink />,
      ]),
    },
    { MainLink: <ComingSoonLink />, SubLinks: none() },
  ];

  const renderSubLinks = (subLinks: Option<JSX.Element[]>) => {
    if (!subLinks.isSome) {
      return null;
    }

    return (
      <List component="div" disablePadding>
        {subLinks.value.map((link, index) => (
          <IdentedListItem button key={index} onClick={() => props.closeDrawer()}>
            {link}
          </IdentedListItem>
        ))}
      </List>
    );
  };

  const renderLink = (item: DrawerItem, index: number) => {
    return (
      <>
        <ListItem button key={index} onClick={() => props.closeDrawer()}>
          {item.MainLink}
        </ListItem>
        {renderSubLinks(item.SubLinks)}
      </>
    );
  };

  return (
    <div className={classes.content}>
      <List component="nav">{links.map(renderLink)}</List>
    </div>
  );
}
