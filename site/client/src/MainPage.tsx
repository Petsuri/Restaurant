import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Hello } from '../../api-client/resources/Hello'
import { client } from './ApiClient';
import { Link } from "react-router-dom";

export default function MainPage() {
  const { t } = useTranslation();

  useEffect(() => 
  {
      client().send(new Hello()).then(result =>
        {
          console.log(result);
        }
      );
  }, []);

  return (
    <div>
      <div>
        <header>
          <p>{t("main.coming_soon")}</p>
          <ul>
            <li>
                <Link to="/cv">{t("main.cv")}</Link>
            </li>
            <li>{t("main.coming.pizza")}</li>
            <li>{t("main.coming.hamburger")}</li>
            <li>{t("main.coming.smoking")}</li>
            <li>{t("main.coming.software_development")}</li>
          </ul>
        </header>
      </div>
    </div>
  );
}