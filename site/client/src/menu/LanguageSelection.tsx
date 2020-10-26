import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import React, { useState, MouseEvent } from "react";
import { changeLanguage, getLanguage } from "../i18n";
import LanguageIcon from "../icons/LanguageIcon";
import { Locale } from "../locales/Locale";

export const LanguageSelection = () => {
  const languageMenuId: string = "change-language-menu-id";
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [locale, setLocale] = useState<Locale>(getLanguage());
  const isLanguageMenuOpen = Boolean(anchorEl);

  const handleLanguageMenuOpen = (event: MouseEvent): void => {
    setAnchorEl(event.currentTarget);
  };

  const changeLocale = (newLocale: Locale): void => {
    changeLanguage(newLocale);
    setLocale(newLocale);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getMenuItems = () => {
    return (
      <>
        {Locale.supported().map((locale, index) => {
          return (
            <MenuItem onClick={() => changeLocale(locale)}>
              {locale.name}
            </MenuItem>
          );
        })}
      </>
    );
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={languageMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isLanguageMenuOpen}
      onClose={handleMenuClose}
    >
      {getMenuItems()}
    </Menu>
  );

  return (
    <>
      <IconButton
        edge="end"
        aria-label="language of site"
        aria-controls={languageMenuId}
        aria-haspopup="true"
        onClick={handleLanguageMenuOpen}
        color="inherit"
      >
        <LanguageIcon />
        <Typography variant="h6">{locale.name}</Typography>
      </IconButton>
      {renderMenu}
    </>
  );
};
