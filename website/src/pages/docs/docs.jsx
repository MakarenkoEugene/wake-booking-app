import React from "react";
import { Link } from "react-router-dom";

import Introduce from "./module/introduce";
import WhyNeed from "./module/why_need";
import HowWorks from "./how_works/";
import GrowPlan from "./module/grow_plan";
import Security from "./module/security";
import MoreServices from "./module/more_services";
import AboutProject from "./about/about_project";

export default function () {
  return (
    <div id="docs">
      <section>
        <div>
          <h1>Docs</h1>
          <p className="warning"> Сайт сейчас в разработке, Информация может изменятся</p>

          <ul>
            <li>Как начать работу</li>
            <li>Стоимость программы</li>
          </ul>
        </div>
        <div></div>
      </section>

      <section>
        <Introduce />
        <div></div>
      </section>

      <section>
        <WhyNeed />
        <div></div>
      </section>

      <section>
        <HowWorks />
        <div></div>
      </section>

      <section>
        <GrowPlan />
        <div></div>
      </section>

      <section>
        <Security />
        <div></div>
      </section>

      <section>
        <MoreServices />
        <div></div>
      </section>

      <AboutProject />
    </div>
  );
}
